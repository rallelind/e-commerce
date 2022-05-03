import { useRouter } from "next/router"
import { GetServerSideProps } from "next";
import prisma from "../../lib/prisma";
import { AppShell } from "@mantine/core";
import { Text, Container, Divider, Spacer, Button } from "@nextui-org/react";
import SideSection from "../../components/bookingPage/SideSection";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

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
                <Container justify="center" style={{ width: "80%", marginTop: "5%" }}>
                    <Text h2>
                        Request to book this van
                    </Text>
                    <Spacer y={1} />
                    <Container style={{ display: "flex", justifyContent: "space-between" }}>
                        <div>
                            <Text h3>
                                Dates
                            </Text>
                        </div>
                        <div>
                            <Text h3>
                                {`${dateOne.getDate()}.${dateOne.getMonth()}`} - {`${dateTwo.getDate()}.${dateTwo.getMonth()}`}
                            </Text>
                        </div>
                    </Container>
                    <Spacer y={1} />
                    <Divider />
                    <Spacer y={1} />
                    {session.status === "unauthenticated" ?
                        <Button onClick={() => signIn("google")}>
                            Google
                        </Button>
                        :
                        <h1>Hello </h1>
                    }

                </Container>
            </AppShell>
    )
}