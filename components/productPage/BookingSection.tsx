import React, { MouseEventHandler, useRef } from "react"
import { Grid, Card, Container, Text, Divider, Spacer, Button } from "@nextui-org/react"
import { DatePicker, DateRangePicker } from "@mantine/dates"
import { FcCalendar } from "react-icons/fc"
import { useMediaQuery } from "../../lib/customHook/useMediaQuery"

type BookingProps = {
    serviceCost: number;
    totalCost: number;
    rentCost: number;
    price: number;
    value: [Date, Date];
    onChange: (value: [Date, Date]) => void;
    minDate: string;
    maxDate: string;
    bookedDates: string[];
    height: string;
    onClick: MouseEventHandler,
    smallScreenBtn: MouseEventHandler,
}

const BookingSystem: React.FC<BookingProps> = ({ smallScreenBtn, serviceCost, totalCost, rentCost, price, value, onChange, onClick, bookedDates, minDate, maxDate, height }) => {

    const bookingBreakPoint = useMediaQuery(920)

    console.log(value)

    return (
        <>
        {!bookingBreakPoint ? (
            <Grid xs={4}>
                <div className={`h-[${height}] top-0 sticky w-full`}>
                <Card bordered>
                    <Card.Body>
                        <Spacer y={0.5} />
                        <Container>
                            <Text
                                h3
                            >{price} <span>DKK / night</span></Text>
                        </Container>
                        <Spacer y={0.5} />
                        <Container>
                            <DateRangePicker
                                placeholder="Event date"
                                label="Pick date"
                                allowLevelChange={false}
                                icon={<FcCalendar size={30} />}
                                disableOutsideEvents
                                value={value}
                                onChange={onChange}
                                minDate={new Date(minDate) > new Date() ? new Date(minDate) : new Date()}
                                maxDate={new Date(maxDate)}
                                excludeDate={(date) => (bookedDates.some((dates) => (date.getDate() === new Date(dates).getDate()) && (date.getMonth() === new Date(dates).getMonth()) && (date.getFullYear() === new Date(dates).getFullYear())))}
                                />
                        </Container>
                        <Spacer y={1} />
                        {value[0] === null || value[0] && value[1] === null ? <></> :
                            <>
                                <Container className="flex justify-center">
                                    <Button  
                                        color="gradient" 
                                        className="w-full"
                                        onClick={onClick}
                                        >
                                        Checkout</Button>
                                </Container>
                                <Spacer y={1} />
                                <Container className="flex justify-between">
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
                                <Container className="flex justify-between">
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
                                <Container className="flex justify-between">
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
                </div>
            </Grid>
        )
        :
        <>
            <div className="flex items-center justify-between bottom-0 fixed h-[60px] w-full bg-white border-t-2 border-r-0 border-b-0 border-l-0 border-solid z-[100000]">
                <div className="ml-[10px]">
                    <Text
                        h5
                    >
                        {price} <span>DKK / night</span>
                    </Text>
                </div>
                <div className="mr-[5px]">
                    <Button onClick={smallScreenBtn} size="sm" color="gradient">{value[0] === null || value[0] && value[1] === null ? "Check Availability" : "Details"}</Button>
                </div>
            </div>

        </>
        }
    </>
    )
}

export default BookingSystem