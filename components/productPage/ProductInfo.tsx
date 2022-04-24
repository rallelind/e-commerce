import React, { useState } from "react"
import { Grid, Avatar, Container, Text, Divider, Spacer } from "@nextui-org/react"
import { RangeCalendar } from '@mantine/dates';
import FeaturesCards from "./FeaturesCards";


const ProductInfo: React.FC<{ onChange: (value: [Date, Date]) => void, value: [Date, Date], title: string, description: string, avatar: string, minDate: string, maxDate: string, features: string[] }> = ({ title, description, avatar, minDate, maxDate, features, value, onChange }) => {

    return (
        <Grid xs={7}>
            <Container>
                <Container style={{display: "flex", justifyContent: "space-between"}}>
                    <div>
                        <Text
                            h2
                            css={{
                                textGradient: "45deg, $purple500 -20%, $pink500 100%",
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
                            textGradient: "45deg, $blue500 -20%, $pink500 50%",
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
                <Container style={{ display: "flex", justifyContent: "center" }}>
                    <RangeCalendar 
                        amountOfMonths={2} 
                        value={value}
                        onChange={onChange}
                        fullWidth
                        hideOutsideDates={false}
                        allowLevelChange={false}
                        disableOutsideEvents={true}
                        minDate={new Date(minDate)}
                        maxDate={new Date(maxDate)}
                    />
                </Container>
            </Container>
        </Grid>
    )
}

export default ProductInfo