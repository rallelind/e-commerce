import { useRouter } from "next/router"
import { GetServerSideProps } from "next";
import prisma from "../../lib/prisma";
import { AppShell } from "@mantine/core";
import { Text, Container, Divider, Spacer, Button } from "@nextui-org/react";
import SideSection from "../../components/bookingPage/SideSection";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { FcGoogle, FcCalendar } from "react-icons/fc"
import { AiOutlineGithub } from "react-icons/ai"
import wavesStyles from "../../styles/Waves.module.css"
import GoBackBtn from "../../components/utils/GoBackBtn";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const post = await prisma.post.findUnique({
      where: { 
            id: String(params?.id), 
        },
        select: { 
            image: true, price: true, title: true,
        },
    });
    return { props: post }
  }

export default function BookingPage(props) {

    const { query } = useRouter()
    const router = useRouter()
    const session = useSession()
    
    const bookingDates = query.bookingDates

    const dateOne = new Date(bookingDates[0])
    const dateTwo = new Date(bookingDates[1])
    const timeDiff = Math.abs(dateOne.getTime() - dateTwo.getTime());
    const numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24));

    const priceForStay = props.price * numberOfNights
    const serviceCost = priceForStay * 0.1

    return (
        <div className={wavesStyles.svgContainer}>
            <AppShell
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
            >
                <Container justify="center" style={{ width: "90%", marginTop: "10%" }}>
                    <div style={{ display: "flex" }}>
                        <GoBackBtn />
                        <Text 
                            h2
                            css={{
                                textGradient: "45deg, $purple500 -20%, $pink500 100%",
                            }}    
                        >
                             Request to book this van
                        </Text>
                    </div>
                    <Spacer y={1} />
                    <Container style={{ display: "flex", justifyContent: "space-between" }}>
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
                            <Text 
                                h3
                                css={{
                                    textGradient: "45deg, $purple500 -20%, $pink500 100%",
                                }} 
                            >
                                In order to book, please sign in below
                            </Text>
                            <Spacer y={1} />
                            <Container style={{ display: "flex", justifyContent: "space-between" }}>
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
                        <h1>Hello </h1>
                    }

                </Container>
            </AppShell>
        </div>
    )
}