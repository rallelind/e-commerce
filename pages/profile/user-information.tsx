import UserAppShell from "../../components/profilePage/appShell/UserAppShell";
import ProfileInfo from "../../components/profilePage/profileInfo/ProfileInfo";
import { useSession } from "next-auth/react";

export default function UserInformation() {

    const session = useSession()
    console.log(session)

    return (
        <UserAppShell inbox={false} navbar={null}>
            <ProfileInfo />
        </UserAppShell>
    )
}