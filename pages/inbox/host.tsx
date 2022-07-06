import { useState } from "react";
import { 
    AppShell,
    Navbar,
    Header,
    MediaQuery,
    Burger,
    useMantineTheme
} from "@mantine/core";
import { Text } from "@nextui-org/react";
import dynamic from "next/dynamic"
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import prisma from "../../lib/prisma";
import { User } from "../../components/profilePage/UserNavbar";
import GoBackButton from "../../components/utils/GoBackBtn"
import UserAppShell from "../../components/profilePage/appShell/UserAppShell";

const ChatComponent = dynamic(() => import('../../components/chat/ChatComponent'), { ssr: false })

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

export default function HostInbox(props) {

    const [opened, setOpened] = useState(false)
    const [openChat, setOpenChat] = useState(props.hostChannels[0].chatChannel)

    const chatChannelOnclick = (hostChannel) => {
        setOpenChat(hostChannel.chatChannel)
    }

    const burgerOnclick = () => {
        setOpened(!opened)
    }

    return (
        <UserAppShell 
            burgerOnclick={burgerOnclick}
            opened={opened}
            inbox
            navbar={
                <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 220, lg: 300 }}>
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
                </Navbar>
            }
        >
            <ChatComponent channelName={openChat} />
        </UserAppShell>
    )
}