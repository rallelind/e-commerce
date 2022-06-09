import prisma from "../../../../lib/prisma";
import { getSession } from "next-auth/react";

export default async function handle(req, res) {

    const session = await getSession({ req })

    const updateUserSeen = await prisma.order.updateMany({
        where: { product: { author: { email: session.user.email } }, ownerSeen: false },
        data: {
            ownerSeen: true
        }
    })

    res.json(updateUserSeen)
}