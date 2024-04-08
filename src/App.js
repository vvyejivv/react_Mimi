import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Setting from './pages/Setting';
import Profile from './pages/Profile';
import UserJoin from './pages/UserJoin';
import UserInfo from './pages/UserInfo';
import Posts from './pages/Posts';
import Navbar from './components/Navbar';
import { Routes, Route, BrowserRouter as Router} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css' //다른곳에서도 bootstrap 문법 사용 가능

function App() {
  return (
    <div>
      <Router>
        {/* {userId ? ( */}
          <>
            {/* <Navbar /> */}
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="/userJoin" element={<UserJoin />} />
              <Route path="/userInfo" element={<UserInfo />} />
              <Route path="/posts" element={<Posts />} />
            </Routes>
          </>
        {/* ) : ( */}
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        {/* )} */}
      </Router>
    </div>
  );
}

export default App;
