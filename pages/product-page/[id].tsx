import { GetServerSideProps } from "next"
import { Grid,Image, Container } from "@nextui-org/react"
import ImageDisplay from "../../components/productPage/ImageDisplay"
import Layout from "../../components/utils/Layout"
import prisma from "../../lib/prisma"

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const post = await prisma.post.findUnique({
      where: {
        id: String(params?.id),
      },
      include: {
        author: {
          select: { name: true, email: true },
        },
      },
    })
    return {
      props: post,
    }
  }

export default function ProductPage(props) {

    console.log(props.image)

    return (
        <Layout>
          <ImageDisplay 
            image={props.image}
          />
            <h1>{props.title}</h1>
        </Layout>
    )
}