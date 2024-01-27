import { useState } from "react"
import { Modal, Button } from "react-bootstrap";
import Swal from 'sweetalert2';
export default function ConfirmToken ({showConfirmTokenModal, setShowConfirmTokenModal, setShowEnterNewPassword}){
    const [token, setToken] = useState('')

    const handleTokenChange = (e) => {
        const input = e.target.value;
        setToken(input);
    };
    const handleSubmitToken = (e) =>{

        e.preventDefault();

		fetch(`${import.meta.env.VITE_APP_API_URL}/api/mails/passwordReset/verifyToken`,{
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				token: token
			})
		})
		.then(res => {
            if(res.status === 200){
                setShowConfirmTokenModal(false)
                setShowEnterNewPassword(true)
                localStorage.setItem('resetToken', token)
            } else {
                Swal.fire({
				    title: "Invalid or expired token.",
				    text: "Please try again"
				});
            }
        })
    }
    let isTokenEmpty = (token) => {
        if(token === ""){
            return true
        } else {
            return false
        }
    }
    return(
        <>

        {/* Modal */}
        <Modal show={showConfirmTokenModal}>
            
            <Modal.Header >
            <Modal.Title className="ml-auto mr-auto text-center" style={{color:'#516473'}}>Please enter the token sent to your email address.</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="d-flex flex-column justify-content-center align-items-center">
            <span>Token</span>
            <input type="text" value={token}  onChange={handleTokenChange} />
            </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" disabled={isTokenEmpty(token)} onClick={handleSubmitToken} style={{backgroundColor:'#016B83'}}>
                Submit
            </Button>
            </Modal.Footer>
     
        </Modal>
            
        </>
    )
}