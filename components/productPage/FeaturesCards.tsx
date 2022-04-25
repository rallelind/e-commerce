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
                    {e === "stove" && <GiGasStove size={20} />}
                    {e === "waterSystem" && <GiKitchenTap size={20} />}
                    {e === "kitchen" && <MdKitchen size={20} />}
                    {e === "shower" && <FaShower size={20} />}
                    {e === "wifi" && <BiWifi size={20} />}
                    {e === "fridge" && <BiFridge size={20} />}
                    {e === "waterTanks" && <GiWaterGallon size={20} />}
                </Card>
            </Grid>
            ))
            }
        </Grid.Container>
    )
}

export default FeaturesCards