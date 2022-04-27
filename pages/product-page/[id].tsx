import { useState } from "react"
import { GetServerSideProps } from "next"
import { Grid, Image, Container } from "@nextui-org/react"
import ImageDisplay from "../../components/productPage/ImageDisplay"
import Layout from "../../components/utils/Layout"
import prisma from "../../lib/prisma"
import ProductInfo from "../../components/productPage/ProductInfo"
import BookingSystem from "../../components/productPage/BookingSection"

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
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
      props: post,
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

    return (
        <Layout>
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
                height={dates[0] === null || dates[1] === null ? "175px" : "300px"}
              />
          </Grid.Container>
        </Layout>
    )
}