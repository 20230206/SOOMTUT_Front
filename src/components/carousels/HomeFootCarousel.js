import styles from "../../assets/styles/components/carousel/homefoot.module.css"

import { Carousel } from "react-bootstrap";
import HomeFootCard from "../cards/HomeFootCard";
import { useEffect, useState } from "react";
import axios from "axios";


function HomeFootCarousel() {

  const [lectures, setLectures] = useState();

  useEffect(() => {
    if(!lectures) GetLecture();
  }, [lectures])

  const GetLecture = () => {
    axios.defaults.withCredentials=true;
    var config = {
      method: 'get',
    maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_HOST}/lecture/public/popular`,
    };

    axios(config)
    .then(function (response) {
      console.log(response.data.data)
      setLectures(response.data.data)
    })
    .catch(function (error) {
    });

  }
    return (
      <Carousel className={styles.carousel} variant="dark" interval={null} >
        <Carousel.Item>
          <div className={styles.carouselSlide}>
           { lectures && <HomeFootCard lecture={lectures[0]}/> }
           { lectures && <HomeFootCard lecture={lectures[1]}/> }
           { lectures && <HomeFootCard lecture={lectures[2]}/> }
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className={styles.carouselSlide}>
           { lectures && <HomeFootCard lecture={lectures[3]}/> }
           { lectures && <HomeFootCard lecture={lectures[4]}/> }
           { lectures && <HomeFootCard lecture={lectures[5]}/> }
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className={styles.carouselSlide}>
           { lectures && <HomeFootCard lecture={lectures[6]}/> }
           { lectures && <HomeFootCard lecture={lectures[7]}/> }
           { lectures && <HomeFootCard lecture={lectures[8]}/> }
          </div>
        </Carousel.Item>
      </Carousel>
    )
}
export default HomeFootCarousel;