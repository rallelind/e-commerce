import UserAppShell from "../../components/profilePage/appShell/UserAppShell";
import OrderedTrips from "../../components/profilePage/orderedTrips/OrderedTrips";
import prisma from "../../lib/prisma";
import { getSession } from "next-auth/react";

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  const userOrders = await prisma.order.findMany({
    where: {
      user: { email: session?.user?.email },
    },
    select: {
      userSeen: true,
      startDate: true,
      endDate: true,
      accepted: true,
      product: {
        select: { image: true },
      },
    },
  });

  return {
    props: {
        userOrders: JSON.parse(JSON.stringify(userOrders))
    }
  }
};

export default function UserOrders({ userOrders }) {
  return (
    <UserAppShell inbox={false} navbar={null}>
      <OrderedTrips userOrders={userOrders} />
    </UserAppShell>
  );
}
