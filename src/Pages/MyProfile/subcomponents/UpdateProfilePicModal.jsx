import { Modal, Button } from "react-bootstrap";

export default function UpdateProfilePicModal({noPictureAdded,showModal, closeUpdatePictureModal, handleImageChange, handleUpload}){

    return(
        <>
        {/* Modal */}
        <Modal show={showModal} onHide={closeUpdatePictureModal}>
            <Modal.Header closeButton>
            <Modal.Title>Update Profile Picture</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={closeUpdatePictureModal}>
            Close
            </Button>
            <Button disabled={noPictureAdded} style={{backgroundColor:"#016B83"}} onClick={handleUpload}>
            Upload
            </Button>
            </Modal.Footer>
            </Modal>
        </>
    )
}