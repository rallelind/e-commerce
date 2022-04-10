import { Dropzone } from "@mantine/dropzone"
import { Group, Text } from "@mantine/core"
import { FcAddImage } from "react-icons/fc"

const ImageDropzone = (props) => {

    return (
        <Dropzone
            onDrop={props.onDrop}
        >
              {() =>
                <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
                <FcAddImage size={80} />

                <div>
                <Text size="xl" inline>
                    Drag images here or click to select files
                </Text>
                <Text size="sm" color="dimmed" inline mt={7}>
                    Attach as many files as you like, each file should not exceed 5mb
                </Text>
                </div>
            </Group>
            }
        </Dropzone>
    )
}

export default ImageDropzone