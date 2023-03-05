import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom"  

import Header from "../components/header/Header";

import Home from "../pages/Home";
import Login from "../pages/Login";
import OAuthInit from "../pages/OAuthInit";
import OAuthLogin from "../pages/OAuthLogin";
import Register from "../pages/Register";

const Router = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/oauthlogin" element={<OAuthLogin />} />
                <Route path="/oauthlogin/init" element={<OAuthInit />} />
            </Routes>
        </BrowserRouter>
    )
}
export default Router;