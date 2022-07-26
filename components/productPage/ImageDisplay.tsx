import { Image } from "@nextui-org/react";
import stylesImageDisplay from "../../styles/ImageDisplay.module.css"
import { BsGrid3X2Gap } from "react-icons/bs"
import { Text } from "@nextui-org/react"
import { useRouter } from "next/router";

const ImageDisplay = ({ image, productId }) => {

    const router = useRouter()

    return (
        <>
        <div className={stylesImageDisplay.imageGrid} >
            <img className={`${stylesImageDisplay.imageGridCol2} ${stylesImageDisplay.imageGridRow2}`} src={image[0]} />
            <img src={image[1]} />
            <img src={image[2]} />
            <img src={image[3]} />
            
                <img src={image[4]} />
                <div onClick={() => router.push(`/product-page/${productId}/image-gallery`)} className="top-[30px] right-[30px] bg-white absolute flex items-center p-2 rounded-xl border-solid border-2 cursor-pointer">
                    <Text
                        h5
                        css={{
                            marginRight: "10px",
                        }}
                    >
                        View more
                    </Text>
                    <BsGrid3X2Gap size={30} />
                </div>
        </div>
        </>
    )
}

export default ImageDisplay