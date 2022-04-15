import { Stepper, Text } from "@mantine/core"

import { FcAddImage } from "react-icons/fc"
import { MdSubtitles, MdDescription } from "react-icons/md"
import { GiPriceTag, GiClothes } from "react-icons/gi"


const UploadTimeline = (props) => {
    return (
        <Stepper style={{ width: "100%" }} iconSize={50} active={props.active} onStepClick={props.onStepClick} color="grape">
            <Stepper.Step
                label="Step 1"
                description="Fill out all details about your product"
                icon={<MdDescription size={40} />}
            />
            <Stepper.Step
                label="Step 2"
                description="Add images for your product"
                icon={<FcAddImage size={40} />}
            />
            <Stepper.Step
                label="Step 3"
                description="Preview your product"
                icon={<GiClothes size={40} />}
            />
        </Stepper>
    )
}

export default UploadTimeline