import { Input, Button, Avatar, Text } from "@nextui-org/react"
import { GiSurferVan } from "react-icons/gi"

const ChatMessage = ({ message }) => {

    return (
        <div className="w-full mt-[2%]">
        <div className="flex w-full">
            <Avatar css={{ zIndex: "1" }} src={message.img} />
            <div>
                <div className="flex items-center">
                    <Text className="ml-[20px] w-full font-semibold" h4>
                        {message.name} 
                        <span className="ml-[10px] font-light text-sm">
                            {message.timeSent}
                        </span>
                    </Text> 
                </div>
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

export default ChatMessage