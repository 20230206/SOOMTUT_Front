import styles from "../assets/styles/routes/home.module.css"

import React from "react";
import HomeEventCarousel from "../components/carousels/HomeEventCarousel";
import SearchBar from "../components/inputs/SearchBar";
import { Button, Card } from "react-bootstrap";

import example from "../assets/images/example.jpg"
import HomeCardCarousel from "../components/carousels/HomeCardCarousel";

const Home = () => {

    return (
        <div className={styles.wrap}>
            <HomeEventCarousel />
            <SearchBar />
            <div className={styles.cards}>
            <div style={{display:"flex", marginBottom:"10px", borderBottom:"1px solid"}}>
                <Button style={{marginRight:"5px"}}>공지사항</Button>
                <Button style={{marginRight:"5px"}}>이벤트</Button>
                <Button style={{marginRight:"5px"}}>인기수업</Button>
                <div style={{width:"600px"}}></div>
                <Button style={{width:"180px",justifyContent:"flex-end"}}>내 주변 튜터 찾기</Button>
            </div>
                <HomeCardCarousel />
            </div>
        </div>
    );
}

export default Home;