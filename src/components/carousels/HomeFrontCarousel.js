import styles from "../../assets/styles/components/carousel/homefront.module.css"

import React from "react";
import { Carousel } from "react-bootstrap";
import slide1 from "../../assets/images/1.png";
import slide2 from "../../assets/images/2.png";
import slide3 from "../../assets/images/3.png";

function HomeFrontCarousel() {
    return (
    <Carousel variant="dark" className={styles.carousel} >
      <Carousel.Item>
        <img
          className={styles.carouselimg}
          src={slide1}
          alt="First slide"
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className={styles.carouselimg}
          src={slide2}
          alt="Second slide"
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className={styles.carouselimg}
          src={slide3}
          alt="Third slide"
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    );
}

export default HomeFrontCarousel;