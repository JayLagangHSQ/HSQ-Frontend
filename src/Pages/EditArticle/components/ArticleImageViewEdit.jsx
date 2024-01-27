import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import Swal from 'sweetalert2';
import AddImageInterface from "./AddImageInterface";

export default function ArticleImageViewEdit({ refresh, originalArticle,setOriginalArticle }) {
    const { articleId } = useParams();
    const [fullscreenIndex, setFullscreenIndex] = useState(null);
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([])

    const handleImageClick = (index) => {
        setFullscreenIndex(index === fullscreenIndex ? null : index);
    };

    const handleCloseFullscreen = () => {
        setFullscreenIndex(null);
    };
    useEffect(()=>{
        if(originalArticle !== null){
            setImages(originalArticle.imageUrl)
        }
    },[originalArticle])

    useEffect(() => {

        const handleKeyDown = (event) => {
            if (fullscreenIndex !== null) {
                switch (event.key) {
                    case 'ArrowLeft':
                        setFullscreenIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
                        break;
                    case 'ArrowRight':
                        setFullscreenIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
                        break;
                    default:
                        break;
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [fullscreenIndex, images.length]);

    const fetchImageData = () =>{
        fetch(`${import.meta.env.VITE_APP_API_URL}/api/articles/article/${articleId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
            .then((res) => res.json())
            .then((data) => {
            setImages(data.imageUrl);
        });
    }
    const handleDeleteImage = async () => {
        setLoading(true);

        let imageKey = originalArticle.imageKeys[fullscreenIndex].key;

        // Display a confirmation popup using SweetAlert
        const isConfirmed = await Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to delete the image. This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });
    
        // If the user confirms, proceed with the fetch request
        if (isConfirmed.isConfirmed) {
            try {
                const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/articles/article/edit/deleteImage/${articleId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        key: imageKey
                    })
                });
    
                if (response.status === 200) {
                    setLoading(false);
                    Swal.fire({
                        title: 'Image Deleted!',
                        customClass: {
                            title: 'custom-swal-title',
                            confirmButton: 'custom-swal-confirm-button',
                        },
                        didClose: () => {
                            fetchImageData();
                            handleCloseFullscreen();
                        },
                    });
                } else {
                    Swal.fire({
                        title: 'Something went wrong. :(',
                        text: 'Please try again',
                    });
                    
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error:', error);
                Swal.fire({
                    title: 'Something went wrong. :(',
                    text: 'Please try again',
                });
            }
        }
    };
    
    
    const buttonStyle = {
        fontSize: '12.8px',
        backgroundColor:'#F22F41'
    }
    return (
        <>
        {
        originalArticle === null ? <span>loading</span>:
            <div className="d-flex flex-column justify-content-start align-items-center pt-3 pb-5 overflow-auto" style={{maxWidth:'70px', minWidth:'70px',  height: '300px', position: 'sticky', bottom: '10%', left: '1%', borderColor:'#516473', borderStyle:'solid', borderRadius: '8px', backgroundColor: '', borderWidth:'1px', boxShadow: '0 0 1px rgba(0, 0, 0, 0.3)' }}>
                {/* <span className="text-center text-muted small"><i>Attached Images</i></span> */}
                
                {/* <hr /> */}

                <div className="mb-3">
                    <AddImageInterface setImages={setImages} fetchImageData={fetchImageData}/>
                </div>

                {images.length === 0 ?
                    <div className="d-flex justify-content-center align-items-center p-3 text-muted text-center" style={{ height: '200px' }}>
                        <span><u>No Attached Images</u></span>
                    </div>
                    :
                    <>
                        {images.map((image, index) => (
                            <div className="text-center mb-2" key={index} style={{ height: "30px", width: "30px", cursor: "pointer", backgroundColor: '#FFFFFF', borderRadius: '5px', borderColor: '#516473', border: '1px', borderStyle: 'solid' }} onClick={() => handleImageClick(index)}>
                                <img
                                    src={image}
                                    alt={`Image ${index + 1}`}
                                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                    className="mx-auto my-auto"
                                />
                            </div>
                        ))}
                    </>
                }
                
                
            </div>
        }
            {fullscreenIndex !== null && (
                <div className="fullscreen-overlay d-flex flex-column mt-3">
                    <div className="d-flex justify-content-end">
                        <span className="close-button" onClick={handleCloseFullscreen}>&times;</span>
                    </div>

                    <img
                        src={images[fullscreenIndex]}
                        alt={`Image ${fullscreenIndex + 1}`}
                        style={{ maxHeight: "70vh", maxWidth: "70vw", objectFit: "contain" }}
                        
                    />
                    <div>
                        <Button 
                        style={buttonStyle}
                        onClick={handleDeleteImage}
                        disabled={loading}
                        >
                            Delete image
                        </Button>
                    </div>
                </div>
            )}
        
        </>
    );
}
