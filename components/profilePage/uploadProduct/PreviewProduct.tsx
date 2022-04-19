import { Card, Col, Text } from "@nextui-org/react";
import React from "react";
import ImageSlider from "../../utils/ImageSlider";

const PreviewProduct: React.FC<{ content: string, title: string, images: any, price: number }> = ({ content, title, images, price }) => {
    return (
            <Card 
                style={{ width: "50%", left: "25%", marginTop: "5%" }}
                cover
            >
                <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                            <Col>
                                <Text h4 color="white">
                                    {title}
                                </Text>
                            </Col>
                </Card.Header>
                <Card.Body style={{ overflow: "hidden" }}>
                    <ImageSlider 
                        images={images}
                    />
                </Card.Body>
                <Card.Footer
                    blur
                    css={{
                        position: "absolute",
                        bgBlur: "#ffffff",
                        borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
                        bottom: 0,
                        zIndex: 1,
                    }}
                    >
                    {price} DKK
                </Card.Footer>
            </Card>
    )
}

export default PreviewProduct