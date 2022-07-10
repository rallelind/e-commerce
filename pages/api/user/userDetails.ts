import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

export default async function user(req, res) {

    const session = await getSession({ req })

    try {
        const user = await prisma.user.findUnique({
            where: { email: session?.user?.email },
            select: { stripeConnect: true, stripeConnectId: true, host: true }
          })

        res.json(user)  

    } catch(error) {
        throw error
    }
}