import { Card, Grid, Text, Avatar, Divider, Spacer, Button } from "@nextui-org/react"
import React, { useState } from "react"
import productOrdersCardStyles from "../../../styles/ProductOrderCard.module.css"
import ProductOrdersModal from "./ProductOrdersModal"
import useRouterRefresh from "../../../lib/customHook/useRouterRefresh"
import Image from "next/image"

const ProductOrdersCards = ({ userName, userImage, startDate, endDate, productTitle, orderId, productId }) => {

    const [declineOrderModal, setDeclineOrderModal] = useState(false)
    const [acceptOrderModal, setAcceptOrderModal] = useState(false)

    const dateOne = new Date(startDate)

    const dateTwo = new Date(endDate)

    const refresh = useRouterRefresh()

    const declineOrder = async (id) => {
        await fetch(`/api/orders/decline/${id}`, {
            method: "DELETE"
        })
        .then(refresh)
        .then(() => setDeclineOrderModal(false))
    }

    const acceptOrder = async (id) => {

        const body = { startDate, endDate, productId }

        await fetch(`/api/orders/accept/${id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })
        .then(async () => {
            await fetch("/api/orders/accept/removeDuplicateOrders", {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })
        })
        .then(refresh)
        .then(() => setAcceptOrderModal(false))
    }

    return (
        <>
        <ProductOrdersModal 
            open={declineOrderModal}
            onClick={() => declineOrder(orderId)}
            onClose={() => setDeclineOrderModal(false)}
            headline="are you SURE you want to decline this order?"
            color="error"
            buttonAction="Decline order"
        />
        <ProductOrdersModal 
            open={acceptOrderModal}
            onClick={() => acceptOrder(orderId)}
            onClose={() => setAcceptOrderModal(false)}
            headline="are you SURE you want to accept this order?"
            color="success"
            buttonAction="Accept order"
        />
        <Grid sm={3}>
            <Card>
                <Card.Body>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div className={productOrdersCardStyles.verticalAlign}>
                            <Text
                                h5
                                css={{
                                    textGradient: "112deg, #06B7DB -63.59%, #FF4ECD -20.3%, #0072F5 70.46%",
                                }}
                            >{userName}</Text>
                        </div>
                        <div>
                            <Avatar
                                squared
                                size="lg"
                                src={userImage}
                            />
                        </div>
                    </div>
                    <Spacer y={0.5} />
                    <Divider />
                    <Spacer y={0.5} />
                    <Text>
                        Requested to book <Text b>{productTitle}</Text>
                    </Text>
                    <Spacer y={0.5} />
                    <Text>
                        from {`${dateOne.getDate()}.${dateOne.getMonth()}`} - {`${dateTwo.getDate()}.${dateTwo.getMonth()}`}
                    </Text>
                    <Spacer y={0.5} />
                    <Divider />
                    <Spacer y={0.5} />

                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div>
                            <Button color="error" onClick={() => setDeclineOrderModal(true)} auto size="xs">
                                Decline
                            </Button>
                        </div>
                        <div>
                            <Button onClick={() => setAcceptOrderModal(true)} color="success" auto size="xs">
                                Accept
                            </Button>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Grid>
        </>
    )
}

export default ProductOrdersCards