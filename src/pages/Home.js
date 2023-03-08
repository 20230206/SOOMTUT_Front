import styles from "../assets/styles/routes/home.module.css"

import React from "react";
import HomeFrontCarousel from "../components/carousels/HomeFrontCarousel";
import HomeFootCarousel from "../components/carousels/HomeFootCarousel";

const Home = () => {
    return (
        <div className={styles.wrap}>
            <HomeFrontCarousel />
            <div className={styles.footContents}>
                
              <div className={styles.footMenuBar}>
                  
                <div className={styles.footMenuSelector}>
                    <span> 🔥 실시간 인기 클래스 🔥 </span>
                </div>
              </div>
              <HomeFootCarousel/>
                
            </div>
            
        </div>
    );
}

export default Home;