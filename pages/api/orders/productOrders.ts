import prisma from "../../../lib/prisma";
import { getSession } from 'next-auth/react';

export default async function productOrders(req, res) {

    const session = await getSession({ req })

    try {
        
        const productOrders = await prisma.order.findMany({
            where: {
              product: { author: { email: session?.user?.email } },
              accepted: false,
            },
            select: {
              ownerSeen: true,
            }
          
          })

          res.json(productOrders)

    } catch(error) {
        throw error
    }
}