import styles from "../assets/styles/routes/home.module.css"

import React from "react";
import HomeCarousel from "../components/carousels/HomeCarousel";
import SearchBar from "../components/inputs/SearchBar";

const Home = () => {

    return (
        <div className={styles.wrap}>
            <HomeCarousel />
            <SearchBar />
        </div>
    );
}

export default Home;