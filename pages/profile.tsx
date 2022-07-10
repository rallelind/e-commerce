import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from "next"
import {
  AppShell,
  Navbar,
  Header,
  MediaQuery,
  Burger,
  useMantineTheme,
  Switch
} from '@mantine/core';
import dynamic from "next/dynamic"
import { Text, Loading, Divider } from '@nextui-org/react';
import { useSession, signOut } from 'next-auth/react';
const ProfileInfo = dynamic(() => import("../components/profilePage/profileInfo/ProfileInfo"), { ssr: false });
const UploadProduct = dynamic(() => import("../components/profilePage/uploadProduct/UploadProduct"), { ssr: false });
const UserProducts = dynamic(() => import("../components/profilePage/userProducts/UserProducts"), { ssr: false });
import ProfileButton from '../components/profilePage/ProfileButtons';
const ProductsTable = dynamic(() => import('../components/profilePage/manageProducts/Table'), { ssr: false });
const OrderedTrips = dynamic(() => import("../components/profilePage/orderedTrips/OrderedTrips"), { ssr: false })
const ProductOrders = dynamic(() => import("../components/profilePage/productOrders/ProductOrders"), { ssr: false });
import useRouterRefresh from '../lib/customHook/useRouterRefresh';
import { BiPurchaseTagAlt } from "react-icons/bi"
import { GiSurferVan } from "react-icons/gi"
import { CgProfile } from "react-icons/cg"
import { FiUpload, FiLogOut } from "react-icons/fi"
import { AiOutlineShop, AiFillEdit, AiOutlineMessage } from "react-icons/ai"
import { User } from '../components/profilePage/UserNavbar';
import Link from "next/link"
import { useRouter } from 'next/router';
import prisma from '../lib/prisma';
import { getSession } from 'next-auth/react';
import UserAppShell from '../components/profilePage/appShell/UserAppShell';


export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })

  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email },
    select: { stripeConnect: true, stripeConnectId: true, host: true }
  })

  const userOrders = await prisma.order.findMany({
    where: {
      user: { email: session?.user?.email }
    },
    select: {
      userSeen: true,
      startDate: true,
      endDate: true,
      accepted: true,
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
    select: {
      ownerSeen: true,
      startDate: true,
      endDate: true,
      user: {
        select: { image: true, name: true }
      },
      product: {
        select: { image: true, title: true, id: true }
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

  return { props: { user, userProducts, userOrders: JSON.parse(JSON.stringify(userOrders)), productOrders: JSON.parse(JSON.stringify(productOrders)) } }
}

export default function AppShellDemo(props) {

  useEffect(() => {

    props.productOrders.map((productOrder) => {
      if (productOrder.ownerSeen === false) {
        setOwnerSeen(false)
      } else {
        setOwnerSeen(true)
      }
    })

    props.userOrders.map((userOrder) => {
      if (userOrder.userSeen === false) {
        setUserSeen(false)
      } else {
        setUserSeen(true)
      }
    })

  }, [props.productOrders, props.userOrders])


  const router = useRouter()

  const [showComponent, setShowComponent] = useState("profileInfo")
  const [userSeen, setUserSeen] = useState(true)
  const [ownerSeen, setOwnerSeen] = useState(true)

  const refresh = useRouterRefresh()

  const showTable = () => {
    refresh()
      .then(() => setShowComponent("manageProducts"))
  }

  const navigateProfilePage = async (component: string) => {
    setShowComponent(component)

    if (component === "orderedTrips") {
      try {
        await fetch("/api/orders/hasSeen/userSeen")
      } catch (error) {
        console.log(error)
      } finally {
        setUserSeen(true)
      }
    }

    if (component === "productOrders") {
      try {
        await fetch("/api/orders/hasSeen/ownerSeen")
      } catch (error) {
        console.log(error)
      } finally {
        setOwnerSeen(true)
      }
    }
  }

  const { data: session } = useSession()

  if (!session) {
    return <h1>you need to be logged in to access the profile page...</h1>
  }

  const profileButtonsData = [
    { label: "View Profile", color: "grape", onClick: () => navigateProfilePage("profileInfo"), icon: <CgProfile size={25} />, ownerSeen: null, userSeen: null, host: null },
    { label: "Upload Product", color: "green", onClick: () => navigateProfilePage("uploadProduct"), icon: <FiUpload size={25} />, ownerSeen: null, userSeen: null, host: true },
    { label: "Your Products", color: "blue", onClick: () => navigateProfilePage("userProducts"), icon: <AiOutlineShop size={25} />, ownerSeen: null, userSeen: null, host: true },
    { label: "Manage Products", color: "blue", onClick: () => navigateProfilePage("manageProducts"), icon: <AiFillEdit size={20} />, ownerSeen: null, userSeen: null, host: true },
    { label: "Ordered Trips", color: "green", onClick: () => navigateProfilePage("orderedTrips"), icon: <GiSurferVan size={30} />, ownerSeen: null, userSeen: userSeen, host: false },
    { label: "Product orders", color: "green", onClick: () => navigateProfilePage("productOrders"), icon: <BiPurchaseTagAlt size={25} />, ownerSeen: ownerSeen, userSeen: null, host: true },
    { label: "Inbox", color: "grape", onClick: () => router.push("/inbox/user"), icon: <AiOutlineMessage size={25} />, ownerSeen: null, userSeen: null, host: false},
    { label: "Inbox", color: "grape", onClick: () => router.push("/inbox/host"), icon: <AiOutlineMessage size={25} />, ownerSeen: null, userSeen: null, host: true},
    { label: "Sign out", color: "red", onClick: () => signOut({ redirect: true, callbackUrl: "/" }), icon: <FiLogOut size={25} />, ownerSeen: null, userSeen: null, host: null },
  ]

  console.log(props.user)

  return (
    <UserAppShell
      inbox={false}
      userHostStatus={props.user.host}
      navbar={
        <>
          <Navbar.Section grow>
            {profileButtonsData.map((buttonData, i) => {
              if (!props.user.host && !buttonData.host) {
                return <ProfileButton
                  key={i}
                  label={buttonData.label}
                  color={buttonData.color}
                  onClick={buttonData.onClick}
                  icon={buttonData.icon}
                  ownerSeen={buttonData.ownerSeen}
                  userSeen={buttonData.userSeen}
                />
              }
              if (props.user.host && buttonData.host || buttonData.host === null) {
                return <ProfileButton
                  key={i}
                  label={buttonData.label}
                  color={buttonData.color}
                  onClick={buttonData.onClick}
                  icon={buttonData.icon}
                  ownerSeen={buttonData.ownerSeen}
                  userSeen={buttonData.userSeen}
                />
              }
            })}
          </Navbar.Section>
          <Navbar.Section>
            <Divider y={1} />
            <User
              avatar={session.user.image}
              userName={session.user.name}
              userData={session.user.email}
            />
          </Navbar.Section>
        </>
      }
    >
      {showComponent === "profileInfo" && <ProfileInfo />}
      {showComponent === "orderedTrips" && <OrderedTrips userOrders={props.userOrders} />}
      {showComponent === "uploadProduct" && <UploadProduct stripeConnect={props.user.stripeConnect} showTable={showTable} />}
      {showComponent === "userProducts" && <UserProducts userProduct={props.userProducts} />}
      {showComponent === "manageProducts" && <ProductsTable products={props.userProducts} />}
      {showComponent === "productOrders" && <ProductOrders productOrders={props.productOrders} />}
    </UserAppShell>
  );
}
