import { useEffect, useState, useRef } from "react"
import { useChannel } from "../../lib/customHook/useChannel"
import { Input, Button, Avatar, Text } from "@nextui-org/react"
import { useSession } from "next-auth/react"
import { GiSurferVan } from "react-icons/gi"
import ChatMessage from "./ChatMessage"

import firebase from 'firebase/compat/app'; 
import { collection, query, where, getFirestore, orderBy, limit, addDoc, Timestamp } from 'firebase/firestore';

import { useCollectionData } from "react-firebase-hooks/firestore"

const app = firebase.initializeApp({
    apiKey: "AIzaSyDVebTnjyXGJy6sM1-vJVYWu3ehIY7qt2I",
    authDomain: "vanli-7f181.firebaseapp.com",
    projectId: "vanli-7f181",
    storageBucket: "vanli-7f181.appspot.com",
    messagingSenderId: "1079732229579",
    appId: "1:1079732229579:web:914a732fb08bfe7f11d24e",
    measurementId: "G-FZL6Q30E37"
})

const db = getFirestore(app);

const ChatComponent = ({ channelName }) => {

    let messageEnd = null

    const session = useSession()

    const messagesRef = collection(db, 'messages')
    const channelQuery = query(messagesRef, where("channelName", "==", channelName));

    const [messages] = useCollectionData(channelQuery);

    

    useEffect(() => {
        messageEnd.scrollIntoView({ behaviour: "smooth" });
      });

    const [messageText, setMessageText] = useState("")

    const handleFormSubmission = async (event) => {
        event.preventDefault()

        const currentTime = new Date().toLocaleTimeString(navigator.language, {
            hour: '2-digit',
            minute:'2-digit'
        })

        await addDoc(messagesRef, {
            text: messageText,
            name: session.data.user.name,
            createdAt: Timestamp.now(),
            channelName: channelName,
            timeSent: currentTime,
            img: session.data.user.image
        })

        setMessageText("")
    }

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ overflowY: "scroll", width: "75%", marginBottom: "10%" }}>
                {messages && messages.map((msg, index) => <ChatMessage message={msg} key={index} />)}
            </div>
            
            <div style={{ position: "absolute", bottom: "30px" }}>
                <form onSubmit={handleFormSubmission}>
                    <div style={{ display: "flex" }}>
                        <Input 
                            width="400px"
                            css={{ backgroundColor: "white" }}
                            size="md" 
                            placeholder="Write a message"
                            color="default"
                            bordered
                            value={messageText}
                            contentRight={
                                <GiSurferVan />
                            }
                            onChange={e => setMessageText(e.target.value)}
                        />
                        <button style={{ display: "none" }} type="submit"></button>
                    </div>
                </form>
                <div ref={(element) => { messageEnd = element; }}></div>
            </div>
        </div>
    )
}

export default ChatComponent