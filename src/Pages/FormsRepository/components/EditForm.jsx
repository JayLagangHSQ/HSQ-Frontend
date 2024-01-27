import { useState } from "react";
import { Button , Form  , Modal} from "react-bootstrap";
import Swal from "sweetalert2";

export default function EditForm({props}){

    const refreshEffect = props.refreshEffect;
    const [name, setName] = useState(props.name);
    const [description, setDescription] = useState(props.description);
    const [link , setLink] = useState(props.link);
    const [formId] = useState(props.formId);
    const [showEditForm , setShowEditForm] = useState(false)
    const [department, setDepartment] = useState(props.department); // Step 1
    
    const openEdit = () => {
        setShowEditForm(true);
    }

    const editForm = (e) =>{
        e.preventDefault();
        fetch(`${import.meta.env.VITE_APP_API_URL}/api/forms/form/edit`,{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                formId: formId,
                name: name,
                department:department,
                description:description,
                link:link
            })
        })
        .then(data => {
            if(data.status === 200){
                Swal.fire({
                    title: "Success",
                    icon: 'success',
                    text: 'Form edited succesfully'
                })
                refreshEffect();
                closeEdit();
            } else {
                Swal.fire({
                    title: "Error!!",
                    icon: 'error',
                    text: 'Please try again'
                })
                closeEdit();
            }

        })
    }
    const closeEdit = () => {
        setName('');
        setDescription('');
        setLink('');
        setDepartment('');
        setShowEditForm(false);
    }
    return(
        <>
        <span className="small cursor-pointer" onClick={() => openEdit()} style={{textDecoration:'underline', color:'#016B83'}}>Edit Form</span>
        <Modal show={showEditForm} onHide={closeEdit}>
            <Form className="small" onSubmit={(e)=> editForm(e)}>
                <Modal.Header>
                    <Modal.Title>Add New Form</Modal.Title>
                    <Button onClick={() => closeEdit()} className="modal-close bg-warning">X</Button>
                </Modal.Header>
                <Modal.Body className="small">    
                    <Form.Group controlId="name">
                        <Form.Label className="mb-0 mt-1">Name</Form.Label>
                        <Form.Control className="small" type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
                    </Form.Group>
                    <Form.Group controlId="department"> {/* Step 2 */}
                        <Form.Label className="mb-0 mt-1">Department</Form.Label>
                        <Form.Control className="small" as="select" value={department} onChange={(e) => setDepartment(e.target.value)} required>
                        <option value="company-wide">Company-wide</option>
                        <option value="executive">Executive</option>
                        <option value="legal&finance">Legal & Finance</option>
                        <option value="it">IT</option>
                        <option value="hr">HR</option>
                        <option value="operations">Operations</option>
                        <option value="marketing">Marketing</option>
                        <option value="shows&touring">Shows & Touring</option>
                        <option value="artistdevelopment">Artist Development</option>
                        {/* Add more options as needed */}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label className="mb-0 mt-1">Form Description</Form.Label>
                        <Form.Control className="small" type="text" value={description} onChange={(e) => setDescription(e.target.value)} required/>
                    </Form.Group>

                    <Form.Group controlId="link">
                        <Form.Label className="mb-0 mt-1">Form Link</Form.Label>
                        <Form.Control className="small" type="text" value={link} onChange={(e) => setLink(e.target.value)} required/>
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button className="small" variant="secondary" onClick={closeEdit}>Close</Button>
                    <Button className="small" style={{backgroundColor:'#016B83'}} type="submit">Submit</Button>
                </Modal.Footer>
            </Form>
        </Modal>
        </>
    )
}