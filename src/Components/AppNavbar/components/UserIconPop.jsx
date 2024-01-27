import { Link } from 'react-router-dom';
import { linkStyle } from '../../../Util/styling';
import { clockOut } from '../../../Util/clockOut';
import Swal from 'sweetalert2';
export default function UserIconPop ({setIsOpen}){
    const handleClick = () => {
            setIsOpen(false)
    }
    const handleClockOutClick = async() =>{
        const isConfirmed = await Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to clock-out. This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, proceed to clock-out!'
        });
        if (isConfirmed.isConfirmed){
            try{
                const isClockedOut = await clockOut();
                if(isClockedOut === true){
					Swal.fire({
						title: "Clock-out Successful",
						text: `Enjoy the rest of your day!`,
						customClass: {
							title: 'custom-swal-title',
							confirmButton: 'custom-swal-confirm-button',
						}
					})
				} else {
					Swal.fire({
						title: "Error",
						text: `${isClockedOut.error}`
					});			
				}
            } catch (err){
                console.log(err)
                Swal.fire({
                    title:"Something went wrong",
                    text:'Please contact support'
                })
            }
        }
    }
    return(
        <>
        <div className="d-flex flex-column justify-content-center align-items-center p-1" style={{border:`solid`,borderWidth:`1px`,borderRadius:`8px`,height:`129px`, width:`130px`, zIndex: '1', position: 'fixed', transform: 'translate(0%, 80%)', backgroundColor:'#F3F3F3'}}>

            <div  className="m-1 cursor-pointer" onClick={handleClick}>
            <Link  to="/my-profile/detail" className="m-1 cursor-pointer" style={linkStyle}>            
            <span className="mr-3">My Profile</span>
            <img className="mb-1 img-fluid" src="/icons/pop-user.svg" alt="pop-user.svg" /> 
            </Link>
            </div>
            
            <Link to="/logout" className="m-1 cursor-pointer" style={linkStyle}>
                <span className="mr-4">Sign-out</span>
                <img className="mb-1" src="/icons/pop-sign-out.svg" alt="pop-sign-out.svg" />
            </Link>

            <div className="m-1 cursor-pointer" onClick={handleClockOutClick}>
                <span className="mr-4">Clock-out</span>
                <img className="mb-1" src="/icons/pop-clock-out.svg" alt="pop-clock-out.svg" />
            </div>
            
        </div>
        </>
    )
}