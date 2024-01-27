import { Container, Row, Col } from "react-bootstrap"
import {useState, useEffect, useContext} from "react";
import UserContext from '../../Contexts/userContext';
import NotificationContext from '../../Contexts/notificationContext';
import NewsCard from "./components/NewsCard"
import PostNewsAndUpdateModal from "./subcomponents/PostNewsAndUpdateModal";
export default function NewsAndUpdates(){

    const [selectedImage, setSelectedImage] = useState([]);
    const {updatePosted, setUpdatePosted} = useContext(NotificationContext)
    const { user } = useContext(UserContext);
    const [usersDepartment, setUsersDepartment] = useState(user.department? user.department.toLowerCase() : null)
    const [loading, setLoading] = useState(true);
    const [mainData, setMainData] = useState(null)
    const [showModal, setShowModal] = useState(false);

    
    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedImage([])
    };
    useEffect(() => {
        fetchData();   
    }, []);

    const fetchData = () => {
        setLoading(true);
        fetch(`${import.meta.env.VITE_APP_API_URL}/api/newsAndUpdates`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setMainData(data);
            setLoading(false);
        });
    };
    return(
        <>
        <div className="pt-3">
            <div className="row">
                <div className="mb-0 col-7">
                    <h4 className="text-muted">News & Updates</h4>
                </div>
                <div className="mb-0 col-3 d-flex justify-content-end align-items-center ml-auto mr-3">

                    <PostNewsAndUpdateModal setUpdatePosted={setUpdatePosted} setSelectedImage={setSelectedImage} selectedImage={selectedImage} user={user} showModal={showModal} openModal={openModal} closeModal={closeModal} fetchData={fetchData} setLoading={setLoading} loading={loading}/>

                </div>
            </div>
            <hr />
            <Container >
                <Row >
                {mainData !== null ? 
                    mainData.length > 0 ? 
                    <>
                        {
                            mainData.map(data => (
                                (data.department === usersDepartment || data.department === "company-wide" || data.author._id === user.id) &&
                                <NewsCard
                                    key={data._id}
                                    data={data}
                                    user={user}
                                    fetchData={fetchData}
                                />
                            ))
                        }
                    </>
                    :
                    <h3 className="muted">0 Users found</h3>
                
                :
                <><h2 className="muted">fetching data...</h2></>}
                </Row>
            </Container>
        </div>
        </>
    )
}