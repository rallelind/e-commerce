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
import { Text, Loading } from '@nextui-org/react';
import { useSession, signOut } from 'next-auth/react';
import ProfileInfo from "../components/profilePage/profileInfo/ProfileInfo";
import UploadProduct from "../components/profilePage/uploadProduct/UploadProduct";
import UserProducts from "../components/profilePage/userProducts/UserProducts";
import ProfileButton from '../components/profilePage/ProfileButtons';
import ProductsTable from '../components/profilePage/manageProducts/Table';
import OrderedTrips from "../components/profilePage/orderedTrips/OrderedTrips"
import ProductOrders from "../components/profilePage/productOrders/ProductOrders";
import useRouterRefresh from '../lib/customHook/useRouterRefresh';
import { BiPurchaseTagAlt } from "react-icons/bi"
import { GiSurferVan } from "react-icons/gi"
import { CgProfile } from "react-icons/cg"
import { FiUpload, FiLogOut } from "react-icons/fi"
import { AiOutlineShop, AiFillEdit } from "react-icons/ai"
import { User } from '../components/profilePage/UserNavbar';
import Link from "next/link"
import { useRouter } from 'next/router';
import prisma from '../lib/prisma';
import { getSession } from 'next-auth/react';



export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req })

    const userOrders = await prisma.order.findMany({
      where: {
        user: { email: session?.user?.email }
      },
      include: {
        product: {
          select: { image: true }
        }
      }
    })

    const productOrders = await prisma.order.findMany({
      where: {
        product: { author: { email: session?.user?.email } },
        accepted: false,
      },
      include: {
        user: {
          select: { image: true, name: true }
        },
        product: {
          select: { image: true, title: true }
        }
      }
    })

    const userProducts = await prisma.post.findMany({
      where: {
          author: { email: session?.user?.email }
      },
      include: {
          author: {
              select: { name: true }
          },
      },
  });
  
  return { props: { userProducts, userOrders, productOrders } }
}

export default function AppShellDemo(props) {

    const router = useRouter()

    console.log(props.productOrders)

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
            icon={<GiSurferVan size={30} />}
            label="Ordered trips"
            color="grape"
            onClick={() => navigateProfilePage("orderedTrips")}
          />
          <ProfileButton 
            icon={<BiPurchaseTagAlt size={25} />}
            label="Product orders"
            color="green"
            onClick={() => navigateProfilePage("productOrders")}
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
        {showComponent === "orderedTrips" && <OrderedTrips userOrders={props.userOrders} />}
        {showComponent === "uploadProduct" && <UploadProduct showTable={showTable} />}
        {showComponent === "userProducts" && <UserProducts userProduct={props.userProducts} />}
        {showComponent === "manageProducts" && <ProductsTable products={props.userProducts} />}
        {showComponent === "productOrders" && <ProductOrders productOrders={props.productOrders} />}
    </AppShell>
  );
}
