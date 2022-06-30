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

const AblyChatComponent = dynamic(() => import('../../components/ably/AblyChatComponent'), { ssr: false })

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req })

    const userChannels = await prisma.order.findMany({
        where: { user: { email: session?.user?.email } },
        select: {
            chatChannel: true,
            id: true,
            accepted: true,
            user: { 
                select: {
                    image: true, name: true,
                }
             }
        }
    })

    return { props: { userChannels } }
}

export default function UserHost(props) {

    const theme = useMantineTheme();

    const [opened, setOpened] = useState(false)
    const [openChat, setOpenChat] = useState("")
    const [hoverMessage, setHoverMessage] = useState("")

    const backGroundColor = (id, chatChannel) => {
        if (id === hoverMessage) {
            return theme.colors.gray[1]
        }
        if (chatChannel === openChat) {
            return theme.colors.gray[1]
        }
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
                            onClick={() => setOpenChat(userChannel.chatChannel)} 
                            onMouseEnter={() => setHoverMessage(userChannel.id)}
                            onMouseLeave={() => setHoverMessage("")}
                            style={{ 
                                cursor: "pointer", 
                                marginTop: "5%",  
                                backgroundColor: backGroundColor(userChannel.id, userChannel.chatChannel),
                                padding: "5%",
                                borderRadius: "5px",
                            }}>
                            <User 
                                userData={userChannel.accepted ? "order accepted" : "awaiting approval"}
                                userName={userChannel.user.name}
                                avatar={userChannel.user.image}
                            />
                        </div>
                    ))}
                </Navbar>
            }
            header={
                <Header height={70} p="md">
                    <div style={{ display: 'flex', justifyContent: "space-between", alignItems: 'center', height: '100%' }}>
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
                <Link href="/">
                  <a>
                    Home
                  </a>
                </Link>
              </Text>
            </div>
            </div>
            </Header>
        }
        >
            <AblyChatComponent channelName={openChat} />
        </AppShell>
    )
}