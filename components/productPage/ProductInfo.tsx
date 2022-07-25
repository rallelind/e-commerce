import React, { useState } from "react"
import { Grid, Avatar, Container, Text, Divider, Spacer } from "@nextui-org/react"
import { RangeCalendar } from '@mantine/dates';
import FeaturesCards from "./FeaturesCards";

type ProductInfoProps = {
    onChange: (value: [Date, Date]) => void;
    value: [Date, Date];
    title: string;
    description: string;
    avatar: string;
    minDate: string;
    maxDate: string;
    features: string[];
    bookedDates: string[];
}

const ProductInfo: React.FC<ProductInfoProps> = ({ title, description, avatar, minDate, maxDate, features, value, onChange, bookedDates }) => {

    console.log(bookedDates)

    return (
        <Grid xs={7}>
            <Container>
                <Container className="flex justify-between">
                    <div>
                        <Text
                            h2
                            css={{
                                textGradient: "112deg, #06B7DB -63.59%, #FF4ECD -20.3%, #0072F5 70.46%",
                            }}
                        >{title}</Text>
                    </div>
                    <div>
                        <Avatar squared size="lg" src={avatar} />
                    </div>
                </Container>
                <Spacer y={0.5} />
                <Divider />
                <Spacer y={0.5} />
                <Container>
                    <Text
                    >{description}</Text>
                </Container>
                <Spacer y={0.5} />
                <Divider />
                <Spacer y={1} />
                <Container>
                    <Text
                        h3
                        css={{
                            textGradient: "112deg, #06B7DB -63.59%, #FF4ECD -20.3%, #0072F5 70.46%",
                          }}
                    >
                        Included Features
                    </Text>
                    <Spacer y={1} />
                    <FeaturesCards 
                        features={features}
                    />
                </Container>
                <Spacer y={1} />
                <Spacer y={0.5} />
                <Divider />
                <Spacer y={0.5} />
                <Container className="flex justify-center">
                    <RangeCalendar 
                        amountOfMonths={2} 
                        value={value}
                        onChange={onChange}
                        fullWidth
                        hideOutsideDates={false}
                        allowLevelChange={false}
                        disableOutsideEvents={true}
                        minDate={new Date(minDate) > new Date() ? new Date(minDate) : new Date()}
                        maxDate={new Date(maxDate)}
                        excludeDate={(date) => (bookedDates.some((dates) => (date.getDate() === new Date(dates).getDate()) && (date.getMonth() === new Date(dates).getMonth()) && (date.getFullYear() === new Date(dates).getFullYear())))}
                    />
                </Container>
            </Container>
        </Grid>
    )
}

export default ProductInfo