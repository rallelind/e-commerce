import { Dropzone } from "@mantine/dropzone"

const ImageDropzone = (props) => {

    return (
        <Dropzone
            onDrop={props.onDrop}
        >
            {() => <h1>hi</h1>}
        </Dropzone>
    )
}

export default ImageDropzone