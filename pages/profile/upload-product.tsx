import UserAppShell from "../../components/profilePage/appShell/UserAppShell";
import UploadProduct from "../../components/profilePage/uploadProduct/UploadProduct";
import prisma from "../../lib/prisma";
import { getSession } from "next-auth/react";

export const getServerSideProps = async ({ req }) => {

    const session = await getSession({ req })

    const user = await prisma.user.findUnique({
        where: { email: session?.user?.email },
        select: { stripeConnect: true }
    })

    return {
        props: { user }
    }
}

export default function UploadProducts({ user }) {

    return (
        <UserAppShell inbox={false} navbar={null}>
            <UploadProduct stripeConnect={user.stripeConnect} />
        </UserAppShell>
    )
}