import UserAppShell from "../../components/profilePage/appShell/UserAppShell";
import ProductsTable from "../../components/profilePage/manageProducts/Table";
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

export default function ManageProducts({ userProducts }) {
    return (
        <UserAppShell inbox={false} navbar={null}>
            <ProductsTable products={userProducts} />
        </UserAppShell>
    )
}