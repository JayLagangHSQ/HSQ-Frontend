import '../CSS/ProfileSkeleton.css'

export default function ProfileSkeleton({classNames, borderRadius, height, width}){
    return(
        <>
            <div className={`profile-skeleton-background ${classNames}`} style={{position:'absolute', borderRadius: borderRadius, width: width, height: height, border: '2px solid #516473'}}></div>
            <div className={`profile-skeleton ${classNames}`} style={{position:'absolute', borderRadius: borderRadius, width: width, height: height, border: '2px solid #516473'}}></div>
        </>
    )
}