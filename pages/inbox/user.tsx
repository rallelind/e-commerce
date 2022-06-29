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

export default function UserHost() {

    const theme = useMantineTheme();

    const [opened, setOpened] = useState(false)

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

        </AppShell>
    )
}