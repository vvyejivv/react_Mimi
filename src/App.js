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
    <div style={{display :"flex"}}>
    <Router>
      <Navbar />
      {/* 어떤 주소들을 가져갈지 정의 */}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/Setting" element={<Setting />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/UserJoin" element={<UserJoin />}></Route>
        <Route path="/UserInfo" element={<UserInfo />}></Route>
        <Route path="/Posts" element={<Posts />}></Route>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
