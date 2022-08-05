import { useState } from "react";
import { GetServerSideProps } from "next";
import { Grid, Image, Container, Text, Spacer, Divider, Button } from "@nextui-org/react";
import dynamic from "next/dynamic";
import { useMediaQuery } from "../../../lib/customHook/useMediaQuery";

const ImageDisplay = dynamic(
  () => import("../../../components/productPage/ImageDisplay"),
  { ssr: false }
);
import Layout from "../../../components/utils/Layout";
const ProductInfo = dynamic(
  () => import("../../../components/productPage/ProductInfo"),
  { ssr: false }
);
const BookingSystem = dynamic(
  () => import("../../../components/productPage/BookingSection"),
  { ssr: false }
);
import { useRouter } from "next/router";
import prisma from "../../../lib/prisma";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { DateRangePicker, RangeCalendar } from "@mantine/dates";
import { FcCalendar } from "react-icons/fc";

export const getServerSideProps: GetServerSideProps = async ({
  params,
  res,
}) => {

  const post = await prisma.post.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true, email: true, image: true },
      },
    },
  });

  return {
    props: JSON.parse(JSON.stringify(post)),
  };
};

export default function ProductPage(props) {

  const { query } = useRouter()

  const chosenDates = query.datesChosen

  const queryDatesChosen = chosenDates !== undefined && chosenDates.length === 2 && (chosenDates[0] !== "null" && chosenDates[1] !== "null")

  console.log(chosenDates)

  const [dates, setDates] = useState<[Date | null, Date | null]>(queryDatesChosen ? [new Date(query.datesChosen[0]), new Date(query.datesChosen[1])] : [null, null]);

  const [bookingSectionSmallScreen, setBookingSectionSmallScreen] =
    useState(false);

    const bookingBreakPoint = useMediaQuery(920)

  const amountOfDays = () => {
    if (dates[0] === null || dates[1] === null) {
      return;
    }
    let timeDiff = Math.abs(dates[0].getTime() - dates[1].getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24)) * props.price;
  };

  const router = useRouter();

  const routeChange = () => {
    let bookingDates = dates.map((e) => String(e));

    router.push({
      pathname: `/booking-page/${props.id}`,
      query: { bookingDates },
    });
  };

  const datesChosen = dates[0] === null || dates[0] && dates[1] === null

  return (
    <>
      {(!bookingSectionSmallScreen) ? (
        <Layout dates={null} setDates={null}>
          <ImageDisplay image={props.image} productId={props.id} />
          <Grid.Container justify="center" className="p-5">
            <ProductInfo
              value={dates}
              onChange={setDates}
              avatar={props.author.image}
              title={props.title}
              description={props.content}
              minDate={props.dates[0]}
              maxDate={props.dates[1]}
              features={props.features}
              bookedDates={props.bookedDates}
            />
            <BookingSystem
              price={props.price}
              minDate={props.dates[0]}
              maxDate={props.dates[1]}
              onChange={setDates}
              value={dates}
              rentCost={amountOfDays()}
              serviceCost={amountOfDays() * 0.1}
              totalCost={amountOfDays() + amountOfDays() * 0.1}
              height={
                dates[0] === null || dates[1] === null ? "175px" : "350px"
              }
              onClick={routeChange}
              bookedDates={props.bookedDates}
              smallScreenBtn={() => setBookingSectionSmallScreen(true)}
            />
          </Grid.Container>
        </Layout>
      ) : (
        <div className="h-full w-full bg-white">
            <AiOutlineCloseCircle
              className="left-[10px] top-[-30px] absolute"
              onClick={() => setBookingSectionSmallScreen(false)}
              size={30}
            />
            <div className="mt-10 overflow-y-scroll">
                <div className="flex justify-center">
                  <Text h5>
                    Please pick the dates you want to go explore
                  </Text>
                </div>
                <div className="flex justify-center">
                <RangeCalendar
                  placeholder="Event date"
                  allowLevelChange={false}
                  disableOutsideEvents
                  value={dates}
                  onChange={setDates}
                  minDate={
                    new Date(props.dates[0]) > new Date()
                      ? new Date(props.dates[0])
                      : new Date()
                  }
                  maxDate={new Date(props.dates[1])}

                />
              </div>
              <Spacer y={1} />
                        {datesChosen ? <></> :
                            <div className="mb-20">
                                <Spacer y={1} />
                                <Container className="flex justify-between">
                                    <div>
                                        <Text>
                                            Cost of rent
                                        </Text>
                                    </div>
                                    <div>
                                        <Text>
                                            {amountOfDays()}
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
                                            {amountOfDays() * 0.1}
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
                                            {amountOfDays() + amountOfDays() * 0.1}
                                        </Text>
                                    </div>
                                </Container>
                            </div>
                        }
            </div>
            <div className="flex items-center justify-between bottom-0 fixed h-[60px] w-full bg-white border-t-2 border-r-0 border-b-0 border-l-0 border-solid z-[100000]">
            <div className="ml-[5px]">
                    <Text>
                        {datesChosen ? "Please pick dates..." : `${new Date(dates[0]).getDate()}.${new Date(dates[0]).getMonth()} - ${new Date(dates[1]).getDate()}.${new Date(dates[1]).getMonth()}`}
                    </Text>
                </div>
                <div className="mr-[5px]">
                    <Button onClick={routeChange} size="sm" color="gradient" disabled={datesChosen}>Checkout</Button>
                </div>
            </div>
        </div>
      )}
    </>
  );
}
