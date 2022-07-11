import UserAppShell from "../../components/profilePage/appShell/UserAppShell";
import UploadProduct from "../../components/profilePage/uploadProduct/UploadProduct";

export default function UploadProducts() {

    return (
        <UserAppShell inbox={false} navbar={null}>
            <UploadProduct stripeConnect={true} />
        </UserAppShell>
    )
}