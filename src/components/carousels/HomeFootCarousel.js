import styles from "../../assets/styles/components/carousel/homefoot.module.css"

import { Carousel } from "react-bootstrap";
import HomeFootCard from "../cards/HomeFootCard";

function HomeFootCarousel() {

    return (
      <Carousel className={styles.carousel} variant="dark" interval={null} >
        <Carousel.Item>
          <div className={styles.carouselSlide}>
            <HomeFootCard />
            <HomeFootCard />
            <HomeFootCard />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className={styles.carouselSlide}>
            <HomeFootCard />
            <HomeFootCard />
            <HomeFootCard />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className={styles.carouselSlide}>
            <HomeFootCard />
            <HomeFootCard />
            <HomeFootCard />
          </div>
        </Carousel.Item>
      </Carousel>
    )
}
export default HomeFootCarousel;