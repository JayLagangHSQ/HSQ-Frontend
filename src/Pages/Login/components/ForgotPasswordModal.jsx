import { useState } from "react"
import { Modal, Button } from "react-bootstrap";
import { isEmailValid } from "../../../Util/validateEmail";
import ConfirmToken from "../subcomponents/ConfirmToken";
import Swal from 'sweetalert2';
import EnterNewPassword from "../subcomponents/EnterNewPassword";
export default function ForgotPasswordModal ({showForgotModal, openResetPasswordModal, closeResetPasswordModal}){
    const [email, setEmail] = useState('')
    const [showConfirmTokenModal, setShowConfirmTokenModal] = useState(false)
    const [showEnterNewPassword, setShowEnterNewPassword] = useState(false)
    const handleEmailchange = (e) => {
        const input = e.target.value;
        setEmail(input);
    };
    const handleSubmitEmail = (e) =>{
        e.preventDefault();

		fetch(`${import.meta.env.VITE_APP_API_URL}/api/mails/passwordReset/GenerateToken`,{
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email
			})
		})
		.then(res => {
            if(res.status === 200){
                setShowConfirmTokenModal(true)
                closeResetPasswordModal();
            } else if(res.status === 404){
                Swal.fire({
				    title: "No User Found",
				    icon: "error",
				    text: "No account found with the email you provided."
				});
            } else {
                Swal.fire({
				    title: "Something went wrong",
				    text: "Please try again"
				});
            }
        })
    }

    return(
        <>
            <i onClick={openResetPasswordModal} >Forgot password?</i>
        {/* Modal */}
        <ConfirmToken showConfirmTokenModal={showConfirmTokenModal} setShowConfirmTokenModal={setShowConfirmTokenModal} setShowEnterNewPassword={setShowEnterNewPassword}/>
        <EnterNewPassword showEnterNewPassword={showEnterNewPassword} setShowEnterNewPassword={setShowEnterNewPassword}/>
        <Modal show={showForgotModal} onHide={closeResetPasswordModal}>
            
            <Modal.Header closeButton >
            <Modal.Title className="ml-auto mr-auto" style={{color:'#516473'}}>Password Reset</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="d-flex flex-column justify-content-center align-items-center">
            <span>Email address</span>
            <input type="text" value={email}  onChange={handleEmailchange} />
            {!isEmailValid(email) && email !== ''? <span className="small" style={{color:'#F22F41'}}>Please enter a valid email address</span> :null}
            </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={closeResetPasswordModal}>
            Close
            </Button>
            <Button variant="primary" disabled={!isEmailValid(email)} onClick={handleSubmitEmail} style={{backgroundColor:'#016B83'}}>
            Submit
            </Button>
            </Modal.Footer>
     
        </Modal>
            
        </>
    )
}