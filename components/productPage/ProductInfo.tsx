import React from "react"
import { Grid, Avatar, Container, Text, Spacer } from "@nextui-org/react"

const ProductInfo: React.FC<{ title: string, description: string, avatar: string }> = ({ title, description, avatar }) => {

    return (
        <Grid xs={7}>
            <Container style={{display: "flex", justifyContent: "space-between"}}>
                <div>
                    <Text
                        h1
                        css={{
                            textGradient: "45deg, $purple500 -20%, $pink500 100%",
                          }}
                    >{title}</Text>
                </div>
                <div>
                    <Avatar squared size="xl" src={avatar} />
                </div>
                {description}
            </Container>
        </Grid>
    )
}

export default ProductInfo