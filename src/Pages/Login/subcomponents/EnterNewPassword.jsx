import { useState, useEffect } from "react"
import { Modal, Button } from "react-bootstrap";
import Swal from 'sweetalert2';
import { isPasswordComplex } from "../../../Util/isPasswordComplex";
export default function EnterNewPassword ({ showEnterNewPassword,setShowEnterNewPassword}){
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isNotValid, setIsNotValid] = useState(true);
    const [isPasswordMatch, setIsPasswordMatch] = useState(false)

    useEffect(() => {

        if(newPassword.length === 0 || confirmPassword.length === 0 || isPasswordComplex(newPassword) === false || (newPassword !== confirmPassword)){
            setIsNotValid(true);
        } else {
            setIsNotValid(false);
        }

        if(newPassword !== confirmPassword){
            setIsPasswordMatch(false)
        }else{
            setIsPasswordMatch(true)
        }
    }, [newPassword, confirmPassword]);
    const handleNewPasswordChange = (e) => {
        const input = e.target.value;
        setNewPassword(input);
    };
    const handleConfirmPasswordChange = (e) => {
        const input = e.target.value;
        setConfirmPassword(input);
    };

    const handleSubmitReset = (e) =>{
        e.preventDefault();

		fetch(`${import.meta.env.VITE_APP_API_URL}/api/mails/passwordReset/reset`,{
			method: 'PUT',
			headers: {
                Authorization: `Bearer ${localStorage.getItem('resetToken')}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				newPassword: newPassword
			})
		})
		.then(res => {
            if(res.status === 200){
                setShowEnterNewPassword(false)
                Swal.fire({
				    title: "Password successfully updated!",
				    text: "Please try to login using your new password"
				});
                localStorage.removeItem('resetToken');
            } else if(res.status === 400){
                setShowEnterNewPassword(false)
                localStorage.removeItem('resetToken');
                Swal.fire({
				    title: "Invalid or expired token.",
				    text: "Please try again"
				});
                
            } else {
                setShowEnterNewPassword(false)
                localStorage.removeItem('resetToken');
                Swal.fire({
				    title: "Something went wrong",
				    text: "Please try again"
				});
            }
        })
    }
    return(
        <>

        {/* Modal */}
        <Modal show={showEnterNewPassword}>
            
            <Modal.Header >
            <Modal.Title className="ml-auto mr-auto text-center" style={{color:'#516473'}}>Please enter your new password.</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="d-flex flex-column justify-content-center align-items-center">
            <span>Enter New Password</span>
            <input type="password" value={newPassword}  onChange={handleNewPasswordChange} />
            <span>Confirm New Password</span>
            <input type="password" value={confirmPassword}  onChange={handleConfirmPasswordChange} />
            <div className="text-wrap" style={{width:'50%'}}>
            {!isPasswordComplex(newPassword) ? <span className='smallest' style={{color:'#F22F41'}}><i>Password should contain at least 8 characters, one uppercase leter, lowercase letter, number, and special character. </i></span> : <></>}
            {!isPasswordMatch && confirmPassword !== '' && newPassword !== ''? <span className='small' style={{color:'#F22F41'}}><i>Make sure to match new password with confirm password</i></span> : <></>}
            </div>
            
            </div>
            
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" disabled={isNotValid} onClick={handleSubmitReset} style={{backgroundColor:'#016B83'}}>
                Submit
            </Button>
            </Modal.Footer>
     
        </Modal>
            
        </>
    )
}