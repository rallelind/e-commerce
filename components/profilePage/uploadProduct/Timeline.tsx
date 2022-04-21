import { Stepper, Text } from "@mantine/core"
import { FcAddImage, FcCalendar } from "react-icons/fc"
import { MdSubtitles, MdDescription } from "react-icons/md"
import { GiPriceTag, GiClothes } from "react-icons/gi"
import { useMediaQuery } from '@mantine/hooks';


const UploadTimeline = (props) => {

    const matches = useMediaQuery('(min-width: 650px)');

    return (
        <Stepper style={{ width: "100%" }} iconSize={40} active={props.active} onStepClick={props.onStepClick} color="grape">
            <Stepper.Step
                label={matches ? "Step 1" : null}
                icon={<MdDescription size={30} />}
            />
            <Stepper.Step
                label={matches ? "Step 2" : null}
                icon={<FcCalendar size={30} />}
            />
            <Stepper.Step
                label={matches ? "Step 3" : null}
                icon={<FcAddImage size={30} />}
            />
            <Stepper.Step
                label={matches ? "Step 4" : null}
                icon={<GiClothes size={30} />}
            />
        </Stepper>
    )
}

export default UploadTimeline