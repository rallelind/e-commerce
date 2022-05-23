import React from "react";
import { Modal, Text, Container, Button, NormalColors } from "@nextui-org/react";

type Modal = {
    open: boolean,
    onClose: () => void,
    onClick: () => void,
    headline: string,
    color: NormalColors,
    buttonAction: string,
}

const ProductOrdersModal: React.FC<Modal> = ({ open, onClose, onClick, headline, color, buttonAction }) => {

    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Modal.Body>
                <Text>
                    <Text h4>
                        {headline}
                    </Text>
                </Text>
            </Modal.Body>
            <Modal.Footer>
                <Container style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                        <Button size="sm" color="default" auto onClick={onClose}>
                            Close
                        </Button>
                    </div>
                    <div>
                    <Button size="sm" auto color={color} onClick={onClick}>
                        {buttonAction}
                    </Button>
                    </div>
                </Container>
            </Modal.Footer>
        </Modal>
    )
}

export default ProductOrdersModal