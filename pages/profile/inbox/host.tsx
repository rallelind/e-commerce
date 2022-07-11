import { useState } from "react";
import dynamic from "next/dynamic"
import { GetServerSideProps } from "next";
import { User } from "../../../components/profilePage/UserNavbar";
import UserAppShell from "../../../components/profilePage/appShell/UserAppShell";
import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

const ChatComponent = dynamic(() => import('../../../components/chat/ChatComponent'), { ssr: false })

export const getServerSideProps: GetServerSideProps = async({req}) => {

    const session = await getSession({ req })

    const hostChannels = await prisma.order.findMany({
        where: {
            product: { author: { email: session?.user?.email } }
        },
        select: {
            chatChannel: true,
            accepted: true,
            id: true,
            user: {
                select: { image: true, name: true }
            }
            
        }
    })

    return { props: { hostChannels } }
}

export default function HostInbox({ hostChannels }) {

    const [openChat, setOpenChat] = useState(hostChannels[0].chatChannel)

    const chatChannelOnclick = (hostChannel) => {
        setOpenChat(hostChannel.chatChannel)
    }

    return (
        <UserAppShell 
            inbox
            navbar={
                <>
                    {hostChannels.map((hostChannel) => (
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