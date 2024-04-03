import { Link } from "react-router-dom" //a태그 대신에 깜빡이지 않게 해주는 라우터안의 기능

//Nav : 상단의 메뉴라는 의미로 많이 씀
function Navbar(){
    return <nav>
        <ul>
            <li><Link to="/">홈</Link></li>
            <li><Link to="/profile">프로필</Link></li>
        </ul>
    </nav>
}
export default Navbar;