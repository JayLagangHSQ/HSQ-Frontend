import { Col } from "react-bootstrap"
export default function HomeCard({data, user, fetchData}){
    return(
        <>
        <Col md={12} className="mr-5 mb-3">
        <div className="border p-3 row" style={{backgroundColor: 'rgba(81, 100, 115, 0.3)', borderRadius:"8px", width:'100%', height:'200px'}}> 
        <div className="general-center">
            <h6 className="text-muted">Non-Urgent updates are posted here (for example: Holiday Announcements, Company Engagement Activity Announcements, etc.)</h6>
        </div>
            
        </div>
        </Col>
        </>
    )
}