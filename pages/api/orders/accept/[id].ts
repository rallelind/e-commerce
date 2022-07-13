import { getSession } from "next-auth/react";
import prisma from "../../../../lib/prisma";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {

    const orderId = req.query.id

    const { startDate, endDate, productId } = req.body

    const session = await getSession({ req })

    let datesToExclude = []

    const getDatesInRange = (startDate, endDate) => {
        
        const date = new Date(startDate.getTime())

        while(date <= endDate) {
            datesToExclude.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }

    }

    getDatesInRange(new Date(startDate), new Date(endDate))

    console.log(datesToExclude)

    if(req.method === "PUT" && session) {
        const acceptOrder = await prisma.order.update({
            where: { id: orderId },
            select: { stripePaymentIntentId: true },
            data: {
                accepted: true,
                product: {
                    update: {
                        bookedDates: datesToExclude
                    },
                },
            },
        })
        try {
            res.json(acceptOrder)
        } catch(error) {
            console.log(error)
        } finally {
            await stripe.paymentIntents.capture(acceptOrder.stripePaymentIntentId)
        }
    }
}