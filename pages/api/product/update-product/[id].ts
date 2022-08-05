import { getSession } from "next-auth/react";
import prisma from "../../../../lib/prisma";

export default async function handle(req, res) {
    const postId = req.query.id
    const session = getSession({ req })
    if (req.method === "PUT" && session) {
        const { title, description, images, prices, features, dates } = req.body;
        const updateProduct = await prisma.post.update({
            where: { id: postId },
            data: {
                title: title,
                content: description,
                image: images,
                price: prices,
                dates: dates,
                features: features,
                startDate: new Date(dates[0]).toISOString(),
                endDate: new Date(dates[1]).toISOString(),
            }
        })
        res.json(updateProduct)
    } else {
        throw new Error(
            req.method !== "PUT" ? `The HTTP ${req.method} is not supported at this route` : "You are not authorized"
        )
    }
}