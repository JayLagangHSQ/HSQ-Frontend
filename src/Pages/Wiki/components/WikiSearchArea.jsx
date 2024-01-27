import { useEffect, useState } from "react";
import { Form, Button, Dropdown} from "react-bootstrap"

export default function WikiSearchArea({setArticles,setLoading,refreshEffect,setHeader,setCurrentPage}){
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');

    const submitSearchRequest = () =>{
        setLoading(true); 

        fetch(`${import.meta.env.VITE_APP_API_URL}/api/articles/article`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                title: title.replace(/\\/g, "\\\\"),
                department: category.toLowerCase()
            })
        })
        .then(res => res.json())
        .then(data => {
            setCurrentPage(1)
            setArticles(data);
            setLoading(false);
            setHeader('Custom Search')
        })
    }
    const reset = () =>{
        setCurrentPage(1)
        setTitle(''); 
        setCategory('');
        refreshEffect();
        setHeader('All Articles')
    }

    const handleCategorySelect = (selectedCategory) => {
        setCategory(selectedCategory);
      };

    return(
        <div className="d-flex">
            <Form.Control
            style={{borderRadius:'8px'}}
            type="text"
            placeholder="Search..."
            onChange={(e) => setTitle(e.target.value)}
            className='custom-search-input'
            value={title} 
            />
            
            <div className="d-flex align-items-center">
                <Dropdown onSelect={handleCategorySelect} className="ml-1" >
                <Dropdown.Toggle variant="secondary" id="categoryDropdown" size='sm'>
                {category ? category : 'Deparment'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                <Dropdown.Item eventKey="Company-wide">Company-wide</Dropdown.Item>
                <Dropdown.Item eventKey="Executive">Executive</Dropdown.Item>
                <Dropdown.Item eventKey="Legal&Finance">Legal & Finance</Dropdown.Item>
                <Dropdown.Item eventKey="IT">IT</Dropdown.Item>
                <Dropdown.Item eventKey="HR">HR</Dropdown.Item>
                <Dropdown.Item eventKey="Operations">Operations</Dropdown.Item>
                <Dropdown.Item eventKey="Marketing">Marketing</Dropdown.Item>
                <Dropdown.Item eventKey="Shows&Touring">Shows & Touring</Dropdown.Item>
                <Dropdown.Item eventKey="ArtistDevelopment">Artist Development</Dropdown.Item>
                {/* Add more categories as needed */}
                </Dropdown.Menu>
                </Dropdown>
                <Button className="d-flex ml-1 button-bg" style={{boxShadow:'none', height:'30px'}} size='sm' onClick={submitSearchRequest}>Search</Button>
                <Button className="d-flex ml-1 button-cancel"  style={{boxShadow:'none', height:'30px'}} size='sm' onClick={reset}>Reset</Button>
            </div>
            
        </div>
    )
}