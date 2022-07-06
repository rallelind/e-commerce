import {
  AppShell,
  Header,
  MediaQuery,
  Burger,
  useMantineTheme,
} from "@mantine/core";
import GoBackBtn from "../../utils/GoBackBtn";
import HomeLink from "./HomeLink";
import SwitchUserRole from "./SwitchUserRole";

const UserAppShell = ({ children, inbox, navbar, opened, burgerOnclick }) => {
  const theme = useMantineTheme();

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
      navbar={navbar}
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
              <SwitchUserRole />
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
