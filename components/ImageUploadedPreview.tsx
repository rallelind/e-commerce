import React from "react"
import { Card, Grid } from "@nextui-org/react"

const PreviewImagesUploaded = (props) => {
    return (
            <Grid xs={12} sm={6}>
                <Card 
                    cover 
                    hoverable
                    onClick={props.onClick}
                >
                    <Card.Image 
                        height={"100%"}
                        src={props.src}
                    />
                </Card>
            </Grid>
    )
}

export default PreviewImagesUploaded