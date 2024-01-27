import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Swal from "sweetalert2";

export default function AddNewForm({ setForms, refreshEffect }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [department, setDepartment] = useState("company-wide"); // Step 1
  const [showAddNewForm, setShowAddNewForm] = useState(false);

  const openEdit = () => {
    setShowAddNewForm(true);
  };

  const addNewForm = (e) => {
    e.preventDefault();
    fetch(`${import.meta.env.VITE_APP_API_URL}/api/forms/newForm`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name: name,
        description: description,
        link: link,
        department: department, // Step 3
      }),
    }).then((data) => {
      if (data.status === 201) {
        Swal.fire({
          title: "Success",
          icon: "success",
          text: "Form added successfully",
        });
        refreshEffect();
        closeEdit();
      } else {
        Swal.fire({
          title: "Error!!",
          icon: "error",
          text: "Please try again",
        });
        closeEdit();
      }
    });
  };

  const closeEdit = () => {
    setName("");
    setDescription("");
    setLink("");
    setDepartment(""); // Step 1
    setShowAddNewForm(false);
  };

  return (
    <>
      <Button className="button-bg" size="sm" onClick={() => openEdit()}>
        Add New Form
      </Button>

      <Modal show={showAddNewForm} onHide={closeEdit}>
        <Form onSubmit={(e) => addNewForm(e)}>
          <Modal.Header>
            <Modal.Title>Add New Form</Modal.Title>
            <Button onClick={() => closeEdit()} className="modal-close bg-warning">
              X
            </Button>
          </Modal.Header>
          <Modal.Body className="small">
            <Form.Group controlId="name">
              <Form.Label className="mb-0 mt-1">Name</Form.Label>
              <Form.Control className="small" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
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
              <Form.Control className="small" type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="link">
              <Form.Label className="mb-0 mt-1">Form Link</Form.Label>
              <Form.Control className="small" type="text" value={link} onChange={(e) => setLink(e.target.value)} required />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button className="small" variant="secondary" onClick={closeEdit}>
              Close
            </Button>
            <Button className="small" variant="success" type="submit">
              Post
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
