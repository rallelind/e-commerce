import React, { useState } from "react"
import { Grid, Avatar, Container, Text, Divider, Spacer } from "@nextui-org/react"
import { RangeCalendar } from '@mantine/dates';


const ProductInfo: React.FC<{ title: string, description: string, avatar: string }> = ({ title, description, avatar }) => {

    const [date, setDate] = useState<[Date | null, Date | null]>([
        new Date(),
        new Date(),
      ]);

    return (
        <Grid xs={7}>
            <Container gap={0}>
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
                        <Avatar squared size="xl" src={avatar} />
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
                <Spacer y={0.5} />
                <Container style={{ display: "flex", justifyContent: "center" }}>
                    <RangeCalendar 
                        amountOfMonths={2} 
                        value={date}
                        onChange={setDate}
                        fullWidth
                        hideOutsideDates={false}
                        allowLevelChange={false}
                        disableOutsideEvents={true}
                    />
                </Container>
            </Container>
        </Grid>
    )
}

export default ProductInfo