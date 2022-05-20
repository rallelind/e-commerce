import React, { useState } from 'react'
import { Grid } from '@nextui-org/react'
import ProductCard, { PostProps } from '../components/utils/ProductCard'
import { GetServerSideProps } from "next"
import { useRouter } from 'next/router'
import prisma from "../lib/prisma"
import Layout from '../components/utils/Layout';

export const getServerSideProps: GetServerSideProps = async () => {
  //const date1 = new Date('2022-05-20')
  //const date2 = new Date('2022-05-28')

  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  /*const products = []
  feed.map((e) => {
    if(date1 >= new Date(e.dates[0]) && date1 <= new Date(e.dates[1]) && date2 >= new Date(e.dates[0]) && date2 <= new Date(e.dates[1])) {
      products.push(e)
    }
  })
  console.log(products)*/
  return { props: { feed } }
}

type Props = {
  feed: PostProps[]
}

const ShowProduct: React.FC<Props> = (props) => {
  const router = useRouter()

  return (
    <Layout>
      <Grid.Container gap={4}>
          {props.feed.map((post) => (
              <ProductCard 
                onClick={() => router.push(`/product-page/${post.id}`)}
                hoverable={false}
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
