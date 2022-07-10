import React, { useState } from 'react'
import { Grid } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import { PostProps } from '../components/utils/ProductCard'
import { GetServerSideProps } from "next"
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
const ProductCard = dynamic(() => import('../components/utils/ProductCard'), { ssr: false })
import Layout from '../components/utils/Layout';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

  const res = await fetch(`${process.env.ENVIRONMENT}/api/product/feed`)
  const feed = await res.json()

  return { props: { feed } }
}

type Props = {
  feed: PostProps[]
}

const ShowProduct: React.FC<Props> = (props) => {
  const router = useRouter()

  const session = useSession()

  console.log(props.feed)

  return (
    <Layout>
      <Grid.Container gap={4}>
          {props.feed.map((post) => (
            post.author.email !== session?.data?.user?.email && 
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
