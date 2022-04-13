import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { title, description, images, prices } = req.body;

    const session = await getSession({ req })
    const result = await prisma.post.create({
        data: {
            title: title,
            content: description,
            price: prices,
            image: images,
            author: { connect: { email: session?.user?.email } },
        },
    })
    res.json(result)
    console.log(result)
}