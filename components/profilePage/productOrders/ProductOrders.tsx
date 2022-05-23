import { Grid } from "@nextui-org/react";
import ProductOrdersCards from "./ProductOrdersCards";

const ProductOrders = ({ productOrders }) => {

    if (productOrders.length === 0) {
        return <h1>You have 0 orders on your products</h1>
    }

    return (
        <Grid.Container gap={4}>
            {productOrders.map((productOrder) => (
                <ProductOrdersCards
                    userName={productOrder.user.name}
                    userImage={productOrder.user.image}
                    dates={productOrder.dates}
                    productTitle={productOrder.product.title}
                    productImages={productOrder.product.image}
                />
            ))}
        </Grid.Container>
    )
}

export default ProductOrders