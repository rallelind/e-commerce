import { Card, Grid, Text, Avatar, Divider, Spacer, Button, Tooltip } from "@nextui-org/react"
import React, { useState } from "react"
import productOrdersCardStyles from "../../../styles/ProductOrderCard.module.css"
import ProductOrdersModal from "./ProductOrdersModal"
import ProductOrdersCalendarModal from "./ProductOrdersCalendarModal"
import useRouterRefresh from "../../../lib/customHook/useRouterRefresh"
import Image from "next/image"

const ProductOrdersCards = ({ productOrder }) => {

    console.log(productOrder)

    const [declineOrderModal, setDeclineOrderModal] = useState(false)
    const [acceptOrderModal, setAcceptOrderModal] = useState(false)
    const [productOrderCalendar, setProductOrderCalendar] = useState(false)

    const dateOne = new Date(productOrder.startDate)

    const dateTwo = new Date(productOrder.endDate)

    const refresh = useRouterRefresh()

    const declineOrder = async (id) => {
        await fetch(`/api/orders/decline/${id}`, {
            method: "DELETE"
        })
        .then(refresh)
        .then(() => setDeclineOrderModal(false))
    }

    const acceptOrder = async (id) => {

        const { startDate, endDate, productId } = productOrder

        const body = { startDate, endDate, productId }
        try {
            await fetch(`/api/orders/accept/${id}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })
        } catch(error) {
            console.log(error)
        } finally {
            await fetch("/api/orders/accept/removeDuplicateOrders", {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })
            .then(refresh)
            .then(() => setAcceptOrderModal(false))
        }
    }

    return (
        <>
        <ProductOrdersModal 
            open={declineOrderModal}
            onClick={() => declineOrder(productOrder.id)}
            onClose={() => setDeclineOrderModal(false)}
            headline="are you SURE you want to decline this order?"
            color="error"
            buttonAction="Decline order"
        />
        <ProductOrdersModal 
            open={acceptOrderModal}
            onClick={() => acceptOrder(productOrder.id)}
            onClose={() => setAcceptOrderModal(false)}
            headline="are you SURE you want to accept this order? Accepting this order will remove orders where dates overlaps with this order!"
            color="success"
            buttonAction="Accept order"
        />
        <ProductOrdersCalendarModal 
            open={productOrderCalendar}
            range={[dateOne, dateTwo]}
            onClose={() => setProductOrderCalendar(false)}
            minDate={new Date(productOrder.product.dates[0])}
            maxDate={new Date(productOrder.product.dates[1])}
            bookedDates={productOrder.product.bookedDates}
        />
        <Grid sm={4} xs={6}>
            <Card>
                <Card.Body>
                    <div className="flex justify-between">
                        <div className={productOrdersCardStyles.verticalAlign}>
                            <Text
                                h5
                                css={{
                                    textGradient: "112deg, #06B7DB -63.59%, #FF4ECD -20.3%, #0072F5 70.46%",
                                }}
                            >{productOrder.user.name}</Text>
                        </div>
                        <div>
                            <Avatar
                                squared
                                size="lg"
                                src={productOrder.user.image}
                            />
                        </div>
                    </div>
                    <Spacer y={0.5} />
                    <Divider />
                    <Spacer y={0.5} />
                        
                            <Text>
                                Requested to book <Tooltip placement="topStart" className="w-full" content={"Click to view calendar of van"}><Text b onClick={() => setProductOrderCalendar(true)} className="underline">{productOrder.product.title}</Text></Tooltip>
                            </Text>
                        
                    <Spacer y={0.5} />
                    <Text>
                        from {`${dateOne.getDate()}.${dateOne.getMonth()}`} - {`${dateTwo.getDate()}.${dateTwo.getMonth()}`}
                    </Text>
                    <Spacer y={0.5} />
                        <Divider />
                        <Spacer y={0.5} />

                        <div className="flex justify-between">
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