import { useEffect, useState } from "react"
import { useChannel } from "../../lib/customHook/useChannel"
import { Input, Button, Avatar, Text } from "@nextui-org/react"
import { useSession } from "next-auth/react"

const AblyChatComponent = ({ channelName, oppositeUserData }) => {

    let inputBox = null
    let messageEnd = null

    const session = useSession()

    const [messageText, setMessageText] = useState("")
    const [receivedMessages, setReceivedMessages] = useState([])
    const messageTextIsEmpty = messageText.trim().length === 0;


    const [channel, ably] = useChannel(channelName, (message) => {

        const history = receivedMessages.slice(-199)
        setReceivedMessages([...history, message])

    })

    const sendChatMessage = (messageText) => {
        channel.publish({ name: "chat-message", data: messageText });
        setMessageText("");
        inputBox.focus();
      }

    const handleFormSubmission = (event) => {
        event.preventDefault()
        sendChatMessage(messageText)
    }

    const handleKeyPress = (event) => {
        if (event.charCode !== 13 || messageTextIsEmpty) {
            return
        }
        sendChatMessage(messageText)
        event.preventDefault()
    }

    const messages = receivedMessages.map((message, index) => {
        const author = message.connectionId === ably.connection.id ? "me" : "other";
        return (
        <div key={index} style={{ marginTop: "2%", width: "100%" }}>
            <div style={{ display: "flex", width: "100%" }}>
                <Avatar css={{ zIndex: "1" }} src={author === "me" ? session.data.user.image : oppositeUserData.image} />
                <div>
                    <Text style={{ marginLeft: "20px", width: "100%" }} h4>{author === "me" ? session.data.user.name : oppositeUserData.name}</Text>
                    <span><Text style={{ marginLeft: "20px" }}>
                        {message.data}
                    </Text></span>
                </div>
            </div>

        </div>
        );
      });

      useEffect(() => {
        messageEnd.scrollIntoView({ behaviour: "smooth" });
      });

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ overflowY: "scroll", width: "75%", marginBottom: "5%" }}>
                    {messages}
            </div>
            
            <div style={{ position: "absolute", bottom: "10px" }}>
                <form onSubmit={handleFormSubmission}>
                    <div style={{ display: "flex" }}>
                        <Input 
                            ref={(element) => { inputBox = element; }}
                            size="md" 
                            placeholder="Write a message"
                            status="primary"
                            color="primary"
                            value={messageText}
                            onKeyDown={handleKeyPress}
                            onChange={e => setMessageText(e.target.value)}
                        />
                        <button style={{ display: "none" }} type="submit" disabled={messageTextIsEmpty}></button>
                    </div>
                </form>
                <div ref={(element) => { messageEnd = element; }}></div>
            </div>
        </div>
    )
}

export default AblyChatComponent