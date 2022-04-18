import { Image } from "@nextui-org/react";
import stylesImageDisplay from "../../styles/ImageDisplay.module.css"

const ImageDisplay = ({ image }) => {
    return (
        <div className={stylesImageDisplay.imageGrid} >
            <img className={`${stylesImageDisplay.imageGridCol2} ${stylesImageDisplay.imageGridRow2}`} src={image[0]} />
            <img src={image[1]} />
            <img src={image[2]} />
            <img src={image[3]} />
            <img src={image[4]} />
        </div>
    )
}

export default ImageDisplay