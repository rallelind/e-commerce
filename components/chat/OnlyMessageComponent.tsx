import { Input, Button, Avatar, Text } from "@nextui-org/react"
import { GiSurferVan } from "react-icons/gi"

const OnlyMessageComponent = ({ message }) => {

    return (
        <div className="w-full mt-[2%]">
        <div className="flex w-full">
            <div>
                <span>
                    <Text className="ml-[20px]">
                        {message.text} 
                    </Text>
                </span>
            </div>
        </div>
    </div>
    )
}

export default OnlyMessageComponent