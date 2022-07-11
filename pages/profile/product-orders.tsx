import ProductOrders from "../../components/profilePage/productOrders/ProductOrders";
import UserAppShell from "../../components/profilePage/appShell/UserAppShell";
import prisma from "../../lib/prisma";
import { getSession } from "next-auth/react";

export const getServerSideProps = async ({ req }) => {

    const session = await getSession({ req })

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
    
    return { 
        props: { 
            productOrders: JSON.parse(JSON.stringify(productOrders)) 
        } 
    }
}

export default function ProductOrder({ productOrders }) {

    return (
        <UserAppShell inbox={false} navbar={null}>
            {productOrders.length >= 1 ? <ProductOrders productOrders={productOrders} /> : <h1>You have no orders</h1>}
        </UserAppShell>
    )
}