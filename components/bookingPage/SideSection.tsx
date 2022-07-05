import { Aside } from "@mantine/core";
import { Container, Text, Divider, Spacer } from "@nextui-org/react";
import React from "react";
import BookingImages from "./BookingImages"

type SideSection = {
    images: string[];
    title: string;
    price: number;
    numberOfNights: number;
    priceForStay: number;
    serviceCost: number;
}

const SideSection: React.FC<SideSection> = ({ images, title, price, numberOfNights, priceForStay, serviceCost }) => {
    return (
        <Aside className="w-[450px]">
            <Spacer y={0.5} />
            <BookingImages images={images.map((e) => e)} />
            <Spacer y={0.5} />
            <Divider />
            <Spacer y={0.5} />
            <Container>
                <Text
                    h2
                    css={{
                        textGradient: "112deg, #06B7DB -63.59%, #FF4ECD -20.3%, #0072F5 70.46%",
                    }}
                >
                    {title}
                </Text>
            </Container>
            <Spacer y={0.5} />
            <Container className="flex justify-between">
                <div>
                    <Text h5>
                        {price} x {numberOfNights} nights
                    </Text>
                </div>
                <div>
                    <Text 
                        h5
                    >
                        {priceForStay}
                    </Text>
                </div>
            </Container>
            <Spacer y={0.5} />
            <Container className="flex justify-between">
                <div>
                    <Text 
                        h5
                    >
                        Service cost
                    </Text>
                </div>
                <div>
                    <Text h5>
                        {serviceCost}
                    </Text>
                </div>
            </Container>
            <Spacer y={0.5} />
            <Divider />
            <Spacer y={0.5} />
            <Container className="flex justify-between">
                <div>
                    <Text h5>
                        Total cost
                    </Text>
                </div>
                <div>
                    <Text h5>
                        {priceForStay + serviceCost}
                    </Text>
                </div>
            </Container>
        </Aside>
    )
}

export default SideSection