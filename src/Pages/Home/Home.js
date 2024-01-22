import { Container, Row, Col } from "react-bootstrap"
import MakeAPost from "./components/MakeAPost"
import { useState, useContext } from "react"
import UserContext from '../../Contexts/userContext';
import HomeCard from "./components/HomeCard";
export default function Home(){

    const { user } = useContext(UserContext);
    const [isShowModal, setIsShowModal] = useState(false)

    return(
        <>
        <div className="pt-3">
            <div className="row">
                <div className="mb-0 col-5">
                    <h4 className="text-muted">Home</h4>
                </div>
            </div>
            <hr />
            <Container className="p-0">
                <div>
                    <div className="mb-3">
                        <MakeAPost user={user}/>
                    </div>
                </div>
                <div>
                    <HomeCard />
                    <HomeCard />
                    <HomeCard />
                    <HomeCard />
                    <HomeCard />
                    <HomeCard />
                    <HomeCard />
                    <HomeCard />
                </div>
            </Container>
        </div>
        </>
    )
}