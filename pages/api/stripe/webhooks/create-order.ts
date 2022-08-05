import { buffer } from "micro"
import { getSession } from "next-auth/react"
import prisma from "../../../../lib/prisma"

export const config = { api: { bodyParser: false } }

export default async function handler(req, res) {

    const session = await getSession({ req })

    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

    const reqBuffer = await buffer(req)

    let event;

    if(endpointSecret) {
        const signature = req.headers['stripe-signature'];
        try {
            event = stripe.webhooks.constructEvent(
                reqBuffer,
                signature,
                endpointSecret
            );
        } catch(error) {
            console.log('webhook signature verification failed', error.message);
            return res.sendStatus(400)
        }
    }

    switch(event.type) {
        case 'account.updated':
            const account = event.data.object;
            if (account.charges_enabled) {
                try {
                    await prisma.user.update({
                        where: { email: event.data.object.email },
                        data: {
                            stripeConnect: true
                        }
                    })
                } catch(error) {
                    console.log(error)
                }
            }
            break;
        case 'charge.succeeded':
            const paymentIntent = event.data.object;
            try {
                await prisma.order.create({
                    data: {
                        user: { connect: { email: paymentIntent.metadata.user } },
                        product: { connect: { id: paymentIntent.metadata.product } },
                        startDate: paymentIntent.metadata.firstDate,
                        endDate: paymentIntent.metadata.secondDate,
                        stripePaymentIntentId: paymentIntent.payment_intent,
                    }
                })
            } catch(error) {
                console.log(error)
            }
            break;
        default:
            console.log(`Unhandled event type ${event.type}`)
    }

    res.send()
}