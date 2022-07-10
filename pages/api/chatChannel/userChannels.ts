import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function userChannels(req, res) {

    const session = await getSession({ req })

    try {
        const userChannels = await prisma.order.findMany({
            where: { user: { email: session?.user?.email } },
            select: {
                chatChannel: true,
                id: true,
                accepted: true,
                product: { 
                    select: {
                        author: {
                            select: { image: true, name: true, }
                        }
                    }
                 }
            }
        })
        res.json(userChannels)
    } catch(error) {
        throw error
    }

}