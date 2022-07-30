import React from "react"
import { GiGasStove, GiKitchenTap, GiWaterGallon } from "react-icons/gi"
import { MdKitchen } from "react-icons/md"
import { FaShower } from "react-icons/fa"
import { BiFridge, BiWifi } from "react-icons/bi"
import { Card, Grid } from "@nextui-org/react"

const FeaturesCards: React.FC<{ features: string[] }> = ({ features }) => {
    return (
        <Grid.Container justify="space-between">
            {features.map((feature, index) => (
            <Grid className="m-1" key={index} >
                <Card shadow={false} color="gradient">
                    {feature === "stove" && <GiGasStove size={20} />}
                    {feature === "waterSystem" && <GiKitchenTap size={20} />}
                    {feature === "kitchen" && <MdKitchen size={20} />}
                    {feature === "shower" && <FaShower size={20} />}
                    {feature === "wifi" && <BiWifi size={20} />}
                    {feature === "fridge" && <BiFridge size={20} />}
                    {feature === "waterTanks" && <GiWaterGallon size={20} />}
                </Card>
            </Grid>
            ))
            }
        </Grid.Container>
    )
}

export default FeaturesCards