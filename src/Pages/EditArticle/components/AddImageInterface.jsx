import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Modal, Form } from "react-bootstrap";
import Swal from 'sweetalert2';

export default function AddImageInterface({ fetchImageData, setImages }) {
    const { articleId } = useParams();
    const [newImages, setNewImages] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const openAddImageInterface = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleImageInputChange = (e) => {
        // Handle image input change and set selected images to newImages state
        const selectedImages = e.target.files;
        setNewImages(selectedImages);
    };
    const handleUpload = async() => {
        // Handle the addition of new images
        setLoading(true);
        if (newImages.length > 0) {
            const formData = new FormData();
            for (let i = 0; i < newImages.length; i++) {
                formData.append('images', newImages[i]);
              }
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/articles/article/edit/addImage/${articleId}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: formData,
            });

            if (response.status === 200) {
                setLoading(false);
                Swal.fire({
                    title: 'Image(s) Uploaded!',
                    text: 'Please refresh your browser to see the uploaded images',
                    customClass: {
                        title: 'custom-swal-title',
                        confirmButton: 'custom-swal-confirm-button',
                    },
                    didClose: () => {
                        handleCloseModal()
                        // fetchImageData()
                    },
                });
            } else {
                Swal.fire({
                    title: 'Something went wrong. :(',
                    text: 'Please try again',
                });
                
                setLoading(false);
            }
        }

        // Close the modal after adding images
        setShowModal(false);
    };
    return (
        <>
            <div className="d-flex justify-content-center align-items-center" style={{cursor:'pointer', backgroundColor:'#516473', borderRadius:'5px'}}>
                <span onClick={openAddImageInterface} className="white pt-1 pb-1 pl-2 pr-2 m-0">+</span>
            </div>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header >
                    <Modal.Title className="text-center">Add Images</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="imageInput">
                            <Form.Label>Choose Images</Form.Label>
                            <Form.Control
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageInputChange}
                            />
                        </Form.Group>
                    </Form>

                    {newImages && (
                        <div>
                            <p>Selected Images:</p>
                            <ul>
                                {Array.from(newImages).map((image, index) => (
                                    <li key={index}>{image.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal} disabled={loading}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpload} disabled={loading || newImages.length === 0}>
                        {loading ? 'Uploading...' : 'Upload'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
