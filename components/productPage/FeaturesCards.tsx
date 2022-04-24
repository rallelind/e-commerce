import React from "react"
import { GiGasStove, GiKitchenTap, GiWaterGallon } from "react-icons/gi"
import { MdKitchen } from "react-icons/md"
import { FaShower } from "react-icons/fa"
import { BiFridge, BiWifi } from "react-icons/bi"
import { Card, Grid } from "@nextui-org/react"

const FeaturesCards: React.FC<{ features: string[] }> = ({ features }) => {
    return (
        <Grid.Container justify="space-between">
            {features.map((e, i) => (
            <Grid key={i}>
                <Card shadow={false} color="gradient">
                    {e === "stove" && <GiGasStove size={25} />}
                    {e === "waterSystem" && <GiKitchenTap size={25} />}
                    {e === "kitchen" && <MdKitchen size={25} />}
                    {e === "shower" && <FaShower size={25} />}
                    {e === "wifi" && <BiWifi size={25} />}
                    {e === "fridge" && <BiFridge size={25} />}
                    {e === "waterTanks" && <GiWaterGallon size={25} />}
                </Card>
            </Grid>
            ))
            }
        </Grid.Container>
    )
}

export default FeaturesCards