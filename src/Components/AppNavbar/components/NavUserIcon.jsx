import { useEffect } from 'react';

export default function NavUserIcon({setNotifIsOpen,setIsOpen, isOpen, user}){


    const handleClick = () => {
        setNotifIsOpen(false)
        if(!isOpen){
            setIsOpen(true)
        } else if(isOpen){
            setIsOpen(false)
        }
    }
      

    return(
        <a  style={{cursor:'pointer'}} onClick={handleClick}>
            {user.profilePicture !== "false" ? 
            <div className="d-flex">
            <div>
                <img 
                src={user.profilePicture}
                className="" 
                alt="profile-picture" 
                style={{ borderRadius: '50%', width: '28px', height: '28px', border: '1px solid #F3F3F3', objectFit: "cover" }}
                />
            </div>
            
            <img 
            className="mt-2 ml-1"
            src='/icons/dropdown-icon.svg' 
            alt="drop-down" 
            style={{ width: '13px', height: '13px'}}
            />
            </div>
            :
            <img src="/icons/user-icon.svg" alt="" />
            }
        </a>
    )
}