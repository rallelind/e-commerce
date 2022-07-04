import React from "react"
import { Card, Grid } from "@nextui-org/react"

const BookingImages: React.FC<{images: string[]}> = ({ images }) => {
    return (
        <Grid.Container gap={2} justify="center">
            <Grid xs={5}>
                <Card shadow={false} cover className="h-full">
                    <Card.Image 
                        width="100%"
                        src={images[0]}
                    />
                </Card>
            </Grid>
            <Grid xs={5}>
                <Card shadow={false} cover className="h-full">
                    <Card.Image 
                        src={images[1]}
                        width="100%"
                    />
                </Card>
            </Grid>
            <Grid xs={11}>
                <Card shadow={false} cover className="h-[150px]">
                    <Card.Image 
                        src={images[2]}
                        width="100%"
                    />
                </Card>
            </Grid>
            <Grid xs={5}>
                <Card shadow={false} cover className="h-[100px]">
                    <Card.Image 
                        src={images[3]}
                        width="100%"
                    />
                </Card>
            </Grid>
            <Grid xs={5}>
                <Card shadow={false} cover className="h-[100px]">
                    <Card.Image 
                        src={images[4]}
                        width="100%"
                    />
                </Card>
            </Grid>
        </Grid.Container>
    )
}

export default BookingImages