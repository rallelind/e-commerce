import { Stepper, Text } from "@mantine/core"

import { FcAddImage } from "react-icons/fc"
import { MdSubtitles, MdDescription } from "react-icons/md"
import { GiPriceTag, GiClothes } from "react-icons/gi"


const UploadTimeline = (props) => {
    return (
        <Stepper style={{ width: "100%" }} iconSize={60} active={props.active} onStepClick={props.onStepClick} color="grape">
            <Stepper.Step
                icon={<MdSubtitles size={40} />}
            />
            <Stepper.Step
                icon={<MdDescription size={40} />}
            />
            <Stepper.Step
                icon={<GiPriceTag size={40} />}
            />
            <Stepper.Step
                icon={<FcAddImage size={40} />}
            />
            <Stepper.Step
                icon={<GiClothes size={40} />}
            />
        </Stepper>
    )
}

export default UploadTimeline