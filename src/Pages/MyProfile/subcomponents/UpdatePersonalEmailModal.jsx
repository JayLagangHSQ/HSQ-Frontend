import { Modal, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { isEmailValid } from "../../../Util/validateEmail";

export default function UpdatePersonalEmailModal({openUpdateEmailModal, showEmailModal, oldEmail, closeUpdateEmailModal,fetchUserData}){

    const [newEmail, setNewEmail] = useState('')

    const handleEmailhange = (e) => {
        const input = e.target.value;
        setNewEmail(input);
      };
    const handleEmailUpdate = async(e) =>{

        e.preventDefault();
        fetch(`${import.meta.env.VITE_APP_API_URL}/api/users/user/update/personalEmail`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            newEmail:newEmail
          }),
        }).then((data) => {
          if (data.status === 200) {
            Swal.fire({
              title: "Personal email updated!",
              customClass: {
                title: 'custom-swal-title',
                confirmButton: 'custom-swal-confirm-button',
                }
            });
            fetchUserData()
            closeUpdateEmailModal()
            
          } else {
            Swal.fire({
              title: "Something wen't wrong! :(",
              text: "Please try again",
            });
            closeUpdateEmailModal()
          }
        });
    }
    return(
        <>
        <i onClick={openUpdateEmailModal} style={{position:'relative', left:'2%'}}>edit</i>
        {/* Modal */}
        <Modal show={showEmailModal} onHide={closeUpdateEmailModal}>
            <Modal.Header closeButton >
            <Modal.Title style={{color:'#516473'}}>Update Contact Number</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="d-flex flex-column justify-content-center align-items-center">
            <span>Email address</span>
            <input type="text" value={newEmail} placeholder={oldEmail}  onChange={handleEmailhange} />
            {!isEmailValid(newEmail) ? <span className="small" style={{color:'#F22F41'}}>Please enter a valid email address</span> :null}
            </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={closeUpdateEmailModal}>
            Close
            </Button>
            <Button variant="primary" disabled={!isEmailValid(newEmail)} onClick={handleEmailUpdate} style={{backgroundColor:'#016B83'}}>
            Update
            </Button>
            </Modal.Footer>
            </Modal>
        </>
    )
}