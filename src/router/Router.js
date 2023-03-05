import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom"  

import Header from "../components/header/Header";

import { Home,
    Login,
OAuthInit,
OAuthLogin,
Register} from "../pages"; 

import Lectures from "../pages/Lectures";

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

                <Route path="/lectures" element={<Lectures />} />
            </Routes>
        </BrowserRouter>
    )
}
export default Router;