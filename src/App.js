import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import { Routes, Route, BrowserRouter as Router} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css' //다른곳에서도 bootstrap 문법 사용 가능

function App() {
  return (
    <div>
    <Router>
      <Navbar />
      {/* 어떤 주소들을 가져갈지 정의 */}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
