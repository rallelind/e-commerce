import React from 'react'
import { Grid, Card, Col, Text } from '@nextui-org/react'
import ImageSlider from './ImageSlider';

export type PostProps = {
    id: number;
    title: string;
    image: string[];
    price: number;
    published: boolean;
    author: {
      name: string;
      email: string;
    } | null;
  };

const ProductCard: React.FC<{post: PostProps, xs: any, sm: any, clickable: boolean, hoverable: boolean, onClick: React.MouseEventHandler}> = ({ post, xs, sm, clickable, hoverable, onClick }) => {
    const authorName = post.author ? post.author.name : "Unknown author"
    return (
            <Grid xs={xs} sm={sm}>
                <Card onClick={onClick} cover hoverable={hoverable} clickable={clickable}>
                    <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                        <Col>
                            <Text h4 color="white">
                                {post.title}
                            </Text>
                        </Col>
                    </Card.Header>
                    <Card.Body style={{ overflow: "hidden" }}>
                        <ImageSlider 
                            images={post.image}
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
                        {post.price} DKK
                    </Card.Footer>
                </Card>
            </Grid>
    )
}

export default ProductCard
