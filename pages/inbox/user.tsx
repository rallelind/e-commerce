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

    const theme = useMantineTheme();

    const [opened, setOpened] = useState(false)
    const [openChat, setOpenChat] = useState(props.userChannels[0].chatChannel)
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

    const chatChannelOnclick = (userChannel) => {
        setOpenChat(userChannel.chatChannel)
        setOppositeUserData(userChannel.product.author)
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
                    {props.userChannels.map(userChannel => (
                        <div 
                            key={userChannel.id} 
                            onClick={() => chatChannelOnclick(userChannel)} 
                            onMouseEnter={() => setHoverMessage(userChannel.id)}
                            onMouseLeave={() => setHoverMessage("")}
                            className={`cursor-pointer mt-[5%] bg-${backGroundColor(userChannel.id, userChannel.chatChannel)} p-[5%] rounded-[5px]`}>

                            <User 
                                userData={userChannel.accepted ? "order accepted" : "awaiting approval"}
                                userName={userChannel.product.author.name}
                                avatar={userChannel.product.author.image}
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