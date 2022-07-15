import { Grid, Loading } from "@nextui-org/react"
import OrderedTripsCards from "./OrderedTripsCard"

const OrderedTrips = ({ userOrders, status }) => {

    if (status === "loading") {
        return (
          <div className="flex justify-center items-center h-full">
            <Loading />
          </div>
        )
    }

    if (userOrders.length === 0) {
        return <h1>You have 0 orders</h1>
    }

    return (
        <Grid.Container gap={2}>
            {userOrders.map((order, i) => (
                <OrderedTripsCards 
                    key={i}
                    image={order.product.image[0]}
                    status={order.accepted}
                    startDate={order.startDate}
                    endDate={order.endDate}
                />
            ))}
        </Grid.Container>
    )

}

export default OrderedTrips