import React, { useState, useEffect, useRef } from 'react'
import { Grid } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Chips, Chip } from '@mantine/core'
import { GiGasStove, GiKitchenTap, GiWaterGallon } from "react-icons/gi"
import { MdKitchen } from "react-icons/md"
import { FaShower } from "react-icons/fa"
import { BiFridge, BiWifi } from "react-icons/bi"
import dynamic from 'next/dynamic'
const ProductCard = dynamic(() => import('../components/utils/ProductCard'), { ssr: false })
import Layout from '../components/utils/Layout';
import { useInView }  from "react-intersection-observer"
import { useInfiniteQuery } from 'react-query'
import LoadingProductSkeleton from '../components/skeleton/LoadingProductSkeleton'

const ShowProduct = () => {

  const { ref, inView } = useInView()

  const router = useRouter()

  const session = useSession()

  const [features, setFeatures] = useState([])
  const [initialLoad, setInitialLoad] = useState(false)

  const productRef = useRef(false)
  

  const { isLoading, isError, data, error, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      'posts',
      async ({ pageParam = '' }) => {
        const res = await fetch('/api/product/feed?cursor=' + pageParam, {
          method: "GET"
        })
        return res.json()
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextId ?? false,
      }
    )

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage])

  useEffect(() => {
    setInterval(() => {
      setInitialLoad(true);
    }, 5000);
  }, [])

  console.log(inView)


  if (isError) return <div>Error! {JSON.stringify(error)}</div>
  

  const featuresData = [
    { value: "waterSystem", label: "Water system", icon: <GiKitchenTap size={20} /> },
    { value: "kitchen", label: "Kitchen", icon: <MdKitchen size={20} /> },
    { value: "shower", label: "Shower", icon: <FaShower size={20} /> },
    { value: "wifi", label: "Wifi", icon: <BiWifi size={20} /> },
    { value: "fridge", label: "Fridge", icon: <BiFridge size={20} /> },
    { value: "stove", label: "Stove", icon: <GiGasStove size={20} /> },
    { value: "waterTanks", label: "Water tanks", icon: <GiWaterGallon size={20} /> },
  ]


  const featuresChecked = (postFeaturesArray) => {
    if(features.length > 0) {
      if(postFeaturesArray.length > features.length) {
        return postFeaturesArray.some(postFeatures => features.indexOf(postFeatures) >= 0)
      } else {
        return false
      }
    } else {
      return true
    }
  } 


  return (
    <>
    <Layout>
      <div className='mb-[2%] w-full flex justify-center'>
        <Chips color="grape" size='md' radius="lg" variant='filled' value={features} onChange={setFeatures} multiple>
          {featuresData.map((featureData, index) => (
              <Chip key={index} checked={false} value={featureData.value}>{featureData.label}</Chip>
          ))}
        </Chips>
      </div>
      {isLoading ? <div>loading</div> :
      <>
      <Grid.Container gap={4}>
          {data && data.pages.map((page) => {
            console.log(page.posts)
            return (
              <React.Fragment key={page.nextId ?? 'lastPage'}>
                {page.posts.map((post, index) => {                

                  if(post.author.email !== session?.data?.user?.email && featuresChecked(post.features)) {
                return (
                <ProductCard 
                  onClick={() => router.push({pathname: `/product-page/${post.id}`})}
                  hoverable={false}
                  clickable
                  key={post.id} 
                  post={post} 
                  xs={12}
                  sm={3}
                  />
                )
              }
                
                })}
              </React.Fragment>
              )
          })}
      
      </Grid.Container>
      
      {isFetchingNextPage && <LoadingProductSkeleton />}
      {initialLoad && <span ref={ref} style={{ visibility: "hidden" }}>intersection observer marker</span>}
        </>
      }
      </Layout>
    </>
  )
}

export default ShowProduct
