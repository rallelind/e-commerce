import React, { useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  MediaQuery,
  Burger,
  useMantineTheme,
} from '@mantine/core';
import { useSession, signOut } from 'next-auth/react';
import ProfileInfo from "../components/ProfileInfo";
import UploadProduct from "../components/UploadProduct";
import UserProducts from "../components/UserProducts";
import ProfileButton from '../components/ProfileButtons';
import { CgProfile } from "react-icons/cg"
import { FiUpload, FiLogOut } from "react-icons/fi"
import { AiOutlineShop } from "react-icons/ai"

export default function AppShellDemo() {

    const [showComponent, setShowComponent] = useState(<ProfileInfo />)
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);

    const { data: session } = useSession()


    if (!session) {
        return (
            <div>
                <p>You need to be signed in...</p>
            </div>
        )
    }

    const handleClick = (component) => {
        setShowComponent(component)
        setOpened(false)
    }

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
          <ProfileButton 
            icon={<CgProfile size={25} />}
            label="View Profile"
            color="grape"
            onClick={() => handleClick(<ProfileInfo/>)}
            />
        <ProfileButton 
            icon={<FiUpload size={25} />}
            label="Upload Product"
            color="green"
            onClick={() => handleClick(<UploadProduct />)}
            />
        <ProfileButton 
            icon={<AiOutlineShop size={25} />}
            label="Your Products"
            color="blue"
            onClick={() => handleClick(<UserProducts />)}
            />
        <ProfileButton 
            icon={<FiLogOut size={25} />}
            label="Sign Out"
            color="red"
            onClick={() => signOut()}
            />
        </Navbar>
      }
      header={
        <Header height={70} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
          </div>
        </Header>
      }
    >
        {showComponent}
    </AppShell>
  );
}
