import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {

    return (
        <nav className="navbarContainer mt-5" >
            <Container className='navbar-min-height'>
                <Row className='align-items-center navbar-min-height'>

                    <Col className='d-flex justify-content-center align-items-center'> 
                        <span style={{color:'#F3F3F3'}}>© 2023 HollywoodSQ. All rights reserved.</span>
                    </Col>
                </Row>
            </Container>
        </nav>
    );
};

export default Footer;
