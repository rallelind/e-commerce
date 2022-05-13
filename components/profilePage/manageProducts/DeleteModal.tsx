import React from 'react';
import { Modal, Button, Text, Container } from '@nextui-org/react';

type Modal = {
    open: boolean,
    onClose: () => void,
    productToDelete: string,
}

const DeleteModal: React.FC<Modal> = ({ open, onClose, productToDelete }) => {

    const deleteProduct = async () => {
        await fetch(`/api/product/delete-product/${productToDelete}`, {
            method: "DELETE"
        })
        .then(onClose);
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Modal.Body>
                <Text h4>
                    <Text small>Are you</Text><Text small>SURE</Text><Text small>you want to delete this van?</Text>
                </Text>
            </Modal.Body>
            <Modal.Footer>
                <Container style={{ display: "flex", justifyContent: "space-evenly" }}>
                    <div>
                        <Button color="gradient" auto onClick={onClose}>
                            Close
                        </Button>
                    </div>
                    <div>
                    <Button auto color="error" onClick={deleteProduct}>
                        Delete
                    </Button>
                    </div>
                </Container>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteModal