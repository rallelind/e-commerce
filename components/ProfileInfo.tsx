import React, { useState, useRef } from 'react'
import { useSession } from "next-auth/react"
import { Text, Avatar, Grid, Spacer, Container, Input, Button } from "@nextui-org/react";
import { AiFillEdit } from "react-icons/ai"

const ProfileInfo = () => {

    const [newName, setNewName] = useState(false)
    const [updateName, setUpdateName] = useState("")

    const hiddenFileInput = useRef(null)

    const uploadImage = async (img) => {
        try {
            const body = { img }
            await fetch("api/user/update-image", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })
            console.log(body)
        } catch (error) {
            console.log(error)
        } finally {
            location.reload()
        }
    }

    const handleClick = () => {
        hiddenFileInput.current.click();
      };

      const handleChange = async (event) => {
        const fileUploaded = event.target.files[0];

        const formData = new FormData()

        formData.append("file", fileUploaded)
        formData.append("upload_preset", "profile-image-uploads")
        
        try {
            const data = await fetch("https://api.cloudinary.com/v1_1/dav4jgueu/image/upload", {
                method: "POST",
                body: formData
            })
            .then(res => res.json())

            uploadImage(data.secure_url)

        } catch (error) {
            console.log(error)
        } 
      };

    const { data: session } = useSession()

    const updateUserName = async (e: React.SyntheticEvent) => {
        e.preventDefault()

        try {
            const body = { updateName }
            await fetch(`api/user/update-name`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })
        } catch (error) {
            console.log(error)
        } finally {
            setNewName(false)
            location.reload()
        }
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
                <Avatar 
                    zoomed 
                    style={{ height: "125px", width: "125px", zIndex: "0" }} 
                    bordered 
                    color="gradient" 
                    src={session.user.image} 
                    onClick={handleClick}
                    pointer
                />
                      <input type="file"
                        ref={hiddenFileInput}
                        style={{display:'none'}} 
                        onChange={handleChange}
                /> 
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
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div>
                            <Text>
                                {newName === false ? session.user.name : <Input onChange={(e) => setUpdateName(e.target.value)} />}
                            </Text>
                        </div>
                        <div>
                            {
                                newName === false ?
                                <Avatar style={{ zIndex: "0" }} squared pointer icon={<AiFillEdit size={20} />} onClick={() => setNewName(true)} />
                                :
                                <Button auto onClick={updateUserName}>Change</Button>
                            }
                        </div>
                    </div>
            </Container>
        </Grid>
    )
}

export default ProfileInfo
