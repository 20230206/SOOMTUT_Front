import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom"  
import Header from "../components/header/Header";

import Home from "../pages/Home";

const Router = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}
export default Router;