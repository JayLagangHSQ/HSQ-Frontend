import { Container, Row, Col } from "react-bootstrap"
import {BrowserRouter as Router, Routes, Route,Link } from 'react-router-dom';
import Profile from "./components/Profile"
import UpdatePassword from "./components/UpdatePassword"

export default function  MyProfile (){
    const linkStyle = {
        fontSize: "12.8px",
        color: "#016B83",
        textDecoration:'underline'
    }
    return(
        <>
        <div className="p-3 mt-3" style={{borderStyle:'solid', borderColor:'#516473', borderRadius:'8px', borderWidth:'1px'}}>
            <div className="row">
                <div className="mb-0 col-5">
                    <h4 className="text-muted">My Profile</h4>
                </div>
            </div>
            <hr />
            
            <Container>
            <Link to={'/my-profile/detail'} style={linkStyle} className="mr-3"> My Profile </Link>
            <Link to={'/my-profile/update-password'} style={linkStyle}>Update Password</Link>
                <Row className="mt-5">
                    <Col className="d-flex flex-column justify-content-center">
                    <Routes>
                        <Route path="/detail" element={<Profile/>} />
                        <Route path='/update-password' element={<UpdatePassword/>} />

                    </Routes> 
                    </Col> 
                </Row>
            </Container>
        </div>
        </>
    )
}