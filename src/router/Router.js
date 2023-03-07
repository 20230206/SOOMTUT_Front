import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom"  
import ChatRoom from "../components/ChatRoom";

import Header from "../components/header/Header";

import { 
    Home,
    Login,
    OAuthInit,
    OAuthLogin,
    Register
} from "../pages"; 
import CreateLecture from "../pages/CreateLecture";
import GetLecture from "../pages/GetLecture";

import Lectures from "../pages/Lectures";
import ManageLecture from "../pages/ManageLecture";
import MyPage from "../pages/MyPage";

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
                <Route path="/lectures/create" element={<CreateLecture />} />
                <Route path="/lectures/:id" element={<GetLecture />} />

                <Route path="/mypage" element={<MyPage />} />

                <Route path="/manage/lecture" element={<ManageLecture />} />

                <Route path="/chat" element={<ChatRoom />} />
            </Routes>
        </BrowserRouter>
    )
}
export default Router;