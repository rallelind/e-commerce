import React from 'react'
import { Grid, Card, Col, Text } from '@nextui-org/react'

export type PostProps = {
    id: number;
    title: string;
    author: {
      name: string;
      email: string;
    } | null;
    image: string[];
    content: string;
    published: boolean;
  };

const ProductCard: React.FC<{post: PostProps}> = ({ post }) => {
    const authorName = post.author ? post.author.name : "Unknown author"
    return (
        <Grid.Container gap={2} justify="center">
            <Grid xs={4}>
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
                    <Card.Image
                        src={post.image[0]}
                        height={340}
                        width="100%"
                        alt="Card image background"
                        />
                </Card>
            </Grid>
        </Grid.Container>
    )
}

export default ProductCard
