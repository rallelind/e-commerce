import React, { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import { Text, Avatar, Grid, Spacer, Button, Container } from "@nextui-org/react";
import ProfileInfo from "../components/ProfileInfo";
import UploadProduct from "../components/UploadProduct";
import UserProducts from "../components/UserProducts";
import { AppShell, Navbar, Header, Footer } from '@mantine/core';
import { CgProfile } from "react-icons/cg"
import { FiUpload, FiLogOut } from "react-icons/fi"
import { AiOutlineShop } from "react-icons/ai"

const Profile: React.FC = () => {

    const [showComponent, setShowComponent] = useState(<ProfileInfo />)

    const { data: session } = useSession()


    if (!session) {
        return (
            <div>
                <p>You need to be signed in...</p>
            </div>
        )
    }

    return (
        <AppShell
            padding="md"
            navbar={<Navbar fixed width={{ base: "15%" }} p="xs">
                    <Text
                        h3
                        css={{
                            textGradient: '45deg, $blue500 -20%, $pink500 50%'
                        }}
                    >
                        Options</Text>
                    <Spacer y={1} />
                    <Button icon={<CgProfile size={25}/>} rounded flat onClick={() => setShowComponent(<ProfileInfo />)}>
                        Profile
                    </Button>
                    <Spacer y={1} />
                    <Button icon={<FiUpload size={25}/>} rounded flat onClick={() => setShowComponent(<UploadProduct />)}>
                        Upload Product
                    </Button>
                    <Spacer y={1} />
                    <Button icon={<AiOutlineShop size={25}/>} rounded flat onClick={() => setShowComponent(<UserProducts />)}>
                        View Products
                    </Button>
                    <Spacer y={1} />
                    <Button icon={<FiLogOut size={25}/>} rounded flat color="error" onClick={() => signOut()}>
                        Sign Out
                    </Button>
            </Navbar>}>
            <div style={{ width: "85%", marginLeft: "15%" }}>
                <Grid.Container>
                    {showComponent}
                </Grid.Container>
            </div>
        </AppShell>
    )
}

export default Profile
