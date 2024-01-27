import { useEffect, useState } from "react";

export default function NewsCardImageView({ images, fullscreenIndex, setFullscreenIndex}) {


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
