import { useState } from "react";
import dynamic from "next/dynamic"
import { GetServerSideProps } from "next";
import { User } from "../../../components/profilePage/UserNavbar";
import UserAppShell from "../../../components/profilePage/appShell/UserAppShell";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

const ChatComponent = dynamic(() => import('../../../components/chat/ChatComponent'), { ssr: false })

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const session = await getSession({ req })

    const userChannels = await prisma.order.findMany({
        where: { user: { email: session?.user?.email } },
        select: {
            chatChannel: true,
            id: true,
            accepted: true,
            product: { 
                select: {
                    author: {
                        select: { image: true, name: true, }
                    }
                }
             }
        }
    })

    return { props: { userChannels } }
}

export default function UserHost({ userChannels }) {

    const [openChat, setOpenChat] = useState(userChannels[0].chatChannel)

    const chatChannelOnclick = (userChannel) => {
        setOpenChat(userChannel.chatChannel)
    }

    return (
        <UserAppShell
            inbox
            navbar={
                <>
                    {userChannels.map(userChannel => (
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