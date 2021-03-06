import { Dropzone, MIME_TYPES } from '@mantine/dropzone'
import { Group, Text } from "@mantine/core"
import { FcAddImage } from "react-icons/fc"

const ImageDropzone = (props) => {

    return (
        <div style={{ marginTop: "5%" }}>
            <Dropzone
                accept={[MIME_TYPES.png, MIME_TYPES.jpeg]}
                onDrop={props.onDrop}
            >
                {() =>
                    <Group position="center" spacing="xl" className="min-h-[220px] pointer-events-none">
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
        </div>
    )
}

export default ImageDropzone