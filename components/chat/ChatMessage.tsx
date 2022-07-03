import { Input, Button, Avatar, Text } from "@nextui-org/react"
import { GiSurferVan } from "react-icons/gi"

const ChatMessage = ({ message }) => {

    return (
        <div style={{ marginTop: "2%", width: "100%" }}>
        <div style={{ display: "flex", width: "100%" }}>
            <Avatar css={{ zIndex: "1" }} src={message.img} />
            <div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Text style={{ marginLeft: "20px", width: "100%" }} h4>
                        {message.name} 
                        <span style={{ marginLeft: "10px", fontWeight: "lighter", fontSize: "15px" }}>
                            {message.timeSent}
                        </span>
                    </Text> 
                </div>
                <span>
                    <Text style={{ marginLeft: "20px" }}>
                        {message.text} 
                    </Text>
                </span>
            </div>
        </div>
    </div>
    )
}

export default ChatMessage