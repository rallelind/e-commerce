import { getSession } from "next-auth/react";
import prisma from "../../../../../lib/prisma";

export default async function bookingDetails(req, res) {

    const session = await getSession({ req })

    const productId = req.query.id

    try {
        const post = await prisma.post.findUnique({
            where: { 
                  id: productId, 
              },
              select: { 
                  image: true, price: true, title: true, id: true, authorId: true,
              },
          });

        res.json(post)
        
    } catch(error) {
        throw error
    }

}