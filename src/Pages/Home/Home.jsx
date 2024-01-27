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
            <Container>
                <Row>
                    <Col md={12} className="mr-5 mb-3">
                        <MakeAPost user={user}/>
                    </Col>
                </Row>
                <Row >
                    <HomeCard />
                    <HomeCard />
                    <HomeCard />
                    <HomeCard />
                    <HomeCard />
                    <HomeCard />
                    <HomeCard />
                    <HomeCard />
                </Row>
            </Container>
        </div>
        </>
    )
}