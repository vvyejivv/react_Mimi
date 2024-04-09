import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Setting from './pages/Setting';
import Profile from './pages/Profile';
import UserJoin from './pages/UserJoin';
import UserInfo from './pages/UserInfo';
import Posts from './pages/Posts';
import Posting from './pages/Posting';
import PostDetailView from './pages/PostDetailView';
import Msg from './pages/Msg';
import Navbar from './components/Navbar';
import { useState } from "react";
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css' //다른곳에서도 bootstrap 문법 사용 가능

function App() {
  const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
  return (
    <div style={{display : "flex", flexDirection : "column"}}>
      <Router>
        {userId ? ( 
          <>
             <Navbar /> 
            <Routes>
              <Route path="/profile" element={<Profile />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="/userInfo" element={<UserInfo />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/posting" element={<Posting />} />
              <Route path="/postDetailView/:postNo" element={<PostDetailView />} />
              {/* <Route path="/msg" element={<Msg />} /> */}
            </Routes>
          </>
         ) : ( 
           <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/userJoin" element={<UserJoin />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
