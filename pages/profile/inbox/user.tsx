import { useState } from "react";
import dynamic from "next/dynamic"
import { GetServerSideProps } from "next";
import { User } from "../../../components/profilePage/UserNavbar";
import UserAppShell from "../../../components/profilePage/appShell/UserAppShell";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";
import { useQuery } from "react-query";

const ChatComponent = dynamic(() => import('../../../components/chat/ChatComponent'), { ssr: false })


export default function UserHost() {

    const [openChat, setOpenChat] = useState()

    const chatChannelOnclick = (userChannel) => {
        setOpenChat(userChannel.chatChannel)
    }

    const fetchUserOrders = async () => {
        const res = await fetch("/api/orders/chats/hostChannels")
        return res.json()
    }

    const { data, status } = useQuery("user-orders", fetchUserOrders)


    return (
        <UserAppShell
            inbox
            navbar={
                <>
                    {data.map(userChannel => (
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