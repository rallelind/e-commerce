import { Grid, Card } from "@nextui-org/react"
import { Skeleton } from "@mantine/core"

const LoadingProductSkeleton = () => {
    return (
        <Grid.Container gap={4}>
            <Grid xs={12} sm={3}>
                <Skeleton radius="lg">
                    <Card className="h-[340px]">

                    </Card>
                </Skeleton>
            </Grid>
            <Grid xs={12} sm={3}>
                <Skeleton radius="lg">
                    <Card className="h-[340px]">

                    </Card>
                </Skeleton>
            </Grid>
            <Grid xs={12} sm={3}>
                <Skeleton radius="lg">
                    <Card className="h-[340px]">

                    </Card>
                </Skeleton>
            </Grid>
            <Grid xs={12} sm={3}>
                <Skeleton radius="lg">
                    <Card className="h-[340px]">

                    </Card>
                </Skeleton>
            </Grid>
            <Grid xs={12} sm={3}>
                <Skeleton radius="lg">
                    <Card className="h-[340px]">

                    </Card>
                </Skeleton>
            </Grid>
            <Grid xs={12} sm={3}>
                <Skeleton radius="lg">
                    <Card className="h-[340px]">

                    </Card>
                </Skeleton>
            </Grid>
            <Grid xs={12} sm={3}>
                <Skeleton radius="lg">
                    <Card className="h-[340px]">

                    </Card>
                </Skeleton>
            </Grid>
            <Grid xs={12} sm={3}>
                <Skeleton radius="lg">
                    <Card className="h-[340px]">

                    </Card>
                </Skeleton>
            </Grid>
        </Grid.Container>
    )
}

export default LoadingProductSkeleton