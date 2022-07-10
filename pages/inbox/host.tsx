import { useState } from "react";
import dynamic from "next/dynamic"
import { GetServerSideProps } from "next";
import { User } from "../../components/profilePage/UserNavbar";
import UserAppShell from "../../components/profilePage/appShell/UserAppShell";

const ChatComponent = dynamic(() => import('../../components/chat/ChatComponent'), { ssr: false })

export const getServerSideProps: GetServerSideProps = async({req}) => {

    const hostChannelsRes = await fetch(`${process.env.ENVIRONMENT}/api/chatChannel/hostChannels`) 
    const hostChannels = hostChannelsRes.json()

    return { props: { hostChannels } }
}

export default function HostInbox(props) {

    const [openChat, setOpenChat] = useState(props.hostChannels[0].chatChannel)

    const chatChannelOnclick = (hostChannel) => {
        setOpenChat(hostChannel.chatChannel)
    }

    return (
        <UserAppShell 
            userHostStatus={null}
            inbox
            navbar={
                <>
                    {props.hostChannels.map((hostChannel) => (
                        <div 
                            onClick={() => chatChannelOnclick(hostChannel)} 
                            key={hostChannel.id}
                            className={`cursor-pointer mt-[5%] hover:bg-[#f1f3f5] ${hostChannel.chatChannel === openChat && "bg-[#f1f3f5]"} p-[5%] rounded-[5px]`}
                        >
                            <User 
                                userData={hostChannel.accepted ? "order accepted" : "order needs confirmation"}
                                userName={hostChannel.user.name}
                                avatar={hostChannel.user.image}
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