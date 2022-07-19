import UserAppShell from "../../components/profilePage/appShell/UserAppShell";
import UploadProduct from "../../components/profilePage/uploadProduct/UploadProduct";
import { useQuery } from "react-query";
import { Loading } from "@nextui-org/react";

export default function UploadProducts() {

    const fetchUserData = async () => {
        const res = await fetch("/api/user/userDetails")
        return res.json()
    }

    const { isLoading, data } = useQuery("user-stripe", fetchUserData)

    return (
        <UserAppShell inbox={false} navbar={null}>
            {isLoading ? <Loading color="secondary" textColor="secondary" className="flex justify-center items-center h-full">Loading user information</Loading> : <UploadProduct stripeConnect={data.stripeConnect} />}
        </UserAppShell>
    )
}