import {
  AppShell,
  Header,
  MediaQuery,
  Burger,
  useMantineTheme,
  Navbar
} from "@mantine/core";
import { useState } from "react";
import GoBackBtn from "../../utils/GoBackBtn";
import HomeLink from "./HomeLink";
import SwitchUserRole from "./SwitchUserRole";
import ProfileNavbar from "./ProfileNavbar";
import { useSession } from "next-auth/react";

const UserAppShell = ({ children, inbox, navbar }) => {

  const theme = useMantineTheme();

  const [opened, setOpened] = useState(false)

  const burgerOnclick = () => {
    setOpened(!opened)
  }

  const session = useSession()

  if (!session) {
    return <h1>you need to be logged in to access the profile page...</h1>
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
        <Navbar onClick={burgerOnclick} p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 220, lg: 300 }}>
          {inbox ? navbar : <ProfileNavbar userHost={false} />}
        </Navbar>
      }
      header={
        <Header height={70} p="md">
          <div className="flex justify-between items-center h-full">
            <div>
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Burger
                  opened={opened}
                  onClick={burgerOnclick}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>
                {inbox ? <GoBackBtn /> : <HomeLink />}
            </div>
            {!inbox && (
              <SwitchUserRole userHostStatus={true} />
            )}
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};

export default UserAppShell;