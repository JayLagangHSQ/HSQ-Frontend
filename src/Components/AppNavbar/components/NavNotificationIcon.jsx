import { useState, useEffect } from "react"

export default function NavNotificationIcon({setIsOpen, notification, notifIsOpen, setNotifIsOpen}){

    const [unreadNotifications, setUnreadNotifications] = useState(0)
    //this is to make sure close usericon pop
    const handleClick = () => {
        setIsOpen(false)
        if(!notifIsOpen){
            setNotifIsOpen(true)
        } else if(notifIsOpen){
            setNotifIsOpen(false)
        }
    }

    useEffect(()=>{
        if(notification !== null){
            setUnreadNotifications(notification.unread.length)
        }
    },[notification])

    return(
        <>
        <a style={{cursor:'pointer'}} onClick={handleClick}>
            <img src="/icons/notification-bell.svg" alt="" />
            <div className="d-flex justify-content-center align-items-center" style={{backgroundColor:'#F22F41',borderRadius: '50%', width: '18px', height: '18px', position: 'fixed', transform: 'translate(40%, -160%)'}}>
                <span className="small white">{unreadNotifications}</span>
            </div>
            
        </a>
        </>
    )
}