import { useState } from "react";
import dynamic from "next/dynamic"
import { User } from "../../../components/profilePage/UserNavbar";
import UserAppShell from "../../../components/profilePage/appShell/UserAppShell";
import { useQuery } from "react-query";
import { Loading } from "@nextui-org/react";


const ChatComponent = dynamic(() => import('../../../components/chat/ChatComponent'), { ssr: false })

export default function HostInbox() {

    const fetchProductOrders = async () => {
        const res = await fetch("/api/orders/chats/hostChannels")
        return res.json()
    }

    const { data, isLoading, isSuccess } = useQuery("product-orders", fetchProductOrders)

    console.log(data)

    const [openChat, setOpenChat] = useState(isSuccess && data[0].chatChannel)

    const chatChannelOnclick = (hostChannel) => {
        setOpenChat(hostChannel.chatChannel)
    }

    return (
        <UserAppShell 
            inbox
            navbar={
                <>
                    {isLoading ? <Loading /> :
                    data.map((hostChannel) => (
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