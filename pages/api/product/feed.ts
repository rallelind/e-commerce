import prisma from "../../../lib/prisma";

export default async function feed(req, res) {

    try {
        const feed = await prisma.post.findMany({
            where: { 
              published: true,
            },
            include: {
              author: {
                select: { name: true, email: true },
              },
            },
          });
        res.json(feed)
    } catch(error) {
        throw error
    }
}