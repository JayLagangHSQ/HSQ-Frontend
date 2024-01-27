import { useState, useRef, useEffect, useContext } from 'react';
import UserContext from '../../Contexts/userContext';
import { Container, Button } from 'react-bootstrap';
import PostArticleForm from './components/PostArticleForm';

export default function ComposeArticle() {
  const { user } = useContext(UserContext);
  const [characters, setCharacters] = useState([]);
  const [editableContent, setEditableContent] = useState('');
  const [fontSize, setFontSize] = useState('6');
  const [alignment, setAlignment] = useState('Center');
  const editorRef = useRef(null);
  const fontSizeRef = useRef(null);
  const colorRef = useRef(null);
  const paper = useRef(null);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isPlaceholderVisible, setPlaceholderVisible] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const minZoom = 0.4;
  const maxZoom = 1;
  const placeholderText = {
    title: "Title",
    introduction: "Introduction",
    body: "Body",
    conclusion: "Conclusion"
  };
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCloseModal = () => {
    setIsModalOpen(false)
  };

  const handlOpenModal = () =>{
    setIsModalOpen(true)
  }
  useEffect(() => {
    // Set the default font size and alignment on mount
    handleFontSizeChange();
    handleColorChange();
    handleAlign(alignment);
      
    setEditableContent(editorRef.current.innerHTML);

    return () => {

    };

  }, [alignment, fontSizeRef, colorRef, editorRef]);

  useEffect(()=>{
    editorRef.current.style.fontSize = `${32}px`;
  })

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Tab') {
        event.preventDefault(); // Prevent the default behavior of the Tab key
        document.execCommand('insertHTML', false, '&#160;&#160;&#160;&#160;');
      }

      if (event.key === 'b' && (event.metaKey || event.ctrlKey)) {
        // Check for the "Ctrl+B" or "Cmd+B" (bold) shortcut
        setIsBold(!isBold); // Toggle the bold state
      }
    };

    // Add the event listener when the component mounts
    document.addEventListener('keydown', handleKeyDown);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isBold]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Tab') {
        event.preventDefault(); // Prevent the default behavior of the Tab key
        document.execCommand('insertHTML', false, '&#160;&#160;&#160;&#160;');
      }

      if (event.key === 'i' && (event.metaKey || event.ctrlKey)) {
        // Check for the "Ctrl+I" or "Cmd+I" (italic) shortcut
        setIsItalic(!isItalic); // Toggle the italic state
      }
    };

    // Add the event listener when the component mounts
    document.addEventListener('keydown', handleKeyDown);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isItalic]);


  const decodeHtmlEntities = (html) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  

  const handleContentChange = () => {
    const content = editorRef.current.innerHTML;
    const previousContent = editableContent;
    setEditableContent(content);
    if(isPlaceholderVisible){handleAlign('Center')}
    // Hide the placeholder when content is present
    setPlaceholderVisible(content.trim() === '');
    
    // Decode HTML entities (e.g., '&#160;') to get actual characters
    const decodedContent = decodeHtmlEntities(content);
    const decodedPreviousContent = decodeHtmlEntities(previousContent);

    // Find added and removed characters
    const addedCharacters = Array.from(decodedContent).filter((char, index) => char !== decodedPreviousContent[index]);
    const removedCharacters = Array.from(decodedPreviousContent).filter((char, index) => char !== decodedContent[index]);

    // Update characters array
    const updatedCharacters = characters.concat(addedCharacters).filter((char) => !removedCharacters.includes(char));
    setCharacters(updatedCharacters);

  };


  const handleKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault(); // Prevent the default behavior of the Tab key

      // Insert four spaces for indentation (you can modify this as needed)
      document.execCommand('insertHTML', false, '&#160;&#160;&#160;&#160;');
    }
  };

  const handleFontSizeChange = () => {
    const selectedFontSize = fontSizeRef.current.value || fontSize;
    if (document.queryCommandSupported('fontSize')) {
      document.execCommand('fontSize', false, selectedFontSize);
    }
    setFontSize(selectedFontSize);
  };

  const handleColorChange = () => {
    const selectedColor = colorRef.current.value;
    if (document.queryCommandSupported('foreColor')) {
      document.execCommand('foreColor', false, selectedColor);
    }
  };

  const handleSetBold = () => {
    document.execCommand('bold', false, null);
    setIsBold(!isBold); // Toggle the bold state
  };

  const boldButtonStyle = {
    fontSize: '12.8px',
    backgroundColor: isBold ? '#516473' : '', // Change color when bold is enabled
    fontWeight: isBold ? 'bold' : 'normal', // Add bold font weight when bold is enabled
    borderRadius:'8px'
  };

  const handleSetItalic = () => {
    document.execCommand('italic', false, null);
    setIsItalic(!isItalic)
  };

  const italicButtonStyle = {
    fontSize: '12.8px',
    backgroundColor: isItalic ? '#516473' : '', // Change color when italic is enabled
    fontStyle: isItalic ? 'italic' : 'normal', // Add italic style when italic is enabled
    borderRadius:'8px'
  };

  const handleAlign = (alignmentValue) => {
    document.execCommand(`justify${alignmentValue}`, false, null);
    setAlignment(alignmentValue);
  };

  const fontstyle = {
    fontSize: '12.8px',
    borderRadius:'5px',
    borderColor:'#383C3F'
  };

  useEffect(() => {
    paper.current.style.transform = `scale(${zoomLevel})`;
  }, [zoomLevel]);

  const handleZoomIn = () => {
    setZoomLevel(prevZoomLevel => Math.min(prevZoomLevel + 0.1, maxZoom));
  };

  const handleZoomOut = () => {
    setZoomLevel(prevZoomLevel => Math.max(prevZoomLevel - 0.1, minZoom));
  };

  const handleTransformIntoLink = () => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
  
    if (selectedText.trim() !== '') {
      const url = selectedText;
      if (url !== null) {
        const link = `<a href="${url}" target="_blank">${selectedText}</a>`;
        document.execCommand('insertHTML', false, link);
      }
    }
  };
  
  return (
    <Container fluid className='p-0'>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <div className="formattingTools align-items-center" style={{ display: 'flex', justifyContent: 'center', position: 'sticky', top: 72, background: '#F3F3F3', width: '95%', zIndex: 1000, borderRadius: '8px', height:'80px' }}>
          {/* ... (existing formatting tools) */}
          
          {/* <div style={{ padding: '5px', margin: '2rem' }}>
            
          </div> */}
          <div style={{ padding: '5px', margin: '2rem' }}>
            <label className='mr-1' htmlFor="fontSize" style={fontstyle}>
              <b>Font Size:{' '}</b>
            </label>
            <select style={fontstyle} id="fontSize" ref={fontSizeRef} onChange={handleFontSizeChange} value={fontSize}>
              <option onClick={handleFontSizeChange} style={fontstyle} value="1">
                10px
              </option>
              <option onClick={handleFontSizeChange} style={fontstyle} value="3">
                16px
              </option>
              <option onClick={handleFontSizeChange} style={fontstyle} value="6">
                32px
              </option>
            </select>
          </div>

          <div style={{ padding: '5px', margin: '2rem' }}>
            <label className='mr-1' htmlFor="color" style={fontstyle}>
              <b>Text Color:{' '}</b>
            </label>
            <select style={fontstyle} id="color" ref={colorRef} onChange={handleColorChange}>
              <option style={fontstyle} value="#383C3F">
                dark
              </option>
              <option style={fontstyle} value="#AAB6BF">
                light dark
              </option>
              <option style={fontstyle} value="#F22F41">
                Red
              </option>
            </select>
          </div>

          <div className='' style={{ padding: '5px', margin: '2rem' }}>
            <button className='mr-1' style={boldButtonStyle} onClick={handleSetBold}>
              Bold
            </button>
            <button style={italicButtonStyle} onClick={handleSetItalic}>
              Italic
            </button>
            <button className='d-block ml-auto mr-auto mt-1' style={{borderRadius:'8px', fontSize:'12.8px'}} onClick={handleTransformIntoLink}>
              text to link
            </button>
          </div>

          <div style={{ padding: '5px', margin: '2rem' }}>
            <button className='mr-1' style={fontstyle} onClick={() => handleAlign('Left')}>
              Left Align
            </button>
            <button  className='mr-1' style={fontstyle} onClick={() => handleAlign('Center')}>
              Center Align
            </button>
            <button style={fontstyle} onClick={() => handleAlign('Right')}>
              Right Align
            </button>
          </div>

          <div style={{ padding: '5px', margin: '2rem' }} className='row justify-content-center align-items-center'>
            <div className='col-4'>
              <label className='mr-1 text-center mb-0' htmlFor="fontSize" style={fontstyle}>
                <b>Zoom:{' '}</b>
              </label>
            </div>
            <div className='col-6 d-flex flex-column'>
              <Button className='d-flex justify-content-center align-items-center' style={{borderRadius:'5px', borderStyle:'none', boxShadow:'none', backgroundColor:`#AAB6BF`, height:'20px', width:'20px'}} onClick={handleZoomIn}>
                <span  className='small'>+</span>
              </Button>
              <Button className='mt-1 d-flex justify-content-center align-items-center' style={{borderRadius:'5px', borderStyle:'none', boxShadow:'none', backgroundColor:`#AAB6BF`, height:'20px', width:'20px'}} onClick={handleZoomOut}>
                <span className=''>-</span>
              </Button>
            </div>
          </div>
          <Button 
          style={{fontSize:'12.8px', backgroundColor:'#016B83', boxShadow:'none'}}
          onClick={handlOpenModal}>
            Post
          </Button>
        </div>

        <div ref={paper} className="mt-4 container-fluid mb-0" style={{ border: '1px solid #ccc', margin: '2rem', width: '800px'}}>
          
          
          <div 
          contentEditable 
          ref={editorRef} 
          onInput={handleContentChange} 
          onKeyDown={handleKeyDown} // Listen to the keydown event
          style={{ minHeight: '800px', padding: '2rem', margin: '4rem', outline: 'none', zIndex:'-1' }}
          onClick={()=>{if(isPlaceholderVisible){setPlaceholderVisible(false); handleAlign('Center')}}}
          
          />
          <div style={{position:'absolute', bottom:'795px', left: '100px', zIndex:'-1'}}>
          {isPlaceholderVisible && (
                <>
                  <div className='fade-in-out-text d-flex' style={{ color: '#516473', fontStyle: 'italic', position:'absolute',zIndex:'-1',top:'85px', left: '150px', width:'300px'}}>
                    <span className=''><i>{`Start writing to remove placeholders . . .`}</i></span>
                  </div>
                  <div className='d-inline-flex' style={{ color: '#516473', fontStyle: 'italic', position:'absolute',zIndex:'-1',top: '-45px', left: '250px' }}>
                    <h4 className='d-inline-flex' >{placeholderText.title}</h4>
                  </div>
                  <div  style={{ color: '#516473', fontStyle: 'italic', position:'absolute',zIndex:'-1',top: '45px', left: '-10px' }}>
                    <h6 className='d-inline-flex'>{placeholderText.introduction}</h6>
                  </div>
                  <div  style={{ color: '#516473', fontStyle: 'italic', position:'absolute',zIndex:'-1',top: '135px', left: '-10px' }}>
                    <h6 className='d-inline-flex'>{placeholderText.body}</h6>
                  </div>
                  <div  style={{ color: '#516473', fontStyle: 'italic', position:'absolute',zIndex:'-1',top: '225px', left: '-10px' }}>
                    <h6 className='d-inline-flex'>{placeholderText.conclusion}</h6>
                  </div>
                </>
            )}
          
          </div>

          
        </div>
        <div>
          <span className='text-muted smallest'><i>Note: this version of article editor/composer is only capable of creating a single page article. The page/canvas will automatically stretch if you need more vertical length for your article.</i>
          </span>
        </div>

       
        <PostArticleForm content={editableContent} characters={characters} user={user} isPlaceholderVisible={isPlaceholderVisible} isModalOpen={isModalOpen} handleCloseModal={handleCloseModal}/>

      
      </div>
    </Container>
  );
}