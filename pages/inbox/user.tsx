import { useState } from "react";
import { 
    AppShell,
    Navbar,
    Header,
    MediaQuery,
    Burger,
    useMantineTheme,
} from "@mantine/core";
import { Text } from "@nextui-org/react";
import Link from "next/link"
import dynamic from "next/dynamic"
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma";
import { User } from "../../components/profilePage/UserNavbar";
import GoBackButton from "../../components/utils/GoBackBtn"
import UserAppShell from "../../components/profilePage/appShell/UserAppShell";

const ChatComponent = dynamic(() => import('../../components/chat/ChatComponent'), { ssr: false })

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

export default function UserHost(props) {

    const [opened, setOpened] = useState(false)
    const [openChat, setOpenChat] = useState(props.userChannels[0].chatChannel)

    const chatChannelOnclick = (userChannel) => {
        setOpenChat(userChannel.chatChannel)
    }

    const burgerOnclick = () => {
        setOpened(!opened)
    }

    return (
        <UserAppShell
            inbox
            burgerOnclick={burgerOnclick}
            opened={opened}
            navbar={
                <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 220, lg: 300 }}>
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
                </Navbar>
            }
        >
            <ChatComponent channelName={openChat} />
        </UserAppShell>
    )
}