import React, { SyntheticEvent } from "react"
import { useState } from "react"
import { Textarea, Input, Grid, Spacer, Container } from "@nextui-org/react"
import { Button, MultiSelect } from '@mantine/core';
import { DateRangePicker } from '@mantine/dates';
import ImageDropzone from "../../utils/Dropzone";
import PreviewImagesUploaded from "./ImageUploadedPreview";
import PreviewProduct from "./PreviewProduct";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { FcCalendar } from "react-icons/fc"
import UploadTimeline from "./Timeline"


const UploadProduct: React.FC<{ showTable: () => void, stripeConnect: boolean }> = ({ showTable, stripeConnect }) => {

    const [active, setActive] = useState(0)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(null)
    const [images, setImages] = useState([])
    const [dates, setDates] = useState<[Date | null, Date | null]>([
        new Date(),
        new Date(),
      ]);
    const [features, setFeatures] = useState([])
    const [show, setShow] = useState("title")
    const [disabledBtn, setDisabledBtn] = useState(false)

    const router = useRouter()

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

    const uploadProduct = async() => {
        
        let prices = Number(price)

        try {
            const body = { title, prices, images, description, dates, features }
            await fetch(`api/product/upload-product`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })
            
        } catch (error) {
            console.log(error)
        } 
    }

    const goForwardButton = (e: React.SyntheticEvent) => {
        e.preventDefault()
        if(show === "title") {
            if(title.length > 0 && description.length > 0 && price > 0) {
                setShow("dates&features")
                setActive(1)
            } else {
                toast.error('You need to fill out all inputs')
            }
        }
        if(show === "dates&features") {
            if(dates.length === 2) {
                setShow("images")
                setActive(2)
            } else {
                toast.error('You need to fill the dates')
            }
        }
        if(show === "images") {
            if (images.length >= 5) {
                setShow("preview")
                setActive(3)
            } else {
                toast.error("You need to upload atleast five images")
            }
        }
        if(show === "preview") {
            setDisabledBtn(true)
            toast.promise(
                uploadProduct(), {
                    loading: "Uploading",
                    success: <b>Product uploaded!</b>,
                    error: <b>Could not upload.</b>,
                }
            )
            .then(showTable)
        }
    }

    const goBackButton = (e: React.SyntheticEvent) => {
        if(show === "dates&features") {
            setShow("title")
            setActive(0)
        }
        if(show === "images") {
            setShow("dates&features")
            setActive(1)
        }
        if(show === "preview") {
            setShow("images")
            setActive(2)
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

    const redirectToStripeConnect = async () => {
        await fetch("")
    }

    console.log(dates)

    if (!stripeConnect) {
        return (
            <form method="POST" action="/api/stripe/stripe-connect/create-link">
                <Button type="submit">Create stripe connect account</Button>
            </form>
        )
    }

    return (
            <Grid.Container gap={4}>
            <UploadTimeline 
                active={active}    
            />
            <Toaster />
                {show === "title" &&
                <Container>
                    <div style={{ marginTop: "5%" }}>
                        <Input 
                            clearable 
                            width="50%"
                            bordered
                            label="Product Titel"
                            onChange={(e) => setTitle(e.currentTarget.value)}
                            value={title}
                        />
                        <Spacer y={1} />
                        <Textarea 
                            bordered
                            width="50%"
                            label="Product Description"
                            placeholder="Pick a description for your product"
                            onChange={(e) => setDescription(e.currentTarget.value)}
                            value={description}
                            rows={5}
                        />
                        <Spacer y={1} />
                        <Input  
                            bordered
                            width="50%"
                            label="Pick a price"
                            type="number"
                            onChange={(e) => setPrice(e.currentTarget.value)}
                            value={price}
                        />
                    </div>
                </Container>
                }
                {show === "dates&features" && 
                <Container>
                    <div style={{ width: "50%" }}>
                        <Spacer y={1} />
                        <DateRangePicker
                                placeholder="Event date"
                                label="Pick date"
                                required
                                allowLevelChange={false}
                                icon={<FcCalendar size={30} />}
                                minDate={new Date()}
                                disableOutsideEvents
                                value={dates}
                                onChange={setDates}
                            />
                            <Spacer y={1} />
                            <MultiSelect 
                                label="Pick included features"
                                data={featuresData}
                                value={features}
                                onChange={setFeatures}
                            />
                        </div>
                </Container>
                }
                {show === "images" &&
                <Container>
                    <ImageDropzone 
                        onDrop={(files) => toast.promise(handleChange(files), {
                            loading: "Uploading image",
                            success: <b>Image uploaded!</b>,
                            error: <b>Could not upload.</b>,
                        })}
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
                {show === "preview" &&
                        <PreviewProduct 
                            images={images.map(e => e)}
                            price={price}
                            content={description}
                            title={title}
                        />
                }
                <Container>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "5%" }}>
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
                            disabled={disabledBtn}
                            color="grape" 
                            radius="lg"
                            onClick={goForwardButton}
                        >
                            {show === "preview" ? <>Finish</> : <>Next</>}
                        </Button>
                    </div>
                </Container>
        </Grid.Container>
    )
}

export default UploadProduct
