import { useState } from "react"
import { GetServerSideProps } from "next"
import { Grid, Image, Container } from "@nextui-org/react"
import dynamic from "next/dynamic"
const ImageDisplay = dynamic(() => import("../../../components/productPage/ImageDisplay"), { ssr: false })
import Layout from "../../../components/utils/Layout"
const ProductInfo = dynamic(() => import("../../../components/productPage/ProductInfo"), { ssr: false })
const BookingSystem = dynamic(() => import("../../../components/productPage/BookingSection"), { ssr: false })
import { useRouter } from "next/router"
import prisma from "../../../lib/prisma"

export const getServerSideProps: GetServerSideProps = async ({ params, res }) => {
  
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )
  
    const post = await prisma.post.findUnique({
      where: {
          id: String(params?.id),
      },
      include: {
          author: {
              select: { name: true, email: true, image: true },
          },
      },
  })

    return {
      props: JSON.parse(JSON.stringify(post)),
    }
  }

export default function ProductPage(props) {

    const [dates, setDates] = useState<[Date | null, Date | null]>([null, null])

    const amountOfDays = () => {
      if(dates[0] === null || dates[1] === null) {
        return
      }
        let timeDiff = Math.abs(dates[0].getTime() - dates[1].getTime())
        return Math.ceil(timeDiff / (1000 * 3600 * 24)) * props.price
    }

    const router = useRouter()

    const routeChange = () => {

      let bookingDates = dates.map((e) => String(e))

      router.push({
        pathname: `/booking-page/${props.id}`,
        query: { bookingDates }
      })
    }
    
    return (
        <Layout dates={null} setDates={null}>
          <ImageDisplay 
            image={props.image}
          />
          <Grid.Container justify="center" gap={4}>
              <ProductInfo 
                value={dates}
                onChange={setDates}
                avatar={props.author.image}
                title={props.title}
                description={props.content}
                minDate={props.dates[0]}
                maxDate={props.dates[1]}
                features={props.features}
                bookedDates={props.bookedDates}
              />
              <BookingSystem 
                price={props.price}
                minDate={props.dates[0]}
                maxDate={props.dates[1]}
                onChange={setDates}
                value={dates}
                rentCost={amountOfDays()}
                serviceCost={amountOfDays()*0.1}
                totalCost={amountOfDays() + amountOfDays()*0.1}
                height={dates[0] === null || dates[1] === null ? "175px" : "350px"}
                onClick={routeChange}
                bookedDates={props.bookedDates}
              />
          </Grid.Container>
        </Layout>
    )
}