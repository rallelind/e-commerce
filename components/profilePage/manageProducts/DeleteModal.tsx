import React from 'react';
import { Modal, Button, Text } from '@nextui-org/react';

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
                <Text>
                    Are you SURE you want to delete this van?
                </Text>
            </Modal.Body>
            <Modal.Footer>
                <Button>
                    Close
                </Button>
                <Button onClick={deleteProduct}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteModal