import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom"  
import ChatRoom from "../components/window/ChatRoom";

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
import MyPage from "../pages/MyPage";
import FindTutor from "../routes/findtutor/FindTutor";

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

                <Route path="/chat" element={<ChatRoom />} />

                <Route path="/maps" element={<FindTutor />} />
            </Routes>
        </BrowserRouter>
    )
}
export default Router;