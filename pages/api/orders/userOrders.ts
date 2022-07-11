import prisma from "../../../lib/prisma";
import { getSession } from 'next-auth/react';

export default async function userOrders(req, res) {
    
    const session = await getSession({ req })

    try {
        const userOrders = await prisma.order.findMany({
            where: {
            user: { email: session?.user?.email }
            },
            select: {
                userSeen: true,
            }
        })

        res.json(userOrders)

    } catch(error) {
        throw error
    }
}