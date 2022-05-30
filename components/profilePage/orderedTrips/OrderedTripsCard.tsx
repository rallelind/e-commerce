import React from "react"
import { Card, Grid, Text, Spacer } from "@nextui-org/react"
import { StyledBadge } from "../manageProducts/StyledBadge"
import Image from "next/image"

type OrderedTripsCards = {
    image: string;
    status: boolean;
    startDate: Date;
    endDate: Date;
}

const OrderedTripsCards: React.FC<OrderedTripsCards> = ({ image, status, startDate, endDate }) => {

    const dateOne = new Date(startDate)

    const dateTwo = new Date(endDate)

    return (
        <Grid sm={3}>
            <Card>
                <Card.Body>
                    <Spacer y={0.5} />
                    <Image style={{ borderRadius: "10px" }} src={image} height="275" width="250" />
                    <Spacer y={0.5} />
                    <StyledBadge type={status ? "active" : "vacation"}>{status ? "Order accepted" : "Awaiting approval"}</StyledBadge>
                    <Spacer y={0.5} />
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Text h5>
                            Requested dates:
                        </Text>
                        <Text h5>
                            {`${dateOne.getDate()}.${dateOne.getMonth()}`} - {`${dateTwo.getDate()}.${dateTwo.getMonth()}`}
                        </Text>
                    </div>
                    <Spacer y={0.5} />
                </Card.Body>
            </Card>
        </Grid>
    )
}

export default OrderedTripsCards