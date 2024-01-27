import { Link } from 'react-router-dom';
import { linkStyle } from '../../../Util/styling';
import { useState, useEffect, useContext } from "react";
import NotificationContext from '../../../Contexts/notificationContext';
export default function NavNotificationPopCard({unread}){
    const {setAcknowledgeClicked, acknowledgeClick} = useContext(NotificationContext)
    const [timeDiff, setTimeDiff] = useState(null);

    useEffect(() => {

        const originalPostDate = new Date(unread.originalPostDate);
        const currentTime = new Date();
    
        const timeDifference = currentTime - originalPostDate;
    
        // Calculate minutes, hours, or days
        const minutes = Math.floor(timeDifference / (1000 * 60));
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    
        let displayTimeDiff;
        if (minutes === 0){
            displayTimeDiff = `Just now`;
        }else if (minutes < 60) {
          displayTimeDiff = `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
        } else if (hours < 24) {
          displayTimeDiff = `${hours} hour${hours === 1 ? '' : 's'} ago`;
        } else {
          displayTimeDiff = `${days} day${days === 1 ? '' : 's'} ago`;
        }
    
        setTimeDiff(displayTimeDiff);
      },[]);
    const handleAcknowledge = ()=>{
      const newsId = unread._id;

      fetch(`${import.meta.env.VITE_APP_API_URL}/api/users/user/acknowledgeUpdate`,{
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          newsAndUpdateId:newsId
        })
      })
      .then((res) =>{

        if(acknowledgeClick){
          setAcknowledgeClicked(false);
        } else {
          setAcknowledgeClicked(true);
        }
        
      })
    }
    return(
        <>
        
        <Link to={'/news-and-updates'} onClick={handleAcknowledge}> 
            <div className="p-2 border mb-1" style={{borderRadius:'5px'}}>
                <span className="small" style={{color:'#383C3F'}}><b>{unread.author.firstName} {unread.author.lastName}</b> posted an update</span>
                <span className='small d-block' style={{color:'#383C3F'}}>{timeDiff}</span>
            </div>
        </Link>
        </>
    )
}