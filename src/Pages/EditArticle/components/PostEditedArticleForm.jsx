import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import { Button } from "react-bootstrap";
import uploadUpdateEditArticle from "../../../Util/uploadUpdateEditArticle";
import NotificationContext from "../../../Contexts/notificationContext";

export default function PostEditedArticleForm({originalArticle,content,user, isPlaceholderVisible, refresh, isModalOpen, handleCloseModal}){
    const {updatePosted, setUpdatePosted} = useContext(NotificationContext)
    const { articleId } = useParams();
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [department, setDepartment] = useState('');
    const [beneficiary, setBenificiary] = useState([]);
    const [images, setImages] = useState([]);
    const fontstyle = {
        fontSize: '12.8px',
        borderRadius:'5px',
        borderColor:'#383C3F'
    };

    useEffect(()=>{
        if(originalArticle!== null){
            setTitle(originalArticle.title);
            setDepartment(originalArticle.department);
            setBenificiary(originalArticle.beneficiary);
        }
    },[originalArticle])

    const handleDepartmentChange = (selectedDepartment) => {
        setDepartment(selectedDepartment);
    };

    const beneficiariesOptions = ['everyone', 'managers', 'newHires', 'executives'];

    const handleBeneficiaryChange = (selectedBeneficiaries) => {
    setBenificiary(selectedBeneficiaries);
    };
    
    const buttonStyle = {
        fontSize: '12.8px',
        backgroundColor:'#016B83'
    }

    const handlePost = async(event) => {
        event.preventDefault();
        setLoading(true);
        if (title === '' || title.length < 4) {
            setLoading(false);
            Swal.fire({
                title: 'Something went wrong :(',
                text: 'Title is empty or is too short.',
                customClass: {
                    confirmButton: 'swal-red-button',
                },
            });

        } else {
            const formData = new FormData();
            formData.append('department', department);
            formData.append('beneficiary', JSON.stringify(beneficiary));
            formData.append('title', title);
            formData.append('content', content);
            formData.append('latestUpdate', new Date().toISOString());
            formData.append('updatedBy', user.id);
            await fetch(`${import.meta.env.VITE_APP_API_URL}/api/articles/article/edit/${articleId}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: formData,
            }).then(async(data) => {
                if (data.status === 200) {
                    let userId = user.id;
                    uploadUpdateEditArticle(department, title,userId,setUpdatePosted, articleId)
                    setLoading(false);
                    handleCloseModal();
                    Swal.fire({
                        title: 'Article Updated!',
                        customClass: {
                            title: 'custom-swal-title',
                            confirmButton: 'custom-swal-confirm-button',
                        }
                    }).then(() => {
                        // Redirect to /article/${articleId}
                        window.location.href = `/article/${articleId}`;
                    });
                } else {
                    handleCloseModal();
                    Swal.fire({
                        title: 'Something went wrong. :(',
                        text: 'Please try again',
                    });
                    setLoading(false);
                }
            });
        }
    };
    return(
        <>
        {
        originalArticle === null ? <span>loading</span>:
        <div className={isModalOpen ? 'd-flex justify-content-center container-fluid' : 'd-none'} style={{zIndex:'99999', position:'absolute',backgroundColor: 'rgba(1, 107, 131, 0.5)', width:'98.5vw',height:'330%', top:'0'}}>

            <div className={`mt-5 form-container ${isModalOpen ? 'form-container-enter' : 'd-none'}`}  style={{backgroundColor:'rgba(243, 243, 243, 0.95)', borderRadius:'10px', maxHeight:'600px'}}>
                    <form onSubmit={handlePost}>
                        
                        
                        <div>
                            <div className="d-flex justify-content-end">
                            <Button 
                            variant="secondary" 
                            style={{fontSize: '12.8px', borderEndEndRadius:'0px', borderTopLeftRadius:'0px', backgroundColor:'#FFD082', borderStyle:'none'}}
                            disabled={loading}
                            onClick={handleCloseModal}>
                                Close
                            </Button>
                            </div>
                            <div className='p-5 text-center'>
                                <h6 className='mb-0'><u>Ready to update your article?</u></h6>
                                <span className='text-muted smallest'><i>Kindly fill the necessary information below...</i></span>
                            </div>
                            
                            <div className="d-flex flex-column mt-0" style={{ padding: '5px', margin: '2rem' }}>
                                <label style={fontstyle} htmlFor="title" className='form-label'><b>Please confirm the title of this article you created... <span className="small" style={{color:'red'}}>*</span></b></label>
                                <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => { setTitle(e.target.value) }}
                                placeholder='Type the title here...'
                                style={{fontSize:'12.8px', width:'400px', borderRadius:'5px'}}
                                className='p-2 form-control'
                                />
                            </div>
                            
                            <div className="d-flex flex-column mt-0" style={{ padding: '5px', margin: '2rem' }}>
                                <label htmlFor="department" style={fontstyle} className="form-label">
                                <b>To which department is this article relevant? <span className="small" style={{color:'red'}}>*</span></b>
                                </label>
                                <select className="form-control" style={fontstyle} id="department" onChange={(e) => handleDepartmentChange(e.target.value)} value={department}>
                                    <option value="company-wide">Company-wide</option>
                                    <option value="executive">Executive</option>
                                    <option value="legal&finance">Legal & Finance</option>
                                    <option value="it">IT</option>
                                    <option value="hr">HR</option>
                                    <option value="operations">Operations</option>
                                    <option value="marketing">Marketing</option>
                                    <option value="shows&touring">Shows & Touring</option>
                                    <option value="artistdevelopment">Artist Development</option>
                                </select>
                            </div>

                            {/* INSERT BENEFICIARY SELECTIONS HERE */}
                            <div className="d-flex flex-column mt-0" style={{ padding: '5px', margin: '2rem' }}>
                            <label style={fontstyle}><b>To whom is this article intended for? <span className="small" style={{color:'red'}}>*</span></b></label>
                            {beneficiariesOptions.map((option) => (
                                <div key={option} className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id={option}
                                    checked={beneficiary.includes(option)}
                                    onChange={() => {
                                    const updatedBeneficiaries = beneficiary.includes(option)
                                        ? beneficiary.filter((item) => item !== option)
                                        : [...beneficiary, option];
                                    handleBeneficiaryChange(updatedBeneficiaries);
                                    }}
                                />
                                <label  style={fontstyle} className="form-check-label" htmlFor={option}>
                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                </label>
                                </div>
                            ))}
                            </div>
                            
                            <div className='mt-0' style={{ padding: '5px', margin: '2rem' }}>
                            <Button 
                                className="mr-1"
                                variant="secondary" 
                                style={{fontSize: '12.8px', width:"60px"}}
                                disabled={loading}
                                onClick={handleCloseModal}>
                                Cancel
                            </Button>
                            <Button
                                style={buttonStyle}
                                type="submit"
                                disabled={loading || isPlaceholderVisible || title==='' || beneficiary.length === 0} // Disable the button when loading is true
                            >
                                {loading ? 'Posting...' : 'Post Update'}
                            </Button>
                            </div>
                        </div>
                        
                    </form>
            </div>
        </div>
        }
        </>
    )
}