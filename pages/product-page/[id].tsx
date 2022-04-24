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

    const [dates, setDates] = useState([])

    console.log(dates)

    return (
        <Layout>
          <ImageDisplay 
            image={props.image}
          />
          <Grid.Container justify="center" gap={4}>
              <ProductInfo 
                value={[new Date(dates[0]), new Date(dates[1])]}
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
              />
          </Grid.Container>
        </Layout>
    )
}