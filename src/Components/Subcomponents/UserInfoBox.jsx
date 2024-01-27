import { Container } from "react-bootstrap"


export default function UserInfoBox  (user)  {
    const {firstName, lastName, jobTitle} = user.user
    return (
        <Container fluid>
            <div className="row align-items-center mt-2" style={{height:`68px`, borderRadius:'8px',borderColor:'#575757', border:"solid", borderWidth:"1px"}}>
                    {user.user.profilePicture !== "false" ? 
                    <div className="col-3 m-0 p-0 d-flex justify-content-end align-items-center">
                    <img 
                    src={user.user.profilePicture}
                    className="m-0 p-0" 
                    alt="profile-picture" 
                    style={{ borderRadius: '50%', width: '48px', height: '48px', borderColor:'#575757', border:"solid", borderWidth:"1px", objectFit: "cover" }}
                    />
                    </div>
                    :
                    <div className="col-3">
                        <img src="/icons/sidebar-user-icon.svg" alt="sidebar-user-icon.svg" />
                    </div>
                    }
                    <div className="col-8 pr-0 justify-content-start align-items-center">
                    <span className="text-muted small">{firstName} {lastName}</span>
                    <br />
                    <span className="text-muted small">{jobTitle}</span>
                    </div>
            </div>
        </Container>
    );

  };
  
