import { buffer } from "micro"
import prisma from "../../../../lib/prisma"

export const config = { api: { bodyParser: false } }

export default async function handler(req, res) {

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
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            await prisma.order.create({
                data: {
                    user: { connect: { email: paymentIntent.metadata.user } },
                    product: { connect: { id: paymentIntent.metadata.product } },
                    dates: [paymentIntent.metadata.firstDate, paymentIntent.metadata.secondDate],
                }
            })
            break;
        default:
            console.log(`Unhandled event type ${event.type}`)
    }

    console.log(event.data.object.metadata)
    res.send()
}