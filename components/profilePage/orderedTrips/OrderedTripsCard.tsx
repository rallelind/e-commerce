import React from "react"
import { Card, Grid, Text, Spacer } from "@nextui-org/react"
import { StyledBadge } from "../manageProducts/StyledBadge"
import Image from "next/image"

type OrderedTripsCards = {
    image: string;
    status: boolean;
    dates: string[];
}

const OrderedTripsCards: React.FC<OrderedTripsCards> = ({ image, status, dates }) => {

    const dateOne = new Date(dates[0])

    const dateTwo = new Date(dates[1])

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