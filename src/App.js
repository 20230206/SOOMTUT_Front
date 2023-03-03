import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"

import Home from "./routes/Home"
import Login from "./routes/auths/Login"
import Register from "./routes/auths/Register";
import OAuthLogin from "./routes/auths/OAuthLogin";
import OAuthInit from "./routes/auths/OAuthInit";

import MyPage from "./routes/mypage/MyPage"
import LectureList from "./routes/lecture/LectureList"
import CreateLecture from "./routes/lecture/CreateLecture"
import GetLecture from "./routes/lecture/GetLecture";
import GetMemberLecture from "./routes/lecture/GetMemberLecture";
import Bookmark from "./routes/mypage/Bookmark";
import MyLectureList from "./routes/mypage/MyLectureList";

import FindTutor from "./routes/findtutor/FindTutor"
import ChatRoom from "./components/ChatRoom";
import GetMemberLectureList from "./routes/lecture/GetMemberLectureList";
import ManageLecture from "./routes/mypage/ManageLecture";


function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/oauthlogin" element={<OAuthLogin />} />
          <Route path="/oauthlogin/init" element={<OAuthInit />} />

          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/bookmark" element={<Bookmark />} />
          <Route path="/mypage/myLecturelist" element={<MyLectureList />} />
          <Route path="/mypage/manage" element={<ManageLecture />} />

          <Route path="/lecture" element={<LectureList />} />
          <Route path="/lecture/:id" element={<GetLecture />} />
          <Route path="/lecture/member/:id" element={<GetMemberLecture />} />
          <Route path="/lecture/create" element={<CreateLecture />} />
          <Route path="/lectureList/member/:id" element={<GetMemberLectureList />} />

          <Route path="/findtutor" element={<FindTutor />} />

          <Route path="/chat" element={<ChatRoom />} />
      </Routes>
    </Router>
  );
}

export default App;
