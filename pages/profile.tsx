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
import ProductsTable from '../components/profilePage/manageProducts/Table';
import useRouterRefresh from '../lib/customHook/useRouterRefresh';
import { CgProfile } from "react-icons/cg"
import { FiUpload, FiLogOut } from "react-icons/fi"
import { AiOutlineShop, AiFillEdit } from "react-icons/ai"
import { User } from '../components/profilePage/UserNavbar';
import Link from "next/link"
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

    const [showComponent, setShowComponent] = useState("profileInfo")
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);

    const refresh = useRouterRefresh()

    const showTable = () => {
      refresh()
      .then(() => setShowComponent("manageProducts"))
    }

    const navigateProfilePage = (component: string) => {
      setOpened(false)
      setShowComponent(component)
    }

    const { data: session } = useSession()


    if (!session) {
        return (
            <div>
                <p>You need to be signed in...</p>
            </div>
        )
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
          <Navbar.Section grow>
            <ProfileButton 
              icon={<CgProfile size={25} />}
              label="View Profile"
              color="grape"
              onClick={() => navigateProfilePage("profileInfo")}
              />
          <ProfileButton 
              icon={<FiUpload size={25} />}
              label="Upload Product"
              color="green"
              onClick={() => navigateProfilePage("uploadProduct")}
              />
          <ProfileButton 
              icon={<AiOutlineShop size={25} />}
              label="Your Products"
              color="blue"
              onClick={() => navigateProfilePage("userProducts")}
              />
          <ProfileButton 
            icon={<AiFillEdit size={20} />}
            label="Manage products"
            color="blue"
            onClick={() => navigateProfilePage("manageProducts")}
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
        </Header>
      }
    >
        {showComponent === "profileInfo" && <ProfileInfo/>}
        {showComponent === "uploadProduct" && <UploadProduct showTable={showTable} />}
        {showComponent === "userProducts" && <UserProducts userProduct={props.userProducts} />}
        {showComponent === "manageProducts" && <ProductsTable products={props.userProducts} />}
    </AppShell>
  );
}
