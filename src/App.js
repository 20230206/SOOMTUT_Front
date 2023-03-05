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
import Bookmark from "./routes/mypage/Bookmark";
import MyLectureList from "./routes/mypage/MyLectureList";
import ManageLecture from "./routes/mypage/ManageLecture";
import MyReview from "./routes/mypage/MyReview";

import FindTutor from "./routes/findtutor/FindTutor"
import ChatRoom from "./components/ChatRoom";
import GetMemberLectureList from "./routes/lecture/GetMemberLectureList";
import GeLectureKeyword from "./routes/lecture/GeLectureKeyword";
import GetLectureListByKeyword from "./routes/lecture/GetLectureListByKeyword";

import ManageLecture from "./routes/mypage/ManageLecture";
import UpdateLecture from "./routes/lecture/UpdateLecture";

import GetMemberReviews from "./routes/reviews/GetMemberReviews";



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
          <Route path="/mypage/myLecture" element={<MyLectureList />} />
          <Route path="/mypage/manage" element={<ManageLecture />} />
          <Route path="/mypage/myReview" element={<MyReview />} />

          <Route path="/lecture" element={<LectureList />} />
          <Route path="/lecture/:id" element={<GetLecture />} />
          <Route path="/lecture/create" element={<CreateLecture />} />
          <Route path="/lectureList/member/:id" element={<GetMemberLectureList />} />
          <Route path="/lecture/search/:keyword" element={<GetLectureListByKeyword />} />
          <Route path="/lecture/search/:id/:keyword" element={<GeLectureKeyword />} />

          <Route path="/lecture/update/:id" element={<UpdateLecture />} />

          

          <Route path="/findtutor" element={<FindTutor />} />

          <Route path="/chat" element={<ChatRoom />} />

          <Route path="/reviews" element={<GetMemberReviews />} />
      </Routes>
    </Router>
  );
}

export default App;
