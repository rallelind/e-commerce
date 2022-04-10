import React from 'react'
import { Grid } from '@nextui-org/react'
import ProductCard, { PostProps } from '../components/ProductCard'
import { GetStaticProps } from "next"
import prisma from "../lib/prisma"

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return { props: { feed } }
}

type Props = {
  feed: PostProps[]
}


const ShowProduct: React.FC<Props> = (props) => {
  return (
    <Grid.Container gap={4}>
      {props.feed.map((post) => (
          <ProductCard 
            key={post.id} 
            post={post} 
            xs={12}
            sm={4}
            />
      ))}
    </Grid.Container>
  )
}

export default ShowProduct
