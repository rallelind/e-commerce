import { Grid } from "@nextui-org/react";
import ProductOrdersCards from "./ProductOrdersCards";
import { Loading } from "@nextui-org/react";

const ProductOrders = ({ productOrders, isLoading }) => {

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Loading color="secondary" textColor="secondary">
                    Loading your product orders
                </Loading>
            </div>
        )
    }

    if (productOrders.length === 0) {
        return <h1>You have 0 orders on your products</h1>
    }

    return (
        <Grid.Container gap={4}>
            {productOrders.map((productOrder) => (
                <ProductOrdersCards
                    key={productOrder.id}
                    productOrder={productOrder}
                />
            ))}
        </Grid.Container>
    )
}

export default ProductOrders