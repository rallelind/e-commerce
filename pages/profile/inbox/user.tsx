import { useState } from "react";
import dynamic from "next/dynamic"
import { User } from "../../../components/profilePage/UserNavbar";
import UserAppShell from "../../../components/profilePage/appShell/UserAppShell";
import { useQuery } from "react-query";
import { Loading } from "@nextui-org/react";

const ChatComponent = dynamic(() => import('../../../components/chat/ChatComponent'), { ssr: false })


export default function UserHost() {


    const fetchUserOrders = async () => {
        const res = await fetch("/api/orders/chats/orderChannels")
        return res.json()
    }

    const { data, isLoading, isSuccess } = useQuery("user-orders", fetchUserOrders)

    const [openChat, setOpenChat] = useState(isSuccess && data[0].chatChannel)

    const chatChannelOnclick = (userChannel) => {
        setOpenChat(userChannel.chatChannel)
    }


    console.log(data)


    return (
        <UserAppShell
            inbox
            navbar={
                <>
                    {isLoading ? <Loading /> : 
                    data.map(userChannel => (
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