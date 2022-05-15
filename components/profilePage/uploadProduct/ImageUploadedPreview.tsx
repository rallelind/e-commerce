import React from "react"
import { Card, Grid } from "@nextui-org/react"

const PreviewImagesUploaded = (props) => {
    return (
            <Grid xs={4}>
                    <Card 
                        style={{ marginTop: "7%" }}
                        cover 
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