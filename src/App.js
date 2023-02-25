import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"

import Home from "./routes/Home"
import Login from "./routes/Login";
import Register from "./routes/Register";
import OAuthLogin from "./routes/OAuthLogin"

import MyPage from "./routes/mypage/MyPage";
import MyBookmarkList from "./routes/mypage/MyBookmarkList";
import MyClassList from "./routes/mypage/MyClassList";
import MyClassedList from "./routes/mypage/MyClassedList";
import MyChatList from "./routes/mypage/MyChatList";

import LectureList from "./routes/lecture/LectureList";
import CreateLecture from "./routes/lecture/CreateLecture"
import GetLecture from "./routes/lecture/GetLecture";
import ChatRoom from "./components/ChatRoom";
import FindTutor from "./routes/findtutor/FindTutor";


function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/oauthlogin" element={ <OAuthLogin />} />

          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/favlist" element={<MyBookmarkList />} />
          <Route path="/mypage/myclasslist" element={<MyClassList/>} />
          <Route path="/mypage/myclassedlist" element={<MyClassedList />} />
          <Route path="/mypage/chat" element={<MyChatList />} />

          <Route path="/lecture" element={<LectureList />} />
          <Route path="/lecture/:id" element={<GetLecture />} />
          <Route path="/lecture/create" element={<CreateLecture />} />

          <Route path="/chat/:id" element={<ChatRoom />} />
          <Route path="/findtutor" element={<FindTutor />} />
      </Routes>
    </Router>
  );
}

export default App;
