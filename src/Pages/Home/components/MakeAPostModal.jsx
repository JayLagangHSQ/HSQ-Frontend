import { useEffect, useState } from "react";
import { Modal, Button, Dropdown, Form } from "react-bootstrap";
import Swal from "sweetalert2";

export default function MakeAPostModal({isShowModal}){
    return(
        <>
        <Modal show={isShowModal} onHide={closeModal}>
                <Modal.Header>
                    <Modal.Title>Create post</Modal.Title>
                    <span style={{cursor:'pointer'}} className="font-weight-bold" onClick={closeModal}>X</span>
                </Modal.Header>

                <Modal.Body>
                {/* main body container for control */}
                <div className="d-flex flex-column" style={{minHeight:'40vh'}}>
                    {/* TItle */}
                    <div className="d-flex flex-column justify-content-center align-items-start m-2">
                        <input type="text" value={title} placeholder={'Title...'}  onChange={handleTitleChange}  style={{borderRadius:'5px', borderWidth:'1px', width:'70%'}}/>
                    </div>
                    {/* Message */}
                    <div className="m-2">
                    <textarea
                        value={message}
                        placeholder={'What do you want to say?'}
                        onChange={handleMessageChange}
                        style={{ borderRadius: '5px', minHeight: '20vh', width: '100%', resize: 'none'  }}
                    />
                    </div>
                    {/* Image Attachments */}
                    <div className="d-flex flex-column align-items-center justify-content-center p-2 mt-auto m-2" style={{minHeight:'80px', borderRadius:'8px', borderWidth:'1px', borderStyle:'solid', borderColor:'#516473' }}>
                        
                        <div className="d-flex overflow-auto">
                            {selectedImage.length > 0?<>{renderImagePreviews()}</>   : null}
                        </div>
                    
                        <Form.Group controlId="imageInput">
                            <Form.Label className="smallest">Please choose the image that you want to attach(optional)</Form.Label>
                            <Form.Control
                                style={{borderStyle:'none'}}
                                className="smallest newsAndUpdateImage"
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </Form.Group>
                    </div>  
                </div>  
                </Modal.Body>
                
                <Modal.Footer>

                <Button variant="secondary" size='sm' onClick={closeModal}>
                Close
                </Button>
                <Button disabled={loading || missingInfo} style={{backgroundColor:'#016B83'}}size='sm' onClick={handlePost}>
                Post
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}