import SoomtutNavbar from "../components/SoomtutNavbar";
import HomeContents from "../components/HomeContents";

function Home() {
    const [View, token, member] = SoomtutNavbar();

    return (
        <div>
         <View />
         <HomeContents />
        </div>
    );
}

export default Home;