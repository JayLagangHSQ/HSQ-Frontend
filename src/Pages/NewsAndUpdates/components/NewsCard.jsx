import { useState, useEffect } from "react";
import { Col } from "react-bootstrap"
import ProfileSkeleton from "../../../Components/ProfileSkeleton";
import OneImageNewsCard from "../subcomponents/OneImageNewsCard";
import TwoImageNewsCard from "../subcomponents/TwoImageNewsCard";
import ThreeImageNewsCard from "../subcomponents/ThreeImageNewsCard";
import EditNewsAndUpdateModal from "../subcomponents/EditNewsAndUpdateModal";
export default function NewsCard ({data, user, fetchData}){
    const [timeDiff, setTimeDiff] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageCount, setImageCount] = useState(null);
    const [openEdit, setOpenEdit] = useState(false)
    const handleImageLoad = () => {
        setLoading(false);
      };
      
      useEffect(() => {
        if(data.imageUrl !== null){
            setImageCount(data.imageUrl.length)
        }
        const originalPostDate = new Date(data.originalPostDate);
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
      
      const openModal = () =>{
        setOpenEdit(true)
      }

    return(
        <Col md={12} className="mb-3 p-3" style={{backgroundColor: 'rgba(81, 100, 115, 0.3)', borderRadius:'5px'}}>
            <div className="d-flex flex-column ml-auto mr-auto pt-4 pb-4" style={{width:'85%'}}>
                {/* uploader img and basic details */}
                {data.author.profilePictureUrl !== null ? 
                <div className="d-flex justify-content-start mb-2">
                    
                    <img 
                        src={data.author.profilePictureUrl}
                        onLoad={handleImageLoad} 
                        alt="profile-picture" 
                        style={{ borderRadius: '50%', width: '50px', height: '50px', objectFit: "cover" }}
                    />
                    <div className="d-flex flex-column justify-content-center ml-2">
                        <span className="small font-weight-bold">{data.author.firstName} {data.author.lastName}</span>
                        <span className="small">{data.author.department.toLocaleUpperCase()} - {data.author.jobTitle}</span>
                        <span className="smallest">{timeDiff}</span>
                    </div>
                    
                    {loading? 
                    <ProfileSkeleton borderRadius={'50%'} height={'50px'} width={'50px'}/>
                    :<></>
                    }
                    {user.id == data.author._id?
                    <EditNewsAndUpdateModal data={data} user={user} fetchData={fetchData} openEdit={openEdit} setOpenEdit={setOpenEdit} openModal={openModal} setLoading={setLoading}/>
                    :
                    null
                    }
                </div>
                :
                <div className="d-flex justify-content-start mb-2">
                    <img 
                        src='/icons/sidebar-user-icon.svg' 
                        alt="profile-picture" 
                        style={{ borderRadius: '50%', width: '50px', height: '50px' }}
                    />
                    <div className="d-flex flex-column justify-content-center ml-2">
                        <span className="small font-weight-bold">{data.author.firstName} {data.author.lastName}</span>
                        <span className="small">{data.author.department.toLocaleUpperCase()} - {data.author.jobTitle}</span>
                        <span className="smallest">{timeDiff}</span>
                    </div>
                    {user.id == data.author._id?
                    <EditNewsAndUpdateModal data={data} user={user} fetchData={fetchData} openEdit={openEdit} setOpenEdit={setOpenEdit} openModal={openModal} setLoading={setLoading}/>
                    :
                    null
                    }
                </div>
                }
                {/* main post content */}
                <div className="mb-2">
                    <p className="text-left font-weight-bold mb-0">{data.title}</p>
                    <span>{data.message}</span>
                </div>
                {/* images */}

                {data.imageUrl !== null && (
                <div className="d-flex" style={{ height: '250px', border: '1px solid #383C3F', borderRadius: '8px' }}>
                    {imageCount === 1 ? (
                    <OneImageNewsCard data={data}/>
                    ) : imageCount === 2 ? (
                    <TwoImageNewsCard data={data}/>
                    ) : (
                    <ThreeImageNewsCard data={data} imageCount={imageCount} />
                    )}
                </div>
                )}
            </div>
            
            
        </Col>
    )
}