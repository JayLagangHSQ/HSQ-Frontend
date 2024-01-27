import { Modal, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { PhoneNumberUtil } from 'google-libphonenumber';

export default function UpdateMobileNoModal({openUpdateMobileNoModal, showMobileNoModal, closeUpdateMobileNoModal,fetchUserData}){
    const phoneUtil = PhoneNumberUtil.getInstance();
    const [newMobileNo, setNewMobileNo] = useState('')
    

    const isPhoneValid = (newMobileNo) => {
      try {
        return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(newMobileNo));
      } catch (error) {
        return false;
      }
    };

    const handleMobileUpdate = async(e) =>{
        e.preventDefault();
        fetch(`${import.meta.env.VITE_APP_API_URL}/api/users/user/update/mobileNo`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            newMobileNo:newMobileNo
          }),
        }).then((data) => {
          if (data.status === 200) {
            Swal.fire({
              title: "Contact number updated!",
              customClass: {
                title: 'custom-swal-title',
                confirmButton: 'custom-swal-confirm-button',
                }
            });
            fetchUserData()
            closeUpdateMobileNoModal()
            
          } else {
            Swal.fire({
              title: "Something wen't wrong! :(",
              text: "Please try again",
            });
            closeUpdateMobileNoModal()
          }
        });
    }
    return(
        <>
        <i onClick={openUpdateMobileNoModal} style={{position:'relative', left:'3%'}}>edit</i>
        {/* Modal */}
        <Modal show={showMobileNoModal} onHide={closeUpdateMobileNoModal}>
            <Modal.Header closeButton >
            <Modal.Title style={{color:'#516473'}}>Update Contact Number</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="d-flex flex-column justify-content-center align-items-center">
            <PhoneInput
                defaultCountry="gb"
                value={newMobileNo}
                onChange={(phone) => setNewMobileNo(phone)}
            />
            {!isPhoneValid(newMobileNo) ? <span className="small" style={{color:'#F22F41'}}>Please enter a valid phone number</span> :null}
            </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={closeUpdateMobileNoModal}>
            Close
            </Button>
            <Button variant="primary" disabled={!isPhoneValid(newMobileNo)} onClick={handleMobileUpdate} style={{backgroundColor:'#016B83'}}>
            Update
            </Button>
            </Modal.Footer>
            </Modal>
        </>
    )
}