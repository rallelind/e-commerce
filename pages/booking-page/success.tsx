import SuccessCheckmark from "../../components/utils/SuccessCheckmark"
import successPageStyles from "../../styles/SuccessPage.module.css"
import Header from "../../components/utils/Header"
import Image from "next/image"
import { Text, Button } from "@nextui-org/react"
import { useMediaQuery } from "@mantine/hooks"
import { useRouter } from "next/router"

const SuccessPage = () => {

    const sm = useMediaQuery("(min-width: 500px)")

    const router = useRouter()

    const goToProfile = () => {
        router.push("/profile/user-products")
    }

    return (
        <div>
            <Header dates={null} setDates={null} />
                <div>
                    <SuccessCheckmark />
                </div>
                <div className={sm ? successPageStyles.textContainer : successPageStyles.smallTextContainer}>
                    <div>
                        <div>
                            <Text h3 color="#7ac142">Your order was successfull</Text>
                            <Text>
                                Your order was proceessed successfully and we have let the owner 
                                know that you wish to book their van. You will be notified when the owner
                                either accept or decline your order.
                                To view the status on your request please proceed with the button below.
                            </Text>
                        </div>
                    </div>
                    <div className={successPageStyles.center}>
                        <Button auto  onClick={goToProfile} className={successPageStyles.successButton}>
                            View order
                        </Button>
                    </div>
                </div>
            <div className={successPageStyles.leftCorner}>
                <Image src="/illustrations/success-illustration.jpg" height="300" width="500" />
            </div>
        </div>
    )
}

export default SuccessPage