import { useEffect, useState } from "react";
import { Modal, Button, Dropdown, Form } from "react-bootstrap";
import Swal from "sweetalert2";

export default function EditNewsAndUpdateModal({ data,user, openEdit,setOpenEdit,fetchData, setLoading, loading, openModal}){

    const [title, setTitle] = useState(data.title)
    const [department, setDepartment] = useState(data.department)
    const [message, setMessage] = useState(data.message)
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
        } else if(title === data.title && message === data.message && department===data.department){
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

    const closeModal = () => {
        setOpenEdit(false)
        setTitle(data.title)
        setMessage(data.message)
        setDepartment(data.department)
      }

    const handleDepartmentSelect = (selectedDepartment) => {
        setDepartment(selectedDepartment);
    };

    const handlePost = async(event) => {
        event.preventDefault();
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
            await fetch(`${import.meta.env.VITE_APP_API_URL}/api/newsAndUpdates/edit`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    department: department,
                    title: title,
                    message: message,
                    newsAndUpdateId: data._id
                })
            }).then((data) => {
                if (data.status === 201) {
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
                }
            });
        }
    };

    return(
        <>
        <div className="ml-auto d-flex" style={{cursor:'pointer'}} onClick={openModal}>
                <div>
                    <img src="/icons/edit-icon.svg" alt="edit-edit" style={{height:'16px', width:"16px", position:'relative', right:'16%', bottom:'7%'}}/>
                </div>
                <span className="small"><i>Edit post</i></span>
                </div>
            {/* Modal */}
            <Modal show={openEdit} onHide={closeModal}>
                <Modal.Header>
                    <Modal.Title>Edit post</Modal.Title>
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