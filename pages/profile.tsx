import React, { ReactComponentElement, useState } from 'react';
import { GetServerSideProps } from "next"
import {
  AppShell,
  Navbar,
  Header,
  MediaQuery,
  Burger,
  useMantineTheme,
} from '@mantine/core';
import { Text } from '@nextui-org/react';
import { useSession, signOut } from 'next-auth/react';
import ProfileInfo from "../components/profilePage/profileInfo/ProfileInfo";
import UploadProduct from "../components/profilePage/uploadProduct/UploadProduct";
import UserProducts from "../components/profilePage/userProducts/UserProducts";
import ProfileButton from '../components/profilePage/ProfileButtons';
import { CgProfile } from "react-icons/cg"
import { FiUpload, FiLogOut } from "react-icons/fi"
import { AiOutlineShop } from "react-icons/ai"
import { User } from '../components/profilePage/UserNavbar';
import Link from "next/link"
import { useRouter } from 'next/router';
import prisma from '../lib/prisma';
import { getSession } from 'next-auth/react';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req })
    const userProducts= await prisma.post.findMany({
      where: {
          author: { email: session.user.email }
      },
      include: {
          author: {
              select: { name: true }
          },
      },
  });
  return { props: { userProducts } }
}

export default function AppShellDemo(props) {

    const [showComponent, setShowComponent] = useState(<ProfileInfo />)
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);

    const router = useRouter()

    const { data: session } = useSession()


    if (!session) {
        return (
            <div>
                <p>You need to be signed in...</p>
            </div>
        )
    }

    const handleClick = (component: ReactComponentElement<any>) => {
        setShowComponent(component)
        setOpened(false)
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
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
          <Navbar.Section grow>
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
              onClick={() => handleClick(<UserProducts userProduct={props.userProducts} />)}
              />
          <ProfileButton 
              icon={<FiLogOut size={25} />}
              label="Sign Out"
              color="red"
              onClick={() => signOut({redirect: true, callbackUrl: "/"})}
              />
          </Navbar.Section>
          <Navbar.Section>
            <User
              avatar={session.user.image}
              userName={session.user.name}
              userEmail={session.user.email}
            />
          </Navbar.Section>
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
            <Text
                h4
                css={{
                    textGradient: '45deg, $blue500 -20%, $pink500 50%'
                }}
            >
                <Link href="/">
                    <a>
                        Home
                    </a>
                </Link>
            </Text>
          </div>
        </Header>
      }
    >
        {showComponent}
    </AppShell>
  );
}
