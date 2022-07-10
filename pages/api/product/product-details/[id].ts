import prisma from "../../../../lib/prisma";

export default async function productDetails(req, res) {

    const productId = req.query.id

    try {
        const post = await prisma.post.findUnique({
            where: {
            id: productId,
            },
            include: {
            author: {
                select: { name: true, email: true, image: true },
            },
            },
        })

      res.json(post)

    } catch(error) {
        throw error
    }
}