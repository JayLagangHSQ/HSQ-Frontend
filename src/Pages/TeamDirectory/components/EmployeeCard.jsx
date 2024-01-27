import { useState } from "react";
import ProfileSkeleton from "../../../Components/ProfileSkeleton";

export default function EmployeeCard({user, refreshEffect}){
    const [loading, setLoading] = useState(true)

    const handleImageLoad = () => {
        setLoading(false);
      };

    return(
        /*Add onClick here that opens a modal for user*/
        <div className="ml-3 mt-2 d-flex flex-column text-center align-items-center p-2" style={{height:'230px', width:'180px', backgroundColor:'', borderRadius:'8px', border: '2px solid #516473'}}>

            {/* load profile pictures */}
            {user.profilePictureUrl !== null ? 
            <>
                <img 
                    className="mt-2"
                    src={user.profilePictureUrl}
                    onLoad={handleImageLoad} 
                    alt="profile-picture" 
                    style={{ borderRadius: '50%', width: '10vh', height: '10vh', border: '2px solid #516473', objectFit: "cover" }}
                />
                {loading? 
                <ProfileSkeleton classNames={'mt-2'} borderRadius={'50%'} height={'10vh'} width={'10vh'}/>
                :<></>
                }
            </>
            :
            <>
                <img 
                    className="mt-2"
                    src='/icons/sidebar-user-icon.svg' 
                    alt="profile-picture" 
                    style={{ borderRadius: '50%', width: '10vh', height: '10vh' }}
                />
            </>}

            {/* render firstName and lastName */}
            <span className="smallest mt-2 font-weight-bold">{user.firstName} {user.lastName}</span>
            {/* render department*/}
            <span className="smallest mt-2">{user.department}</span>
            {/* render job title */}
            <span className="smallest mt-2 font-weight-bold">{user.jobTitle}</span>
            {/* render hsq email */}
            <span className="smallest mt-2 font-italic" style={{ wordWrap: "break-word", width: "100%" }}>{user.email}</span>
            {/* render contact number */}
            <span className="smallest mt-2 font-italic mb-auto">{user.mobileNo}</span>

            
            
            
        </div>
    )
}