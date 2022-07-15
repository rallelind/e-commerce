import { getSession } from "next-auth/react";
import prisma from "../../../../lib/prisma";

export default async function orderChannels(req, res) {

    const session = await getSession({ req })

    if(session) {

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

        }catch(error) {
            throw error
        }
        
        
    }
}