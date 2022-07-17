import React, { useState } from 'react'
import { Grid } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import { PostProps } from '../components/utils/ProductCard'
import { GetServerSideProps } from "next"
import { useRouter } from 'next/router'
import { Chips, Chip } from '@mantine/core'
import { GiGasStove, GiKitchenTap, GiWaterGallon } from "react-icons/gi"
import { MdKitchen } from "react-icons/md"
import { FaShower } from "react-icons/fa"
import { BiFridge, BiWifi } from "react-icons/bi"
import dynamic from 'next/dynamic'
const ProductCard = dynamic(() => import('../components/utils/ProductCard'), { ssr: false })
import Layout from '../components/utils/Layout';
import prisma from '../lib/prisma'

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

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


const ShowProduct = ({ feed }) => {

  console.log(feed)

  const featuresData = [
    { value: "waterSystem", label: "Water system", icon: <GiKitchenTap size={20} /> },
    { value: "kitchen", label: "Kitchen", icon: <MdKitchen size={20} /> },
    { value: "shower", label: "Shower", icon: <FaShower size={20} /> },
    { value: "wifi", label: "Wifi", icon: <BiWifi size={20} /> },
    { value: "fridge", label: "Fridge", icon: <BiFridge size={20} /> },
    { value: "stove", label: "Stove", icon: <GiGasStove size={20} /> },
    { value: "waterTanks", label: "Water tanks", icon: <GiWaterGallon size={20} /> },
  ]

  const router = useRouter()

  const session = useSession()

  const [features, setFeatures] = useState([])

  console.log(features)

  const featuresChecked = (postFeaturesArray) => {
    if(features.length > 0) {
      return postFeaturesArray.some(postFeatures => features.indexOf(postFeatures) >= 0)
    } else {
      return true
    }
  } 

  return (
    <Layout>
      <div className='mb-[2%] w-full flex justify-center'>
        <Chips color="grape" size='md' radius="lg" variant='filled' value={features} onChange={setFeatures} multiple>
          {featuresData.map((featureData, index) => (
              <Chip key={index} checked={false} value={featureData.value}>{featureData.label}</Chip>
          ))}
        </Chips>
      </div>
      <Grid.Container gap={4}>
          {feed.map((post) => (
            post.author.email !== session?.data?.user?.email && featuresChecked(post.features) &&
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
