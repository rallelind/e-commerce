import prisma from "../../../../lib/prisma";
import { getSession } from "next-auth/react";

export default async function handle(req, res) {
    const postId = req.query.id;
    const session = await getSession({ req })
    if (req.method === "DELETE" && session) {
        const post = await prisma.post.delete({
            where: { id: postId },
            include: {
                author: {
                    select: { email: true }
                },
            },
        });
        if(session?.user?.email === post.author.email) {
            res.json(post)
        } else {
            throw new Error("ERROR!")
        }
    } else {
        throw new Error(
            req.method !== "DELETE" ? `The HTTP ${req.method} is not supported at this route` : "You are not authorized"
        )
    }
}