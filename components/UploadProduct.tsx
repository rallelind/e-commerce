import React from "react"
import { useState } from "react"
import { Textarea, Input, Grid, Spacer, Container } from "@nextui-org/react"
import { Button } from '@mantine/core';
import ImageDropzone from "./Dropzone";
import PreviewImagesUploaded from "./ImageUploadedPreview";

import UploadTimeline from "./Timeline"

const UploadProduct: React.FC = () => {

    const [active, setActive] = useState(0)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [images, setImages] = useState([])
    const [show, setShow] = useState("title")


    const handleChange = async (files) => {
        const fileUploaded = files[0]
        const formData = new FormData()

        formData.append("file", fileUploaded)
        formData.append("upload_preset", "profile-image-uploads")

        try {
            const data = await fetch("https://api.cloudinary.com/v1_1/dav4jgueu/image/upload", {
                method: "POST",
                body: formData
            })
            .then(res => res.json())

            setImages([...images, data.secure_url])

        } catch (error) {
            console.log(error)
        } 
      };

    const goForwardButton = (e: React.SyntheticEvent) => {
        e.preventDefault()
        if(show === "title") {
            if(title.length > 0) {
                setShow("description")
                setActive(1)
            }
        }
        if(show === "description") {
            if(description.length > 0) {
                setShow("price")
                setActive(2)
            }
        }
        if(show === "price") {
            if(price.length > 0) {
            setShow("images")
            setActive(3)
            }
        }
    }

    const goBackButton = (e: React.SyntheticEvent) => {
        if(show === "description") {
            setShow("title")
            setActive(0)
        }
        if(show === "price") {
            setShow("description")
            setActive(1)
        }
        if(show === "images") {
            setShow("price")
            setActive(2)
        }
    }

    return (
        <Grid xs={6}>
            <Container>
                <UploadTimeline 
                    active={active}
                    
                />
            </Container>
            <Grid.Container gap={4}>
                {show === "title" &&
                <Container>
                    <Input 
                        label="Product Titel"
                        onChange={(e) => setTitle(e.currentTarget.value)}
                        value={title}
                    />
                </Container>
                }
                {show === "description" &&
                <Container>
                    <Textarea 
                        label="Product Description"
                        placeholder="Pick a description for your product"
                        onChange={(e) => setDescription(e.currentTarget.value)}
                        value={description}
                        rows={5}
                    />
                </Container>
                }
                {show === "price" && 
                <Container>
                    <Input 
                        label="Pick a price"
                        onChange={(e) => setPrice(e.currentTarget.value)}
                        value={price}
                    />
                </Container>
                }
                {show === "images" &&
                <Container>
                    <ImageDropzone 
                        onDrop={(files) => handleChange(files)}
                    />
                    <Grid.Container gap={1}>
                        {images.map((img, i) => (
                            <PreviewImagesUploaded 
                                key={i}
                                src={img}
                            />
                        ))
                    }
                    </Grid.Container>
                </Container>
                }
                <Container>
                {show === "title" ? <div></div> :
                    <Button 
                        variant="default" 
                        radius="lg"
                        onClick={goBackButton}
                    >
                        Previous
                    </Button>
                    }
                    <Button 
                        color="grape" 
                        radius="lg"
                        onClick={goForwardButton}
                    >
                        Next
                    </Button>
                </Container>
            </Grid.Container>
        </Grid>
    )
}

export default UploadProduct
