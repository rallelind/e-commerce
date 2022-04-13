import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
    const session = await getSession({ req })
    const userProducts= await prisma.post.findMany({
        where: {
            author: { email: session.user.email }
        },
        include: {
            author: {
                select: { name: true }
            },
        },
    });
    res.json(userProducts)
}