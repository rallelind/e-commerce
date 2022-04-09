import React, { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import { Text, Avatar, Grid, Spacer, Button, Container } from "@nextui-org/react";
import ProfileInfo from "../components/ProfileInfo";
import UploadProduct from "../components/UploadProduct";
import UserProducts from "../components/UserProducts";

const Profile: React.FC = () => {

    const [showComponent, setShowComponent] = useState(<ProfileInfo />)

    return (
        <div>
            <Spacer y={1} />
            <Grid.Container gap={3} justify="center">
                {showComponent}
                <Grid>
                    <Text
                        h3
                        css={{
                            textGradient: '45deg, $blue500 -20%, $pink500 50%'
                        }}
                    >
                        Options</Text>
                    <Spacer y={1} />
                    <Button flat onClick={() => setShowComponent(<ProfileInfo />)}>
                        Profile
                    </Button>
                    <Spacer y={1} />
                    <Button flat onClick={() => setShowComponent(<UploadProduct />)}>
                        Upload Product
                    </Button>
                    <Spacer y={1} />
                    <Button flat onClick={() => setShowComponent(<UserProducts />)}>
                        View Your Products
                    </Button>
                    <Spacer y={1} />
                    <Button flat color="error" onClick={() => signOut()}>
                        Sign Out
                    </Button>
                </Grid>
            </Grid.Container>
        </div>
    )
}

export default Profile
