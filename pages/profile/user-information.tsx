import UserAppShell from "../../components/profilePage/appShell/UserAppShell";
import ProfileInfo from "../../components/profilePage/profileInfo/ProfileInfo";

export default function UserInformation() {

    return (
        <UserAppShell inbox={false} navbar={null}>
            <ProfileInfo />
        </UserAppShell>
    )
}