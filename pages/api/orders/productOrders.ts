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
            id: true,
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

          res.json(productOrders)

    } catch(error) {
        throw error
    }
}