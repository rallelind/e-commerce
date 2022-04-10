import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Card } from '@nextui-org/react';

const ImageSlider = (props) => {

    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
      };
    
      function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, right: "0", zIndex: "1"  }}
            onClick={onClick}
          >
          </div>
        );
      }
      
      function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, left: "0", zIndex: "1"  }}
            onClick={onClick}
          >
          </div>
        );
      }
    

    return (
        <div>
            <Slider {...settings}>
                {props.images.map((image, i) => ( 
                    <Card.Image
                        key={i}
                        src={image} 
                        alt="productImage" 
                        height={340}
                    />
                ))}
            </Slider>
        </div>
    )
}

export default ImageSlider