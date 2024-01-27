import { useState, useEffect} from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { isPasswordComplex } from '../../../Util/isPasswordComplex';

export default function UpdatePassword(){
    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isActive, setIsActive] = useState(false);
    const [isPasswordMatch, setIsPasswordMatch] = useState(false)

    useEffect(() => {

        if(currentPassword !== '' && password !== '' && confirmPassword !== '' && password === confirmPassword){
            setIsActive(true);
        }else{
            setIsActive(false);
        }

        if(password !== confirmPassword && confirmPassword !== ''){
            
            setIsPasswordMatch(false)
        } else {
            setIsPasswordMatch(true)
        }
		if(!isPasswordComplex(password)){
            setIsActive(false)
        }  
    }, [currentPassword, password, confirmPassword]);

    const handleUpdatePassword = (e) => {
        e.preventDefault();
        fetch(`${import.meta.env.VITE_APP_API_URL}/api/users/user/passwordUpdate`,{
			method: 'PUT',
			headers: {
				"Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				currentPassword: currentPassword,
				newPassword: password
			})
		})
        .then((res) =>{
            if(res.status ===200){

                Swal.fire({
                    title: 'Password Updated!',
                    customClass: {
                        title: 'custom-swal-title',
                        confirmButton: 'custom-swal-confirm-button',
                    },
                    
                    didClose: () => {
                        window.location.href = '/logout';
                    },
                });
            } else {
                Swal.fire({
                    title: 'Something went wrong. :(',
                    text: 'Please try again',
                });
            }
        })
    }

    return(
        <>

            <div className="d-flex justify-content-center text-center">
                <h3 className="muted">Update Password</h3>
            </div>

            <div className='ml-auto mr-auto border mt-3' style={{height:'507', width:'60%',borderRadius:'10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
					<Form onSubmit={(e) => handleUpdatePassword(e)} className='p-4'>
						
						<div className='mt-4'>
                            <Form.Label className='muted mb-0'>Current password</Form.Label>
							<Form.Group controlId="currentPassword" >
								<Form.Control className='text-center custom-search-input ' type="password" placeholder="Enter current password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
							</Form.Group>
						</div>
						
						<div className='mt-4'>
                        <Form.Label className='muted mb-0'>New password</Form.Label>
							<Form.Group  controlId="password">
								<Form.Control className='text-center custom-search-input ' type="password" placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)}required style={{borderRadius:'5px'}} />
							</Form.Group>
						</div>
						<div className='mt-4'>
							<Form.Group  controlId="confirmPassword">
                                <Form.Label className='muted mb-0'>Confirm new password</Form.Label>
								<Form.Control className='text-center custom-search-input ' type="password" placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}required style={{borderRadius:'5px'}} />
							</Form.Group>
                            {!isPasswordComplex(password) ? <span className='small' style={{color:'#F22F41'}}><i>Password should contain at least 8 characters, one uppercase leter, lowercase letter, number, and special character. </i></span> : <></>}
                            {!isPasswordMatch ? <span className='small' style={{color:'#F22F41'}}><i>Make sure to match new password with confirm password</i></span> : <></>}
                            
						</div>
						<div className='d-flex justify-content-center mt-4 mb-4'>
							{ isActive ? <Button style={{backgroundColor:'#016B83',  border:'none'}}  type="submit" id="submitBtn" className='mt-3'>Update Password</Button> : <Button style={{backgroundColor:'#575757', border:'none'}} type="submit" id="submitBtn" className='mt-3' disabled>Update Password</Button>
							}
						</div>
					</Form>
				</div>
        </>
    )
}