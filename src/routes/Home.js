import React from "react";
import CustomNavbar from "../components/CustomNavbar";
import HomeContents from "../components/HomeContents"

function Home() {
    const [Model] = CustomNavbar();

    return (
        <div>
            <Model />
            <HomeContents />
        </div>
    );
}

export default Home;