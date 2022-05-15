import React from 'react';
import { useRouter } from 'next/router';
import { Modal, Button, Text, Container } from '@nextui-org/react';

type Modal = {
    open: boolean,
    onClose: () => void,
    productToDelete: string,
}

const DeleteModal: React.FC<Modal> = ({ open, onClose, productToDelete }) => {

    const router = useRouter()

    const deleteProduct = async () => {
        await fetch(`/api/product/delete-product/${productToDelete}`, {
            method: "DELETE"
        })
        .then(() => router.replace(router.asPath))
        .then(onClose);
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Modal.Body>
                <Text>
                    <Text h4>
                        Are you SURE you want to delete this van?
                    </Text>
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