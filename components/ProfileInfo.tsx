import React, { useState } from 'react'
import { useSession } from "next-auth/react"
import { Text, Avatar, Grid, Spacer, Container } from "@nextui-org/react";

const ProfileInfo = () => {

    const [name, setName] = useState()

    const { data: session } = useSession()

    if (!session) {
        return (
            <div>
                <p>You need to be signed in...</p>
            </div>
        )
    }
    return (
        <Grid xs={5}>
            <Container>
                <Text
                    h3
                    css={{
                        textGradient: '45deg, $blue500 -20%, $pink500 50%',
                    }}
                >
                    My Profile
                </Text>
                <Spacer y={1} />
                <Avatar zoomed style={{ height: "125px", width: "125px" }} bordered color="gradient" src={session.user.image} />
                <Spacer y={1} />
                <Text
                    h5
                    css={{
                        textGradient: '45deg, $blue500 -20%, $pink500 50%'
                    }}
                >
                    Email:
                </Text>
                <Text>
                    {session.user.email}
                </Text>
                <Spacer y={1} />
                <Text
                    h5
                    css={{
                        textGradient: '45deg, $blue500 -20%, $pink500 50%'
                    }}
                >
                    Name:
                </Text>
                <Text>
                    {session.user.name}
                </Text>
            </Container>
        </Grid>
    )
}

export default ProfileInfo
