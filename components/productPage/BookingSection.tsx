import React from "react"
import { Grid, Card, Container, Text, Divider, Spacer } from "@nextui-org/react"
import { DateRangePicker } from "@mantine/dates"
import { FcCalendar } from "react-icons/fc"

const BookingSystem: React.FC<{ serviceCost: number, totalCost: number, rentCost: number, price: number, value: [Date, Date], onChange: (value: [Date, Date]) => void, minDate: string, maxDate: string }> = ({ price, value, onChange, minDate, maxDate, serviceCost, totalCost, rentCost }) => {
    
    
    return (
        <Grid xs={4}>
            <Card>
                <Card.Body>
                    <Container>
                        {price}
                    </Container>
                    <Container>
                        <DateRangePicker 
                            placeholder="Event date"
                            label="Pick date"
                            allowLevelChange={false}
                            icon={<FcCalendar size={30} />}
                            disableOutsideEvents
                            value={value}
                            onChange={onChange}
                            minDate={new Date(minDate)}
                            maxDate={new Date(maxDate)}
                        />
                    </Container>
                    <Spacer y={1} />
                    {value[0] === null || value[0] && value[1] === null ? <></> :
                    <>
                        <Container style={{ display: "flex", justifyContent: "space-between" }}>
                                <div>
                                    <Text>
                                        Cost of rent  
                                    </Text>
                                </div>
                                <div>
                                    <Text>
                                        {rentCost}
                                    </Text>
                                </div>
                        </Container>
                        <Spacer y={0.5} />
                        <Container style={{ display: "flex", justifyContent: "space-between" }}>
                                <div>
                                    <Text>
                                        Service cost  
                                    </Text>
                                </div>
                                <div>
                                    <Text>
                                        {serviceCost}
                                    </Text>
                                </div>
                        </Container>
                        <Spacer y={0.5} />
                        <Divider />
                        <Spacer y={0.5} />
                        <Container style={{ display: "flex", justifyContent: "space-between" }}>
                                <div>
                                    <Text>
                                        Total cost  
                                    </Text>
                                </div>
                                <div>
                                    <Text>
                                        {totalCost}
                                    </Text>
                                </div>
                        </Container>
                        </>
                        }
                </Card.Body>
            </Card>
        </Grid>
    )
}

export default BookingSystem