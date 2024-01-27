import { useEffect, useState } from "react";
import { Modal, Button, Dropdown, Form } from "react-bootstrap";
import Swal from "sweetalert2";

export default function PostNewsAndUpdateModal({setUpdatePosted, setSelectedImage, selectedImage, user, showModal,openModal,closeModal,fetchData, setLoading, loading}){
    
    const [title, setTitle] = useState('')
    const [department, setDepartment] = useState('Company-wide')
    const [message, setMessage] = useState('')
    const [missingInfo, setMissingInfo] = useState(true)
    const linkStyle = {
        fontSize: "16px",
        color: "#016B83",
        textDecoration:'underline',
        cursor:'pointer'
    }
    
    useEffect(()=>{
        if(title.length === 0 || message.length === 0){
            setMissingInfo(true)
        } else {
            setMissingInfo(false)
        }
    },[title, message])

    const handleMessageChange = (e) =>{
        const input = e.target.value;
        setMessage(input);
    }
    const handleTitleChange = (e) => {
        const input = e.target.value;
        setTitle(input);
    };
    const handleImageChange = (event) => {
        const fileList = Array.from(event.target.files);
        setSelectedImage(fileList);
    };

    const renderImagePreviews = () => {
        return selectedImage.map((image, index) => (
          <img
            key={index}
            src={URL.createObjectURL(image)}
            alt={`Preview-${index}`}
            className="img-thumbnail mr-2 mb-2"
            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
          />
        ));
      };

    const handleDepartmentSelect = (selectedDepartment) => {
        setDepartment(selectedDepartment);
    };

    const handlePost = async(event) => {
        event.preventDefault();
        setUpdatePosted(true)
        setLoading(true);
        if (title === '') {
            setLoading(false);
            Swal.fire({
                title: 'Something went wrong :(',
                text: 'Please add a meaningful or attention grabbing title',
                customClass: {
                    confirmButton: 'swal-red-button',
                },
            });

        } else {
            const formData = new FormData();
            formData.append('department', department);
            formData.append('title', title);
            formData.append('message', message);
            formData.append('author', user.id);
            for (let i = 0; i < selectedImage.length; i++) {
                formData.append('images', selectedImage[i]);
            }
            await fetch(`${import.meta.env.VITE_APP_API_URL}/api/newsAndUpdates/upload`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: formData,
            }).then((data) => {
                if (data.status === 201) {
                    setUpdatePosted(false)
                    setLoading(false);
                    fetchData();
                    closeModal();
                    Swal.fire({
                        title: 'Posted!',
                        customClass: {
                            title: 'custom-swal-title',
                            confirmButton: 'custom-swal-confirm-button',
                        }
                    })
                } else {
                    closeModal()
                    Swal.fire({
                        title: 'Something went wrong. :(',
                        text: 'Please try again',
                    });
                    setLoading(false);
                    setUpdatePosted(false)
                }
            });
        }
    };

    return(
        <>
            <i onClick={openModal} className="text-left" style={linkStyle}>Create A Post</i>
            {/* Modal */}
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header>
                    <Modal.Title>Create post</Modal.Title>
                    <span style={{cursor:'pointer'}} className="font-weight-bold" onClick={closeModal}>X</span>
                </Modal.Header>

                <Modal.Body>
                {/* main body container for control */}
                <div className="d-flex flex-column" style={{minHeight:'40vh'}}>
                    {/* TItle */}
                    <div className="d-flex flex-column justify-content-center align-items-start m-2">
                        <input type="text" value={title} placeholder={'Title...'}  onChange={handleTitleChange}  style={{borderRadius:'5px', borderWidth:'1px', width:'70%'}}/>
                    </div>
                    {/* Message */}
                    <div className="m-2">
                    <textarea
                        value={message}
                        placeholder={'What do you want to say?'}
                        onChange={handleMessageChange}
                        style={{ borderRadius: '5px', minHeight: '20vh', width: '100%', resize: 'none'  }}
                    />
                    </div>
                    {/* Image Attachments */}
                    <div className="d-flex flex-column align-items-center justify-content-center p-2 mt-auto m-2" style={{minHeight:'80px', borderRadius:'8px', borderWidth:'1px', borderStyle:'solid', borderColor:'#516473' }}>
                        
                        <div className="d-flex overflow-auto">
                            {selectedImage.length > 0?<>{renderImagePreviews()}</>   : null}
                        </div>
                    
                        <Form.Group controlId="imageInput">
                            <Form.Label className="smallest">Please choose the image that you want to attach(optional)</Form.Label>
                            <Form.Control
                                style={{borderStyle:'none'}}
                                className="smallest newsAndUpdateImage"
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </Form.Group>
                    </div>  
                </div>  
                </Modal.Body>
                
                <Modal.Footer>
                    
                {/* Department dropdown */}
                <Dropdown onSelect={handleDepartmentSelect} className="ml-1" >
                <Dropdown.Toggle variant="secondary" id="departmentDropdown" size='sm'>
                    {department ? department : 'Deparment'}
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
                {/* End of department dropdown */}

                <Button variant="secondary" size='sm' onClick={closeModal}>
                Close
                </Button>
                <Button disabled={loading || missingInfo} style={{backgroundColor:'#016B83'}}size='sm' onClick={handlePost}>
                Post
                </Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}