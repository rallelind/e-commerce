import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function manageProducts(req, res) {

    const session = await getSession({ req })

    if(session) {

        try {
            const userProducts= await prisma.post.findMany({
                where: {
                    author: { email: session?.user.email }
                },
                include: {
                    author: {
                        select: { name: true }
                    },
                },
            });

            res.json(userProducts)

        } catch(error) {
            throw error
        }

    }
}