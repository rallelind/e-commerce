import prisma from "../../../lib/prisma"
import Image from "next/image"

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

    const image = [1,2,3,4,5,6,7,8,9,10]

    return (
        <div className={`grid grid-cols-3 grid-rows-${props.image.length} gap-4`}>
            {image.map((img, i) => {

                if(i % 5 === 0) {
                    return (
                        <div className="row-span-4" key={i} style={{ backgroundColor: "red" }}>
                            <h1>hi</h1>
                        </div>
                    )
                } else if (i % 8 === 0) {
                    return (
                        <div className="row-span-4">
                            <h1>yoyo</h1>
                        </div>
                    )
                
                } else {
                    return (
                        <div className="row-span-2 col-span-1" key={i} style={{ backgroundColor: "green" }}>
                            <h1>yo</h1>
                        </div>
                    )
                }
            })}
        </div>
    )
}