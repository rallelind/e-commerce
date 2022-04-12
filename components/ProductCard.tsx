import React from 'react'
import { Grid, Card, Col, Text } from '@nextui-org/react'
import ImageSlider from './ImageSlider';

export type PostProps = {
    id: number;
    title: string;
    price?: number;
    author: {
      name: string;
      email: string;
    } | null;
    image: string[];
    content: string;
    published: boolean;
  };

const ProductCard: React.FC<{post: PostProps, xs: any, sm: any}> = ({ post, xs, sm }) => {
    const authorName = post.author ? post.author.name : "Unknown author"
    return (
            <Grid xs={xs} sm={sm}>
                <Card cover>
                    <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                        <Col>
                            <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
                                {post.content}
                            </Text>
                            <Text h4 color="white">
                                {post.title}
                            </Text>
                        </Col>
                    </Card.Header>
                    <Card.Body style={{ overflow: "hidden" }}>
                        <ImageSlider images={post.image}/>
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
                        {post.price} DKK
                    </Card.Footer>
                </Card>
            </Grid>
    )
}

export default ProductCard
