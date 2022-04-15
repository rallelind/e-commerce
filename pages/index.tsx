import React from 'react'
import { Grid } from '@nextui-org/react'
import ProductCard, { PostProps } from '../components/utils/ProductCard'
import { GetServerSideProps } from "next"
import prisma from "../lib/prisma"
import Layout from '../components/utils/Layout';

export const getServerSideProps: GetServerSideProps = async () => {
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

//test
const ShowProduct: React.FC<Props> = (props) => {
  return (
    <Layout>
      <Grid.Container gap={4}>
        {props.feed.map((post) => (
            <ProductCard 
              key={post.id} 
              post={post} 
              xs={12}
              sm={3}
              />
        ))}
      </Grid.Container>
    </Layout>
  )
}

export default ShowProduct
