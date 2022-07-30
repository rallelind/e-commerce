import { MediaQuery, Header } from "@mantine/core";
import { Text, Divider } from "@nextui-org/react";

const HeaderSection = ({
  productInfo,
  numberOfNights,
  priceForStay,
  serviceCost,
}) => {
  return (
    <MediaQuery largerThan="md" styles={{ display: "none" }}>
      <Header height="100%">
        <div className="flex items-center m-5">
          <img
            src={productInfo.image[0]}
            className="h-[100px] w-[100px] rounded-lg"
          />
          <Text 
            h3
            css={{
                textGradient:
                  "112deg, #06B7DB -63.59%, #FF4ECD -20.3%, #0072F5 70.46%",
              }}
            >{productInfo.title}</Text>
        </div>
        <Divider />
        <div className="m-2">
          <Text
            h4
          >
            Booking information
          </Text>
          <div className="flex justify-between m-1">
            <Text h5>
              {productInfo.price} x {numberOfNights} nights
            </Text>
            <Text h5>{priceForStay}</Text>
          </div>
          <div className="flex justify-between m-1">
            <Text h5>Service cost</Text>
            <Text h5>{serviceCost}</Text>
          </div>
          <div className="flex justify-between m-1">
            <Text h5>Total cost</Text>
            <Text h5>{priceForStay + serviceCost}</Text>
          </div>
        </div>
      </Header>
    </MediaQuery>
  );
};

export default HeaderSection;
