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
import MyFavList from "./routes/mypage/MyFavList";
import MyClassList from "./routes/mypage/MyClassList";
import MyClassedList from "./routes/mypage/MyClassedList";
import MyChatList from "./routes/mypage/MyChatList";

import PostList from "./routes/post/PostList";
import CreatePost from "./routes/post/CreatePost"
import GetPost from "./routes/post/GetPost";
import ChatRoom from "./components/ChatRoom";


function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/oauthlogin" element={ <OAuthLogin />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/favlist" element={<MyFavList />} />
          <Route path="/mypage/myclasslist" element={<MyClassList/>} />
          <Route path="/mypage/myclassedlist" element={<MyClassedList />} />
          <Route path="/mypage/chat" element={<MyChatList />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/posts/:id" element={<GetPost />} />
          <Route path="/posts/create" element={<CreatePost />} />

          <Route path="/chat/:id" element={<ChatRoom />} />
      </Routes>
    </Router>
  );
}

export default App;
