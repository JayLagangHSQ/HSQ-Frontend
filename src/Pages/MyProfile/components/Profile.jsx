import { useEffect, useState } from "react"
import Swal from "sweetalert2";
import UpdateProfilePicModal from "../subcomponents/UpdateProfilePicModal";
import UpdateMobileNoModal from "../subcomponents/UpdateMobileNoModal";
import UpdatePersonalEmailModal from "../subcomponents/UpdatePersonalEmailModal";
import ProfileSkeleton from "../../../Components/ProfileSkeleton";

export default function Profile(){
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastname] = useState('');
    const [department, setDepartment] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [workEmail, setWorkEmail] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [personalEmail, setPersonalEmail] = useState('');
    const [profilePictureKey, setProfilePictureKey] = useState('');
    const [profilePictureUrl, setProfilePictureUrl] = useState('')
    const [showModal, setShowModal] = useState(false);
    const [showMobileNoModal, setShowMobileNoModal] =useState(false);
    const [showEmailModal, setShowEmailModal] =useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(true)
    const [noPictureAdded, setNoPictureAdded] = useState(true)

    useEffect(()=>{
        fetchUserData()
    },[])
    useEffect(()=>{

        if(selectedImage !== null){
            setNoPictureAdded(false)
        } else {
            setNoPictureAdded(true)  
        }
    },[selectedImage])

    const fetchUserData = () =>{
        fetch(`${import.meta.env.VITE_APP_API_URL}/api/users/user/detail`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
    
            data = data.result
            if(typeof data !== "undefined"){
                setFirstName(data.firstName)
                setLastname(data.lastName)
                setDepartment(data.department)
                setJobTitle(data.jobTitle)
                setWorkEmail(data.email)
                setContactNo(data.mobileNo)
                setPersonalEmail(data.personalEmail)
                setProfilePictureKey(data.profilePictureKey)
                setProfilePictureUrl(data.profilePictureUrl)
            } else {
                Swal.fire({
                    title: 'Something went wrong :(',
                    text: 'Please try to refresh your browser.'
                });
            }   
        })
    }
    
    const linkStyle = {
        fontSize: "12.8px",
        color: "#016B83",
        textDecoration:'underline',
        cursor:'pointer'
    }
        const openUpdatePictureModal = () => {
            if(loading){
                return
            }
            setShowModal(true);
        };

        const closeUpdatePictureModal = () => {
            setShowModal(false);
            setSelectedImage(null)

        };
        const openUpdateMobileNoModal = () => {
            setShowMobileNoModal(true);
        };

        const closeUpdateMobileNoModal = () => {
            setShowMobileNoModal(false);
        };
        const openUpdateEmailModal = () => {
            setShowEmailModal(true);
        };

        const closeUpdateEmailModal = () => {
            setShowEmailModal(false);
        };
    
    
      const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
      };
      const handleImageLoad = () => {
        setLoading(false);
      };

      const handleUpload = () => {
        if (!selectedImage) {
            // Handle case where no image is selected
            return;
          }
        setLoading(true)
          const formData = new FormData();
          formData.append("image", selectedImage);
            if(typeof profilePictureKey === 'object'){
                formData.append("key", profilePictureKey.key);
            }
          fetch(`${import.meta.env.VITE_APP_API_URL}/api/users/user/profilePicture/update`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
            fetchUserData()

            closeUpdatePictureModal();
            Swal.fire({
            title: 'Profile updated!',
            customClass: {
                title: 'custom-swal-title',
                confirmButton: 'custom-swal-confirm-button',
            }
            });
            })
            .catch((error) => {
                setLoading(false)
              // Handle error during upload
              Swal.fire({
                        title: 'Something went wrong. :(',
                        text: 'Please try again',
                    });
            });
        // Close the modal after successful upload
        closeUpdatePictureModal();
      };

    return(
        <>

            <div  className="d-flex flex-column justify-content-center text-center">
                {profilePictureUrl !== 'false' ? 
                <div className="d-flex justify-content-center">
                    
                    <img 
                        src={profilePictureUrl}
                        onLoad={handleImageLoad} 
                        alt="profile-picture" 
                        style={{ borderRadius: '50%', width: '125px', height: '125px', border: '2px solid #516473', objectFit: "cover" }}
                    />
                    {loading? 
                    <ProfileSkeleton borderRadius={'50%'} height={'125px'} width={'125px'}/>
                    :<></>
                    }
                </div>
                :
                <div>
                    <img 
                        src='/icons/sidebar-user-icon.svg' 
                        alt="profile-picture" 
                        style={{ borderRadius: '50%', width: '125px', height: '125px' }}
                    />
                </div>
                }
                <span className="mt-2 small" style={linkStyle} onClick={openUpdatePictureModal}>Update Profile picture</span>
            </div>
            <div  className="d-flex flex-column justify-content-center text-center mt-3 mb-4">
                <div  className="mt-2">
                    <span className="muted">BASIC INFO</span>
                    <hr style={{width:'50%'}}/>
                </div>
                <div className="mt-2">
                    <span className="muted"><u>NAME</u></span>
                </div>

                <div>
                    <span className="muted"><b>{firstName} {lastName}</b></span>
                    <hr style={{width:'50%'}}/>
                </div>
                <div  className="mt-2">
                    <span  className="muted"><u>DEPARTMENT</u></span>
                </div>

                <div>
                    <span className="muted"><b>{department}</b></span>
                    <hr style={{width:'50%'}}/>
                </div>
                <div  className="mt-2">
                    <span className="muted"><u>POSITION</u></span>
                </div>
                <div>
                    <span className="muted"><b>{jobTitle}</b></span>
                    <hr style={{width:'50%'}}/>
                </div>
                <hr />
                <div  className="mt-2">
                    <span className="muted">CONTACT DETAILS</span>
                    <hr style={{width:'50%'}}/>
                </div>
                <div  className="mt-2">
                    <span className="muted"><u>HSQ EMAIL</u></span>
                </div>
                <div>
                    <span className="muted"><b><i>{workEmail}</i></b></span>
                    <hr style={{width:'50%'}}/>
                </div>
                <div  className="mt-2">
                    <span className="muted"><u>CONTACT NUMBER</u></span>
                </div>
                <div>
                    <span className="muted ml-4"><b><i>{contactNo}</i></b></span>
                    <span className="small" style={linkStyle}>
                        <UpdateMobileNoModal openUpdateMobileNoModal={openUpdateMobileNoModal} showMobileNoModal={showMobileNoModal} closeUpdateMobileNoModal={closeUpdateMobileNoModal} fetchUserData={fetchUserData}/>
                    </span>
                    <hr style={{width:'50%'}}/>
                </div>
                <div  className="mt-2">
                    <span className="muted"><u>PERSONAL EMAIL</u></span>
                </div>
                <div>
                    <span className="muted ml-3"><b><i>{personalEmail}</i></b></span> 
                    <span className="small"  style={linkStyle} >
                        <UpdatePersonalEmailModal openUpdateEmailModal={openUpdateEmailModal} showEmailModal={showEmailModal} oldEmail={personalEmail} closeUpdateEmailModal={closeUpdateEmailModal} fetchUserData={fetchUserData}/>
                    </span>
                </div>
            </div>
            <UpdateProfilePicModal noPictureAdded={noPictureAdded} showModal={showModal} closeUpdatePictureModal={closeUpdatePictureModal} handleImageChange={handleImageChange} handleUpload={handleUpload}/>
        </>
    )
}