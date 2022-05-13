import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function(req: NextApiRequest, res: NextApiResponse) {
    const { img } = req.body

    const session = await getSession({ req });
    const result = await prisma.user.update({
        where: { email: session.user.email },
        data: {
            image: img
        }
    })
    res.json(result)
}