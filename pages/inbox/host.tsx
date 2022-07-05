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
import Link from "next/link"
import dynamic from "next/dynamic"
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import prisma from "../../lib/prisma";
import { User } from "../../components/profilePage/UserNavbar";
import GoBackButton from "../../components/utils/GoBackBtn"

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

    const theme = useMantineTheme();

    const [opened, setOpened] = useState(false)
    const [openChat, setOpenChat] = useState(props.hostChannels[0].chatChannel)
    const [oppositeUserData, setOppositeUserData] = useState()
    const [hoverMessage, setHoverMessage] = useState("")

    const backGroundColor = (id, chatChannel) => {
        if (id === hoverMessage) {
            return theme.colors.gray[1]
        }
        if (chatChannel === openChat) {
            return theme.colors.gray[1]
        }
    }

    const chatChannelOnclick = (hostChannel) => {
        setOpenChat(hostChannel.chatChannel)
        setOppositeUserData(hostChannel.user)
    }

    return (
        <AppShell
            styles={{
                main: {
                background: theme.colors.gray[0],
                },
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            fixed
            navbar={
                <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 220, lg: 300 }}>
                    {props.hostChannels.map((hostChannel) => (
                        <div 
                            onClick={() => chatChannelOnclick(hostChannel)} 
                            key={hostChannel.id}
                            onMouseEnter={() => setHoverMessage(hostChannel.id)}
                            onMouseLeave={() => setHoverMessage("")}
                            className={`cursor-pointer mt-[5%] hover:bg-[#f1f3f5] bg-${hostChannel.chatChannel === openChat && "[#f1f3f5]"} p-[5%] rounded-[5px]`}
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
            header={
                <Header height={70} p="md">
                    <div className="flex justify-between items-center h-full">
            <div>
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((open) => !open)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>
              <Text
                h4
                css={{
                  textGradient: "112deg, #06B7DB -63.59%, #FF4ECD -20.3%, #0072F5 70.46%"
                }}
              >
                <GoBackButton />
              </Text>
            </div>
            </div>
            </Header>
        }
        >
            <ChatComponent channelName={openChat} />
        </AppShell>
    )
}