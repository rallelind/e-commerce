import UserAppShell from "../../components/profilePage/appShell/UserAppShell";
import dynamic from "next/dynamic";
import { useQuery } from "react-query";
const ProductOrders = dynamic(() => import("../../components/profilePage/productOrders/ProductOrders"), {ssr: false});

export default function ProductOrder() {

  const fetchUserOrders = async () => {
    const res = await fetch("/api/orders/productOrders")
    return res.json()
  }

  const { data, isLoading } = useQuery("user-orders", fetchUserOrders)

    return (
        <UserAppShell inbox={false} navbar={null}>
            <ProductOrders productOrders={data} isLoading={isLoading} />
        </UserAppShell>
    )
}