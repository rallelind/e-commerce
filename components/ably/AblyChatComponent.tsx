import { useEffect, useState } from "react"
import { useChannel } from "../../lib/customHook/useChannel"
import { Input, Button, Avatar, Text } from "@nextui-org/react"
import { useSession } from "next-auth/react"
import { GiSurferVan } from "react-icons/gi"

const AblyChatComponent = ({ channelName, oppositeUserData }) => {

    let inputBox = null
    let messageEnd = null

    const session = useSession()

    const [messageText, setMessageText] = useState("")
    const [receivedMessages, setReceivedMessages] = useState([])
    const messageTextIsEmpty = messageText.trim().length === 0;

    console.log(receivedMessages)

    const [channel, ably] = useChannel(`${channelName}`, (message) => {

        const history = receivedMessages.slice(-199)
        setReceivedMessages([...history, message])

    })

    console.log(channel)

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
        const timeOfMessage = new Date(message.timestamp).toLocaleTimeString(navigator.language, {
            hour: '2-digit',
            minute:'2-digit'
        })

        const latestMessage = receivedMessages[receivedMessages.length-1]
        const previousMessage = receivedMessages.length > 1 && receivedMessages[receivedMessages.length-2]

        const latestMessageAuthor = latestMessage.connectionId
        const previousMessageAuthor = previousMessage.connectionId

        const latestMessageTime = new Date(latestMessage.timestamp).getTime()
        const previousMessageTime = new Date(previousMessage.timestamp).getTime()

        const minuteDiff = Number(Math.abs(latestMessageTime - previousMessageTime) / (1000 * 60) % 60)


        return (
        <div key={index} style={{ marginTop: "2%", width: "100%" }}>
            <div style={{ display: "flex", width: "100%" }}>
                <Avatar css={{ zIndex: "1" }} src={author === "me" ? session.data.user.image : oppositeUserData.image} />
                <div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Text style={{ marginLeft: "20px", width: "100%" }} h4>
                            {author === "me" ? session.data.user.name : oppositeUserData.name} 
                            <span style={{ marginLeft: "10px", fontWeight: "lighter", fontSize: "15px" }}>
                                {timeOfMessage}
                            </span>
                        </Text> 
                    </div>
                    <span>
                        <Text style={{ marginLeft: "20px" }}>
                            {message.data} 
                        </Text>
                    </span>
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
            <div style={{ overflowY: "scroll", width: "75%", marginBottom: "10%" }}>
                    {messages}
            </div>
            
            <div style={{ position: "absolute", bottom: "30px" }}>
                <form onSubmit={handleFormSubmission}>
                    <div style={{ display: "flex" }}>
                        <Input 
                            width="400px"
                            css={{ backgroundColor: "white" }}
                            ref={(element) => { inputBox = element; }}
                            size="md" 
                            placeholder="Write a message"
                            color="default"
                            bordered
                            value={messageText}
                            onKeyDown={handleKeyPress}
                            onChange={e => setMessageText(e.target.value)}
                            contentRight={
                                <GiSurferVan />
                            }
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