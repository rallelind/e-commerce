import { useState } from "react";
import dynamic from "next/dynamic"
import { GetServerSideProps } from "next";
import { User } from "../../components/profilePage/UserNavbar";
import UserAppShell from "../../components/profilePage/appShell/UserAppShell";

const ChatComponent = dynamic(() => import('../../components/chat/ChatComponent'), { ssr: false })

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const userChannelsRes = await fetch(`${process.env.ENVIRONMANT}/api/chatChannel/userChannels`)
    const userChannels = await userChannelsRes.json()

    return { props: { userChannels } }
}

export default function UserHost(props) {

    const [openChat, setOpenChat] = useState(props.userChannels[0].chatChannel)

    const chatChannelOnclick = (userChannel) => {
        setOpenChat(userChannel.chatChannel)
    }

    return (
        <UserAppShell
            userHostStatus={null}
            inbox
            navbar={
                <>
                    {props.userChannels.map(userChannel => (
                        <div 
                            key={userChannel.id} 
                            onClick={() => chatChannelOnclick(userChannel)} 
                            className={`cursor-pointer mt-[5%] hover:bg-[#f1f3f5] ${userChannel.chatChannel === openChat && "bg-[#f1f3f5]"} p-[5%] rounded-[5px]`}>

                            <User 
                                userData={userChannel.accepted ? "order accepted" : "awaiting approval"}
                                userName={userChannel.product.author.name}
                                avatar={userChannel.product.author.image}
                            />
                        </div>
                    ))}
                </>
            }
        >
            <ChatComponent channelName={openChat} />
        </UserAppShell>
    )
}