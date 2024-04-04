import { Link } from "react-router-dom" //a태그 대신에 깜빡이지 않게 해주는 라우터안의 기능

//Nav : 상단의 메뉴라는 의미로 많이 씀
function Navbar(){
    return <nav>
        <div id="sidebar">
            <div>
                <img id="logoImg" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"></img>
            </div>
            
            <div>
                <ul id="sidebarUl">
                    <li><Link to="/">홈</Link></li>
                    {/* <li><Link to="/search">검색</Link></li>
                    <li><Link to="/recommend">추천</Link></li>
                <li><Link to="/chat">DM</Link></li> */}
                    <li><Link to="/profile">프로필</Link></li>
                </ul>
            </div>
            <div><Link to="/setting">설정</Link></div>
            <div><Link to="/login">로그인</Link></div>
            <div><Link to="/userJoin">회원가입</Link></div>
            </div>
    </nav>
}
export default Navbar;