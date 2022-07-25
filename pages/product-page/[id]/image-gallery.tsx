import prisma from "../../../lib/prisma"


export const getStaticProps = async ({ params }) => {

    const post = await prisma.post.findUnique({
        where: {
            id: String(params?.id),
        },
        select: {
            image: true
        }
    })

    return { props: post }
}

export const getStaticPaths = async () => {

    const posts = await prisma.post.findMany({
        select: {
            id: true
        }
    })

    const ids = posts.map(post => post.id);

    const paths = ids.map(id => ({params: {id: id.toString()}}))
    
    return {
        paths,
        fallback: false,
    }
}

export default function ImageGallery(props) {

    console.log(props)

    return (
        <div>
            <h1>hello world</h1>
        </div>
    )
}