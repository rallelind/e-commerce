import prisma from "../../../lib/prisma"
import GoBackBtn from "../../../components/utils/GoBackBtn"
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


    return (
        <>
            <div className="top-[30px] left-[30px] fixed">
                <GoBackBtn />
            </div>
        <div className="flex justify-center">
            <div className={`grid-cols-3 p-20 space-y-2 lg:space-y-0 lg:grid lg:gap-3 lg:grid-rows-3 w-[85%]`}>
                {props.image.map((img, i) => {

                    if(i % 6 === 0) {
                        return (
                            <div className="w-full col-start-1 col-span-2 row-span-2">
                                <img src={img} />
                            </div>
                        )
                    
                    } else {
                        return (
                            <div className="w-full">
                                <img src={img} />
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    </>
    )
}