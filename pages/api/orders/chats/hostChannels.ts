import { getSession } from "next-auth/react"
import prisma from "../../../../lib/prisma"

export default async function hostChannels(req, res) {

    const session = await getSession({ req })

    if(session) {
        try {
            const hostChannels = await prisma.order.findMany({
                where: {
                    product: { author: { email: session?.user?.email } }
                },
                select: {
                    chatChannel: true,
                    accepted: true,
                    id: true,
                    user: {
                        select: { image: true, name: true }
                    }
                    
                }
            })

            res.json(hostChannels)

        } catch(error) {
            throw error
        }
    }

}