import { useEffect, useState } from "react"
import { useChannel } from "../../lib/customHook/useChannel"

const AblyChatComponent = ({ channelName }) => {

    let inputBox = null
    let messageEnd = null

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
        return <span key={index} data-author={author}>{message.data}</span>;
      });

      useEffect(() => {
        messageEnd.scrollIntoView({ behaviour: "smooth" });
      });

    return (
        <div>
            {messages}
            <div ref={(element) => { messageEnd = element; }}></div>
        </div>
    )
}

export default AblyChatComponent