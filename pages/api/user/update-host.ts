import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

export default async function(req, res) {
    
    const session = await getSession({ req })

    if (session) {
        try {
            const { checked } = req.body

            const updateUserHost = await prisma.user.update({
                where: { email: session.user.email },
                data: {
                    host: checked
                }
            })
            console.log(checked)
            res.json(updateUserHost)
        } catch(error) {
            console.log(error)
        }
    }
}