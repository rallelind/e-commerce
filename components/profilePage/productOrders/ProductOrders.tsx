import { Grid } from "@nextui-org/react";
import ProductOrdersCards from "./ProductOrdersCards";

const ProductOrders = ({ productOrders }) => {

    if (productOrders.length === 0) {
        return <h1>You have 0 orders on your products</h1>
    }

    console.log(productOrders)

    return (
        <Grid.Container gap={4}>
            {productOrders.map((productOrder, i) => (
                <ProductOrdersCards
                    key={i}
                    userName={productOrder.user.name}
                    userImage={productOrder.user.image}
                    startDate={productOrder.startDate}
                    endDate={productOrder.endDate}
                    productTitle={productOrder.product.title}
                    productId={productOrder.product.id}
                    orderId={productOrder.id}
                />
            ))}
        </Grid.Container>
    )
}

export default ProductOrders