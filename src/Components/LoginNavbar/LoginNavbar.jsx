import { Container, Row, Col } from 'react-bootstrap';
import Logo from '../Subcomponents/Logo';

const LoginNavbar = () => {
    return (
        <nav className="navbarContainer" >
            <Container className='navbar-min-height'>
                <Row className='align-items-center navbar-min-height'>
                    {/* Column Below is for logo */}
                    <Col md='12' className='d-flex justify-content-center'> 
                        <Logo />
                    </Col>
                </Row>
            </Container>
        </nav>
    );
};

export default LoginNavbar;
