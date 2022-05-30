import { getSession } from "next-auth/react";
import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {

    const orderId = req.query.id

    const { startDate, endDate, productId } = req.body

    const session = await getSession({ req })

    if(req.method === "PUT" && session) {
        const acceptOrder = await prisma.order.update({
            where: { id: orderId },
            data: {
                accepted: true,
                product: {
                    update: {
                        bookedDates: [startDate, endDate]
                    },
                },
            },
        })

        res.json(acceptOrder)
    }
}