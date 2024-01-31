import { useState, useEffect, useContext } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import UserContext from '../../Contexts/userContext';
import Swal from 'sweetalert2';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import { clockIn } from '../../Util/clockIn';

export default function Login(){
    const {user,setUser} = useContext(UserContext);

	const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isActive, setIsActive] = useState(true);
	const [showForgotModal, setShowForgotModal] = useState(false)

    useEffect(() => {

        if(email !== '' && password !== ''){
            setIsActive(true);
        }else{
            setIsActive(false);
        }
		
    }, [email, password]);

    function authenticate(e) {

        e.preventDefault();

		fetch(`${import.meta.env.VITE_APP_API_URL}/api/users/login`,{
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
		.then(res => res.json())
		.then(data => {
			if(data.access){
				// syntax: localStorage('property name', value)
				// storing the access token inside the browser
				localStorage.setItem('token', data.access);
				document.cookie = `token=data.access=.hollywoodsq.com;path=/`;
				// the access token stored in the localStorage will then be used to be storedin the context which will be hsared across the application
				// setUser({
				// 	access: localStorage.getItem('token')
				// });
				retrieveUserDetails(data.access);

				
			} else {

				// alert(`${email} does not exist`)
				Swal.fire({
				    title: "Authentication failed",
				    icon: "error",
				    text: "Check your login details and try again."
				});
			}
		})
	
		setEmail('');
		setPassword('');

    }

	const retrieveUserDetails = (token) => {

		fetch(`${import.meta.env.VITE_APP_API_URL}/api/users/user/detail`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        
        .then(res => res.json())
        .then( async data => {
            if(typeof data !== "undefined"){

                setUser({
                    id: data._id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    jobTitle: data.jobTitle,
                    isManager: data.isManager
                })
                const isClockedIn = await clockIn();
				console.log(isClockedIn)
				if(isClockedIn){
					Swal.fire({
						title: "Clock-in Successful",
						text: `Welcome!`,
						customClass: {
							title: 'custom-swal-title',
							confirmButton: 'custom-swal-confirm-button',
						}
					})
				} else {

					Swal.fire({
						title: "Login Successful",
						text: `Welcome!`,
						customClass: {
							title: 'custom-swal-title',
							confirmButton: 'custom-swal-confirm-button', 
						}
					});			
				}

            } else {
                setUser({
                    id: null,
                    firstName: null,
                    lastName: null,
                    jobTitle: null,
                    isManager: null
                })
            }   
        })
	}

	const openResetPasswordModal = () => {
		setShowForgotModal(true);
	};

	const closeResetPasswordModal = () => {
		setShowForgotModal(false);
	};

    return(
        user.id != null ? <Navigate to="/" /> 
    	:
        <>
        <Container fluid style={{height:"100vh"}}>
			<Row className='justify-content-center mb-5 mt-5' style={{height:'507'}}>
				<Col sm={6} lg={5} xl={4} className='' style={{height:'507', width:'486',borderRadius:'10px', border:'solid', borderWidth:'1px', backgroundColor:'#F3F3F3'}}>
					<Form onSubmit={(e) => authenticate(e)} className='p-4'>
						<div className='pl-3 pr-3 mt-5 text-center'>
							<img className='' src="/icons/loading-black-logo.svg" alt="brand-logo" />
							<h4 className="text-center mt-2" style={{fontWeight:'700'}}>Login</h4>
						</div>
						
						<div className='mt-4'>
							<Form.Group controlId="userEmail" >
								<Form.Control className='text-center custom-search-input' type="email" placeholder="Enter email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
							</Form.Group>
						</div>
						
						<div className='mt-4'>
							<Form.Group  controlId="password">
								<Form.Control className='text-center custom-search-input' type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}required />
							</Form.Group>
						</div>
						
						<div className='d-flex justify-content-center mt-4 mb-4'>
							{ isActive ? <Button style={{backgroundColor:'#016B83',  border:'none'}}  type="submit" id="submitBtn" className='mt-3'>Login</Button> : <Button style={{backgroundColor:'#575757', border:'none'}} type="submit" id="submitBtn" className='mt-3' disabled>Login</Button>
							}
						</div>
						<div className='text-center mb-4'>
							<span className='cursor-pointer text-muted small' >
								<ForgotPasswordModal showForgotModal={showForgotModal} openResetPasswordModal={openResetPasswordModal} closeResetPasswordModal={closeResetPasswordModal}/>
							</span>
							
						</div>
						
					</Form>
				</Col>
			</Row>
		</Container>
        </>
    )
}