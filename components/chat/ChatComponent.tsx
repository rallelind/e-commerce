import { useEffect, useState, useRef } from "react"
import { Input } from "@nextui-org/react"
import { useSession } from "next-auth/react"
import { GiSurferVan } from "react-icons/gi"
import ChatMessage from "./ChatMessage"

import firebase from 'firebase/compat/app'; 
import { collection, query, where, getFirestore, orderBy, limit, addDoc, Timestamp } from 'firebase/firestore';

import { useCollectionData } from "react-firebase-hooks/firestore"

const app = firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
})

const db = getFirestore(app);

const ChatComponent = ({ channelName }) => {

    let messageEnd = null

    const session = useSession()

    const messagesRef = collection(db, 'messages')
    const channelQuery = query(messagesRef, where("channelName", "==", channelName));

    const [messages] = useCollectionData(channelQuery);

    const sortedArray = messages && messages.sort((a,b) => a.createdAt.seconds > b.createdAt.seconds ? 1 : -1)
    

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
                {sortedArray && sortedArray.map((msg, index) => <ChatMessage message={msg} key={index} />)}
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