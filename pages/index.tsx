import React, { useState } from 'react'
import { Grid } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import { PostProps } from '../components/utils/ProductCard'
import { GetServerSideProps } from "next"
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
const ProductCard = dynamic(() => import('../components/utils/ProductCard'), { ssr: false })
import Layout from '../components/utils/Layout';
import prisma from '../lib/prisma'

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

  const feed = await prisma.post.findMany({
    where: { 
      published: true,
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });

  return { props: { feed } }
}

type Props = {
  feed: PostProps[]
}

const ShowProduct: React.FC<Props> = ({ feed }) => {

  const router = useRouter()

  const session = useSession()

  return (
    <Layout>
      <Grid.Container gap={4}>
          {feed.map((post) => (
            post.author.email !== session?.data?.user?.email && 
              <ProductCard 
                onClick={() => router.push({pathname: `/product-page/${post.id}`})}
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
