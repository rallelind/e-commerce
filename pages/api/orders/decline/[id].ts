import { getSession } from "next-auth/react";
import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {

    const orderId = req.query.id

    const session = await getSession({ req });

    if (req.method === "DELETE" && session) {
        const order = await prisma.order.delete({
            where: { id: orderId },
        })
        res.json(order)
    }
}