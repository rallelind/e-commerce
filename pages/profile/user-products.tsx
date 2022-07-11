import UserProducts from "../../components/profilePage/userProducts/UserProducts";
import UserAppShell from "../../components/profilePage/appShell/UserAppShell";
import prisma from "../../lib/prisma";
import { getSession } from "next-auth/react";

export const getServerSideProps = async ({ req }) => {

    const session = await getSession({ req })

    const userProducts= await prisma.post.findMany({
        where: {
            author: { email: session?.user.email }
        },
        include: {
            author: {
                select: { name: true }
            },
        },
    });

    return { props: { userProducts } }
}

export default function UserProduct({ userProducts }) {

    return (
        <UserAppShell inbox={false} navbar={null}>
            <UserProducts userProduct={userProducts} />
        </UserAppShell>
    )
}