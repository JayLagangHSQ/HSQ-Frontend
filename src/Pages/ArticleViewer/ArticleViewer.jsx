import { useEffect, useState,useContext } from "react";
import { useParams, Link } from "react-router-dom";
import UserContext from '../../Contexts/userContext';
import { Row, Col, Container } from "react-bootstrap";
import ArticleImageView from "./components/ArticleImageView";

export default function ArticleViewer() {

  const [article, setArticle] = useState(null);
  const { articleId } = useParams();
  const { user } = useContext(UserContext);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_API_URL}/api/articles/article/${articleId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setArticle(data);
        
      });
  }, [articleId]);

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric',
      timeZone: 'UTC' ,
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    
    <>

    { article === null?  <div style={{backgroundColor:'#F3F3F3', minHeight:'100vh'}}></div>:
      
      <>
      <Container>
      {user.isManager? 
        <div className="mr-1 d-flex justify-content-end mt-1">
            {/* <a href={`/article/edit/${article._id}`} target="_blank" rel="noopener noreferrer" className="anchor-underline"><i>Edit</i></a> */}
            <Link to={`/article/edit/${articleId}`}><span className="anchor-underline"><span className="small"><i>Edit Article</i></span></span></Link>
        </div>
        : 
        <></>}
      <Row className="p-4 background-style mt-2">
      
        {/* this is for the title */}
        <Col md='8' className="d-flex justify-content-start align-items-center">
          <h6 style={{color:'#516473'}}><b><i>{article.title}</i></b></h6>
        </Col>
        <Col md='3' className="d-flex flex-column align-items-end mt-auto mb-auto ml-auto">
          <span style={{color:'#516473'}} className="smallest"><i>{formatDate(article?.originalPostDate)} - Original post</i></span>
          <span style={{color:'#516473'}} className="smallest"><i>{formatDate(article?.latestUpdate)} - Latest update</i></span>
          <span style={{color:'#516473'}} className="smallest"><i>{'('}Posted by: {article.author[0].firstName} {article.author[0].lastName} {')'}</i></span>
          <span style={{color:'#516473'}} className="smallest"><i>{'('}Update by: {article.updatedBy.firstName} {article.updatedBy.lastName} {')'}</i></span>
          
        </Col>
        
      </Row>
      
      <div
        className="mt-4 container-fluid ml-auto mr-auto content-background-style"
        style={{ border: '1px solid #ccc', margin: '2rem', width: '800px', borderRadius:'3px' }}
      >

        <div
          style={{
            minHeight: '800px',
            padding: '2rem',
            margin: '2rem',
            outline: 'none'
          }}
          dangerouslySetInnerHTML={{ __html: article ? article.content : '' }}
        />
      </div>
      
      <ArticleImageView images={article.imageUrl}/>

      </Container>
      </>
      }
    </>
  );
}
