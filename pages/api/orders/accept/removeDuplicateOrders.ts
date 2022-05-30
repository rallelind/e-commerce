import prisma from "../../../../lib/prisma";
import { getSession } from "next-auth/react";

export default async function (req, res) {

    const { startDate, endDate, productId } = req.body

    const session = await getSession({ req })

    const acceptedStartDate = new Date(startDate)

    const acceptedEndDate = new Date(endDate)

    if(req.method === "DELETE" && session) {

        const deleteDuplicateOrders = await prisma.order.deleteMany({
            where: { 
                productId: productId, 
                accepted: false,  
                startDate: {
                    lte: acceptedEndDate,   
                },
                endDate: {
                    gte: acceptedStartDate,
                }
            }
        })

        res.json(deleteDuplicateOrders)
        
    } else {
        throw new Error(
            req.method !== "DELETE" ? `The HTTP ${req.method} is not supported at this route` : "You are not authorized"
        )
    }
}