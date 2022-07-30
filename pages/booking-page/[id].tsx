import { useRouter } from "next/router"
import { GetServerSideProps } from "next";
import { AppShell, MediaQuery } from "@mantine/core";
import { Text, Container, Divider, Spacer, Button } from "@nextui-org/react";
import SideSection from "../../components/bookingPage/SideSection";
import HeaderSection from "../../components/bookingPage/HeaderSection"
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { FcGoogle, FcCalendar } from "react-icons/fc"
import { AiOutlineGithub } from "react-icons/ai"
import wavesStyles from "../../styles/Waves.module.css"
import GoBackBtn from "../../components/utils/GoBackBtn";
import StripePayment from "../../components/stripe/StripePayment";
import prisma from "../../lib/prisma";
import { useMediaQuery } from "../../lib/customHook/useMediaQuery";

export const getServerSideProps: GetServerSideProps = async ({ params, res }) => {


    const post = await prisma.post.findUnique({
        where: { 
              id: String(params?.id), 
          },
          select: { 
              image: true, price: true, title: true, id: true, authorId: true,
          },
      });
    return { props: post }
  }

export default function BookingPage(props) {

    const { query } = useRouter()
    const session = useSession()
    
    const bookingDates = query.bookingDates

    const dateOne = new Date(bookingDates[0])
    const dateTwo = new Date(bookingDates[1])
    const timeDiff = Math.abs(dateOne.getTime() - dateTwo.getTime());
    const numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24));

    const priceForStay = props.price * numberOfNights
    const serviceCost = priceForStay * 0.1

    return (
        <div>
            <AppShell
                asideOffsetBreakpoint="md"
                aside={
                    <SideSection 
                        images={props.image}
                        price={props.price}
                        title={props.title}
                        numberOfNights={numberOfNights}
                        priceForStay={priceForStay}
                        serviceCost={serviceCost}
                    />
                }
                header={
                    <HeaderSection 
                        productInfo={props}
                        numberOfNights={numberOfNights}
                        priceForStay={priceForStay}
                        serviceCost={serviceCost}
                    />
                }
            >
                <Container justify="center" className="w-[90%] mt-[10%]">
                        <div className="flex items-center">
                            <div className="mr-[1%]">
                                    <GoBackBtn />
                            </div>
                            <Text 
                                h3
                                css={{
                                    textGradient: "112deg, #06B7DB -63.59%, #FF4ECD -20.3%, #0072F5 70.46%",
                                }}    
                            >
                                Request to book this van
                            </Text>
                        </div>
                    <Spacer y={1} />
                    <Container className="flex justify-between">
                        <div>
                            <Text h4>
                                Dates
                            </Text>
                        </div>
                        <div>
                            <Text h4>
                                {`${dateOne.getDate()}.${dateOne.getMonth()}`} - {`${dateTwo.getDate()}.${dateTwo.getMonth()}`}
                            </Text>
                        </div>
                    </Container>
                    <Spacer y={1} />
                    <Divider />
                    {session.status === "unauthenticated" ?
                        <div>
                            <Spacer y={1} />
                            <Container>
                                <Text 
                                    h3
                                >
                                    In order to book, please sign in below
                                </Text>
                                </Container>
                            <Spacer y={1} />
                            <Container className="flex justify-between">
                                <div>
                                    <Button color={null} size="lg" bordered onClick={() => signIn("google")}>
                                        <FcGoogle size={35} />
                                    </Button>
                                </div>
                                <div>
                                    <Button color={null} size="lg" bordered onClick={() => signIn("github")}>
                                        <AiOutlineGithub size={35} />
                                    </Button>
                                </div>
                                <div>
                                    <Button color={null} size="lg" bordered onClick={() => signIn("github")}>
                                        <AiOutlineGithub size={35} />
                                    </Button>
                                </div>
                            </Container>
                        </div>
                        :
                        <>
                            <Spacer y={1}/>
                            <StripePayment amountOfDays={numberOfNights} productId={props.id} dates={bookingDates} />
                        </>
                    }

                </Container>
            </AppShell>
        </div>
    )
}