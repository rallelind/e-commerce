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

  const [dates, setDates] = useState([]);
  
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

  const checkIfDatesChosenIsBooked = (bookedDates) => {

    
    if ((dates[0] !== null && dates[1] !== null) && dates.length === 2) {

      if((dates[1] >= new Date(bookedDates[0])) && (dates[0] <= new Date(bookedDates[bookedDates.length - 1]))) {
        console.log("booked")
        return true
      } else {
        console.log("not booked")
        return false
      }
    } else {
      return false
    }
  }

  const datesChosen = (postDates) => {

    if ((dates[0] !== null && dates[1] !== null) && dates.length === 2) {
      if((dates[0] <= new Date(postDates[1]) && dates[0] >= new Date(postDates[0])) && (dates[1] <=  new Date(postDates[1]) && dates[1] >= new Date(postDates[0]))) {
        return true
      } else {
        return false
      }
    } else {
      return true
    }
  }

  const productOnClick = (postId) => {

    let datesChosen: string[] = dates.length === 2 && dates.map(date => String(date))

    router.push({
      pathname: `/product-page/${postId}`,
      query: { datesChosen },
    })
  }


  return (
    <>
    <Layout dates={dates} setDates={setDates}>
      <div className='mb-[2%] w-full flex justify-center z-10 p-5'>
        <Chips color="grape" size='md' radius="lg" variant='filled' value={features} onChange={setFeatures} multiple>
          {featuresData.map((featureData, index) => (
              <Chip key={index} checked={false} value={featureData.value}>{featureData.label}</Chip>
          ))}
        </Chips>
      </div>
      {isLoading ? <LoadingProductSkeleton /> :
      <>
      <Grid.Container gap={4}>
          {data && data.pages.map((page) => {
            
            return (
              <React.Fragment key={page.nextId ?? 'lastPage'}>
                {page.posts.map((post, index) => {                
              console.log(checkIfDatesChosenIsBooked(post.bookedDates))
              if(post.author.email !== session?.data?.user?.email && (featuresChecked(post.features) && datesChosen(post.dates) && !checkIfDatesChosenIsBooked(post.bookedDates))) {
                return (
                <ProductCard 
                  onClick={() => productOnClick(post.id)}
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
