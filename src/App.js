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
import MyBookmarkList from "./routes/mypage/MyBookmarkList";
import MyClassedList from "./routes/mypage/MyClassedList";
import MyClassList from "./routes/mypage/MyClassList";



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
          <Route path="/mypage/bookmark" element={<MyBookmarkList />} />
          <Route path="/mypage/myclassedlist" element={<MyClassedList />} />
          <Route path="/mypage/myclasslist" element={<MyClassList />} />

          <Route path="/lecture" element={<LectureList />} />
          <Route path="/lecture/:id" element={<GetLecture />} />
          <Route path="/lecture/create" element={<CreateLecture />} />

      </Routes>
    </Router>
  );
}

export default App;
