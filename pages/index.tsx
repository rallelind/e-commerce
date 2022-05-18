import React, { useState } from 'react'
import { Grid } from '@nextui-org/react'
import ProductCard, { PostProps } from '../components/utils/ProductCard'
import { GetStaticProps } from "next"
import { useRouter } from 'next/router'
import prisma from "../lib/prisma"
import Layout from '../components/utils/Layout';

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

//test
const ShowProduct: React.FC<Props> = (props) => {

  const router = useRouter()

  return (
    <Layout>
      <Grid.Container gap={4}>
          {props.feed.map((post) => (
              <ProductCard 
                onClick={() => router.push(`/product-page/${post.id}`)}
                hoverable
                clickable
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
