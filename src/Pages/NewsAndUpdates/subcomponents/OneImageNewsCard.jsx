import NewsCardImageView from "./NewsCardImageView";
import { useState } from "react";

export default function OneImageNewsCard({data}){
const [fullscreenIndex, setFullscreenIndex] = useState(null);
const handleImageClick = (index) => {
    setFullscreenIndex(index === fullscreenIndex ? null : index);
};
    return(
        <>
        <NewsCardImageView images={data.imageUrl} fullscreenIndex={fullscreenIndex} setFullscreenIndex={setFullscreenIndex}/>

        {data.imageUrl.map((image, index) => (
            <img
                onClick={() => handleImageClick(index)}
                src={image}
                alt={`Image ${index + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius:'8px', cursor:'pointer' }}
                className="img-thumbnail"
            />
        ))}
        </>
    )
}