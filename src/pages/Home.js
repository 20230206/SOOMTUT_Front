import styles from "../assets/styles/routes/home.module.css"

import React from "react";
import HomeFrontCarousel from "../components/carousels/HomeFrontCarousel";
import SearchBar from "../components/inputs/SearchBar";
import { Button, Card } from "react-bootstrap";

import example from "../assets/images/example.jpg"
import HomeFootCarousel from "../components/carousels/HomeFootCarousel";

const Home = () => {
    return (
        <div className={styles.wrap}>
            <HomeFrontCarousel />
            <SearchBar />
            <div className={styles.footContents}>
              <div className={styles.footMenuBar}>
                <div className={styles.footMenuSelector}>
                  <Button className={styles.footMenuButtons}>공지사항</Button>
                  <Button className={styles.footMenuButtons}>이벤트</Button>
                  <Button className={styles.footMenuButtons}>인기수업</Button>
                </div>
                <div style={{width:"500px"}}></div>
                <Button style={{width:"180px",justifyContent:"flex-end"}}>내 주변 튜터 찾기</Button>
              </div>
                <HomeFootCarousel />
            </div>
        </div>
    );
}

export default Home;