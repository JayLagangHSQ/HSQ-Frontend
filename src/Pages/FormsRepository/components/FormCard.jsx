import EditForm from "./EditForm";

export default function FormCard({ name, description, link, formId, refreshEffect, user, department}){
    return(
        <div className="mb-0 mt-3 pr-5 pl-5 pt-2 pb-2">
            <div className="d-flex align-items-center">
                <div className="d-flex flex-wrap flex-column" style={{maxWidth:'328px'}}>
                    <p className="mb-0" style={{fontWeight:'bold', color:'#383C3F'}}>{name}</p>
                    <p className="mb-0 text-muted small"><i>{description}</i></p>
                </div>
                
                <div className="ml-auto">
                    <div className="mr-1">
                        <a href={link} target="_blank" rel="noopener noreferrer" className="small" style={{textDecoration:'underline', color:'#016B83'}}>Download Form</a>
                    </div>
                    {user.isManager? 
                    <div>
                        <EditForm props={ {name,department, description, link, formId, refreshEffect}}/>
                    </div>
                    
                    : 
                    <></>}
                </div>
            </div>
            <hr className="mb-0 mt-3"/>
        </div>
        
 
    )
}