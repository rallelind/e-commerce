import UserAppShell from "../../components/profilePage/appShell/UserAppShell";
import OrderedTrips from "../../components/profilePage/orderedTrips/OrderedTrips";
import { useQuery } from "react-query";
import { Loading } from "@nextui-org/react";

export default function UserOrders() {

  const fetchUserOrders = async () => {
    const res = await fetch("/api/orders/userOrders")
    return res.json()
  }

  const { data, status } = useQuery("user-orders", fetchUserOrders)

  return (
    <UserAppShell inbox={false} navbar={null}>
      <OrderedTrips userOrders={data} status={status} />
    </UserAppShell>
  );
}
