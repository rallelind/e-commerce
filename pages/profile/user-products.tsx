import UserProducts from "../../components/profilePage/userProducts/UserProducts";
import UserAppShell from "../../components/profilePage/appShell/UserAppShell";
import { useQuery } from "react-query";

export default function UserProduct() {

    const fetchUserProducts = async () => {
        const res = await fetch("/api/user/user-products")
        return res.json()
    }

    const { data, isLoading } = useQuery("user-orders", fetchUserProducts)

    return (
        <UserAppShell inbox={false} navbar={null}>
            <UserProducts userProduct={data} isLoading={isLoading} />
        </UserAppShell>
    )
}