import { Col } from "react-bootstrap"
import { useState } from "react";
import "../../../CSS/LinkCard.css"
export default function LinkCard ({ siteName, link, icon }) {
    
    const [isHovered, setIsHovered] = useState(false);
    
    return(
        <>
        <Col md={5} className="border p-1 ml-auto mr-auto d-flex justify-content-center align-items-center mt-2" style={{width:'100%', height:'100%',borderRadius:'5px'}} onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>

            <a href={link} target="_blank" rel="noopener noreferrer" className="text-decoration-none mb-0">
                <img src={icon} alt={siteName} style={{ height:'20px', width: '20px', objectFit: 'contain'}}/>
                <div className={`site-name-overlay ${isHovered ? 'visible' : 'hidden'}`}>
                <span className="very-small text-center">{siteName}</span>
                </div>
            </a>

        </Col>
        </> 
    )
}