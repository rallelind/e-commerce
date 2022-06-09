import prisma from "../../../../lib/prisma";
import { getSession } from "next-auth/react";

export default async function handle(req, res) {

    const session = await getSession({ req })

    const updateUserSeen = await prisma.order.updateMany({
        where: { user: { email: session.user.email }, userSeen: false },
        data: {
            userSeen: true
        }
    })

    res.json(updateUserSeen)
}