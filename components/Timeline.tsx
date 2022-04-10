import { Stepper, Text } from "@mantine/core"

import { FcAddImage } from "react-icons/fc"
import { MdSubtitles, MdDescription } from "react-icons/md"
import { GiPriceTag } from "react-icons/gi"


const UploadTimeline = (props) => {
    return (
        <Stepper active={props.active} onStepClick={props.onStepClick} orientation="vertical" color="grape">
            <Stepper.Step
                icon={<MdSubtitles />}
            />
            <Stepper.Step
                icon={<MdDescription />}
            />
            <Stepper.Step
                icon={<GiPriceTag />}
            />
            <Stepper.Step
                icon={<FcAddImage />}
            />
        </Stepper>
    )
}

export default UploadTimeline