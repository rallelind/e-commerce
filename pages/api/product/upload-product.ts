import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { title, description, images, prices, features, dates } = req.body;
    //
    const session = await getSession({ req })
    const result = await prisma.post.create({
        data: {
            title: title,
            content: description,
            image: images,
            price: prices,
            dates: dates,
            startDate: new Date(dates[0]).toISOString(),
            endDate: new Date(dates[1]).toISOString(),
            features: features,
            author: { connect: { email: session?.user?.email } },
        },
    })
    res.json(result)
}