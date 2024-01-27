
import { useState, useEffect } from "react"
import NavNotificationPopCard from './NavNotificationPopCard';

export default function NavNotificationPop({notification, setNotifIsOpen}){
    
    const [timeDiff, setTimeDiff] = useState(null);
    const [unread, setUnread] = useState(null)

    useEffect(()=>{
        if(notification !== null){
            setUnread(notification.unread.sort((a, b) => new Date(b.originalPostDate) - new Date(a.originalPostDate)))
        }
        
    },[notification])
    
    return(
        <>
            <div className="d-flex flex-column overflow-auto justify-content-center align-items-center p-3" style={{border:`solid`,borderWidth:`1px`,borderRadius:`8px`,minHeighteight:`129px`, width:`300px`, zIndex: '1', position: 'fixed', transform: 'translate(-10%, 63%)', backgroundColor:'#F3F3F3'}}>
            
            <div className="m-1 pb-4" style={{maxHeight:'300px', width:'90%'}}>
            <h6 className="muted">Notifications</h6>
            <hr />
            {unread !== null ? 
                unread.length > 0 ? 
                <>
                    {
                        notification.unread.map(data => (
                            <NavNotificationPopCard
                                key={data._id}
                                unread={data}
                                setNotifIsOpen={setNotifIsOpen}
                            />
                        ))
                    }
                </>
                :
                <span className="muted">You're all caught-up!</span>
            :
            <><span className="muted">Problem with retrieving data.</span></>}
             <hr />
            </div>
            </div>
        </>
    )
}