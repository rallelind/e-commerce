import React, { useState, useEffect } from "react";
import { Modal, Button, Container, Text, Input, Divider, Spacer, Grid, Textarea } from "@nextui-org/react";
import { MultiSelect } from '@mantine/core';
import { DateRangePicker } from '@mantine/dates';
import { FcCalendar } from "react-icons/fc";
import Dropzone from "../../utils/Dropzone";
import toast, { Toaster } from 'react-hot-toast';
import PreviewImagesUploaded from "../uploadProduct/ImageUploadedPreview";
import useRouterRefresh from "../../../lib/customHook/useRouterRefresh"

type UpdateModal = {
    productToUpdate: {
        id: string,
        title: string,
        content: string,
        dates: [Date, Date],
        features: string[],
        image: string[],
        price: number,
        published: boolean,
    },
    open: boolean,
    onClose: () => void,
}

const UpdateModal: React.FC<UpdateModal> = ({ productToUpdate, open, onClose }) => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(null)
    const [images, setImages] = useState([])
    const [dates, setDates] = useState<[Date | null, Date | null]>([
        new Date(),
        new Date(),
      ]);
    const [features, setFeatures] = useState([])

    const refresh = useRouterRefresh()
      
    useEffect(() => {
        if(productToUpdate !== undefined) {
            setTitle(productToUpdate?.title)
            setDescription(productToUpdate?.content)
            setPrice(productToUpdate?.price)
            setImages(productToUpdate?.image)
            setDates([new Date(productToUpdate?.dates[0]), new Date(productToUpdate?.dates[1])])
            setFeatures(productToUpdate?.features)
        }
    }, [productToUpdate])


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

    const updateProduct = async () => {
        let prices = Number(price)
        if(title.length > 0 && description.length > 0 && prices > 0 && images.length >= 5 && dates.length === 2 && features.length > 0) {
            try {
                const body = { title, description, prices, images, dates, features }
                await fetch(`/api/product/update-product/${productToUpdate.id}`, {
                    method: "PUT",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body),
                })
            } catch(error) {
                console.log(error)
            }
        } else {
            throw new Error("Please fill out all details")
        }       
    }

    const featuresData = [
        { value: "waterSystem", label: "Water system" },
        { value: "kitchen", label: "Kitchen" },
        { value: "shower", label: "Shower" },
        { value: "wifi", label: "Wifi" },
        { value: "fridge", label: "Fridge" },
        { value: "stove", label: "Stove" },
        { value: "waterTanks", label: "Water tanks" },
    ]

    return (
        <>
        <Modal width="50%" onClose={onClose} open={open}>
        <Toaster containerStyle={{ zIndex: "10000" }} />
            <Modal.Body>
                <Text
                    h3
                    css={{
                        textGradient: "112deg, #06B7DB -63.59%, #FF4ECD -20.3%, #0072F5 70.46%",
                    }}
                >Update product details</Text>
                <Spacer y={0.5} />
                <Input
                    bordered
                    label="Update title"
                    value={title}
                    onChange={(e) => setTitle(e.currentTarget.value)}
                />
                <Spacer y={0.5} />
                <Textarea
                    bordered
                    label="Update description"
                    value={description}
                    onChange={(e) => setDescription(e.currentTarget.value)}
                />
                <Spacer y={0.5} />
                <Input
                    bordered
                    type="number"
                    label="Update price"
                    value={price}
                    onChange={(e) => setPrice(e.currentTarget.value)}
                />
                <Spacer y={0.5} />
                <Divider />
                <Spacer y={0.5} />
                <Text
                    h3
                    css={{
                        textGradient: "112deg, #06B7DB -63.59%, #FF4ECD -20.3%, #0072F5 70.46%",
                    }}
                >Update product features and dates</Text>
                <Spacer y={0.5} />
                <DateRangePicker
                    zIndex={10000}
                    placeholder="Event date"
                    label="Update date"
                    required
                    allowLevelChange={false}
                    icon={<FcCalendar size={30} />}
                    disableOutsideEvents
                    value={dates}
                    minDate={new Date()}
                    onChange={setDates}
                />
                <Spacer y={0.5} />
                <MultiSelect
                    zIndex={10000}
                    label="Update included features"
                    data={featuresData}
                    value={features}
                    onChange={setFeatures}
                />
                <Spacer y={0.5} />
                <Divider />
                <Spacer y={0.5} />
                <Text
                    h3
                    css={{
                        textGradient: "112deg, #06B7DB -63.59%, #FF4ECD -20.3%, #0072F5 70.46%",
                    }}
                >Update product images</Text>
                <Dropzone
                    onDrop={(files) => toast.promise(handleChange(files), {
                        loading: "Uploading image",
                        success: <b>Image uploaded!</b>,
                        error: <b>Could not upload.</b>,
                    })}
                />
                <Spacer y={0.5} />
                <Grid.Container gap={1}>
                    {images.map((img, i) => (
                        <PreviewImagesUploaded
                            key={i}
                            src={img}
                        />
                    ))
                    }
                </Grid.Container>
            </Modal.Body>
            <Modal.Footer>
                <Container style={{ display: "flex", justifyContent: "space-evenly" }}>
                    <div>
                        <Button color="gradient" auto onClick={onClose}>
                            Close
                        </Button>
                    </div>
                    <div>
                        <Button auto color="error" onClick={() => toast.promise(updateProduct(), {
                            loading: "Updating",
                            success: <b>Product updatet!</b>,
                            error: <b>Could not update.</b>, 
                        })
                        .then(refresh)
                        .then(onClose)
                        }>
                            Update
                        </Button>
                    </div>
                </Container>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default UpdateModal