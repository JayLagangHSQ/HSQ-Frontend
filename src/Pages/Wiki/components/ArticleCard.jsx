import { Container, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom'; 

export default function ArticleCard({article, user}){

    return(
        <Container className="mb-1 mt-1 pr-5 pl-5 pt-2 pb-2">
            <Row className="d-flex align-items-center">
                <Col md='9'className="d-flex justify-content-center">
                    <span className="mb-0 user-select-none text-center" style={{ color:'#516473'}}><b><i>{article.title}</i></b></span>
                </Col>
                <Col md='2' className="ml-auto">
                    <div className="mr-1 d-flex justify-content-end">
                        <a href={`/article/${article._id}`} target="_blank" rel="noopener noreferrer" className="anchor-underline"><i>View</i></a>
                    </div>
                    {user.isManager? 
                    <div className="mr-1 d-flex justify-content-end">
                        {/* <a href={`/article/edit/${article._id}`} target="_blank" rel="noopener noreferrer" className="anchor-underline"><i>Edit</i></a> */}
                        <Link to={`/article/edit/${article._id}`}><span className="anchor-underline">Edit</span></Link>
                    </div>
                    : 
                    <></>}
                </Col>
            </Row>
            <hr />
        </Container>
 
    )
}