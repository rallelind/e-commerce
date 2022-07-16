import UserAppShell from "../../components/profilePage/appShell/UserAppShell";
import ProductsTable from "../../components/profilePage/manageProducts/Table";
import { useQuery } from "react-query";
import { Loading } from "@nextui-org/react";


export default function ManageProducts({ userProducts }) {

    const fetchUserProducts = async () => {
        const res = await fetch("/api/user/user-products")
        return res.json()
    }

    const { data, isLoading, isSuccess } = useQuery("user-orders", fetchUserProducts)

    return (
        <UserAppShell inbox={false} navbar={null}>
            {<ProductsTable products={isSuccess && data} isLoading={isLoading} />}
        </UserAppShell>
    )
}