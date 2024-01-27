import { useEffect, useState } from "react"
import ProfileSkeleton from "../../../Components/ProfileSkeleton";
export default function MakeAPost({user}){
    const [imageLoading, setImageLoading] = useState(true);
    const [message, setMessage]=useState("")
    const [showModal, setShowModal] = useState(false);
    const openModal = () =>{

    }

    const handleImageLoad = () => {
        setImageLoading(false);
    };
    useEffect(()=>{
        user.profilePicture === 'false'? setImageLoading(false) : setImageLoading(true)
    },[user.profilePicture])
    return(
        <>
        <div className="border p-3 row" style={{backgroundColor: 'rgba(81, 100, 115, 0.3)', borderRadius:"8px", width:'100%'}}>
        
            <div className="d-flex justify-content-center align-items-center col-2">
                
                {user.profilePicture !== 'false' ? 
                <img 
                src={user.profilePicture} 
                alt="user.profilePicture" 
                onLoad={handleImageLoad} 
                style={{ borderRadius: '50%', width: '45px', height: '45px', objectFit: "cover" }}/>
                :
                <img
                src='/icons/sidebar-user-icon.svg'
                alt="defaultPic"
                style={{ borderRadius: '50%', width: '45px', height: '45px', objectFit: "cover" }}/>
                }
                {imageLoading? 
                <ProfileSkeleton borderRadius={'50%'} height={'45px'} width={'45px'}/>
                :<></>}
            </div>
            <div className="d-flex justify-content-center align-items-center col-7" style={{width:'100%'}}  > 
                <button className="" onClick={openModal}  style={{ borderRadius: '25px',width:'100%', backgroundColor:'white', borderColor:'muted', borderWidth:'0.5px' }}>
                    {`What's on your mind, ${user.firstName}?`}
                </button>
            </div>
            <hr />
            <div className="col-3 d-flex justify-content-center align-items-center">
                <button className="" onClick={openModal}  style={{ borderRadius: '25px',width:'100%', backgroundColor:'white', borderColor:'muted', borderWidth:'0.5px' }}>Upload image</button>
            </div>
        
        
        </div>
        
        </>
    )
}