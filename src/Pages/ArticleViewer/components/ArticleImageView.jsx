import { useEffect, useState } from "react";

export default function ArticleImageView({ images }) {
    const [fullscreenIndex, setFullscreenIndex] = useState(null);

    const handleImageClick = (index) => {
        setFullscreenIndex(index === fullscreenIndex ? null : index);
    };

    const handleCloseFullscreen = () => {
        setFullscreenIndex(null);
    };

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

    return (
        <>
            <div className="d-flex flex-column justify-content-start align-items-center pt-5 pb-5 overflow-auto" style={{maxWidth:'70px', minWidth:'70px',  height: '300px', position: 'relative', bottom: '65%', left: '90%', borderColor:'#516473', borderStyle:'solid', borderRadius: '8px', backgroundColor: '', borderWidth:'1px', boxShadow: '0 0 1px rgba(0, 0, 0, 0.3)' }}>
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

            {fullscreenIndex !== null && (
                <div className="fullscreen-overlay d-flex flex-column">
                    <div className="d-flex justify-content-end">
                        <span className="close-button" onClick={handleCloseFullscreen}>&times;</span>
                    </div>

                    <img
                        src={images[fullscreenIndex]}
                        alt={`Image ${fullscreenIndex + 1}`}
                        style={{ maxHeight: "70vh", maxWidth: "70vw", objectFit: "contain" }}
                    />
                </div>
            )}
        </>
    );
}
