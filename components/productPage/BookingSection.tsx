import React from "react"
import { Grid, Card } from "@nextui-org/react"

const BookingSystem: React.FC<{price: number}> = ({ price }) => {
    return (
        <Grid xs={4}>
            <Card>
                <Card.Body>
                    {price}
                </Card.Body>
            </Card>
        </Grid>
    )
}

export default BookingSystem