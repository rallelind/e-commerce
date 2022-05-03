import { useRouter } from "next/router"
import { GetServerSideProps } from "next";
import prisma from "../../lib/prisma";
import { AppShell } from "@mantine/core";
import SideSection from "../../components/bookingPage/SideSection";


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
    
    const bookingDates = query.bookingDates

    const dateOne = new Date(bookingDates[0])
    const dateTwo = new Date(bookingDates[1])
    const timeDiff = Math.abs(dateOne.getTime() - dateTwo.getTime());
    const numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24));

    const priceForStay = props.price * numberOfNights
    const serviceCost = priceForStay * 0.1

    console.log(numberOfNights)

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

            </AppShell>
    )
}