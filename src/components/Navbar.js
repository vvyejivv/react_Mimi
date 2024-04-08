import { useState } from "react";
import { Link } from "react-router-dom" //a태그 대신에 깜빡이지 않게 해주는 라우터안의 기능

//Nav : 상단의 메뉴라는 의미로 많이 씀
function Navbar() {
    const [userId, setUserId] = useState(sessionStorage.getItem("userId"));


    return <nav>
        <div id="sidebar">
            <div id="sidebarContainer">
                <div id="sidebarTitleBox">
                    <div id="sidebarTitle"><a href="http://localhost:3000/Posts">Mimi</a></div>
                    <div id="sidebarTitlePoint"></div>
                </div>
                <div id="sidebarBox">
                    <div id="sidebarUserInfo">
                        <div id="userBox">
                            <div id="userImg"></div>
                            <div id="userId">{userId}</div>
                        </div>
                        <div id="followingBox">
                            <div id="following">
                                <div className="followTxt">팔로잉</div>
                                <div className="followCnt">100</div>
                            </div>
                            <div id="followBox">
                                <div className="followTxt">팔로워</div>
                                <div className="followCnt">100</div>
                            </div>
                        </div>
                    </div>
                    <div id="sidebarMenu">
                        <ul id="sidebarUl">
                            <li><Link to="/Posts" style={{ textDecoration: 'none', color: "#161616" }}>홈</Link></li>
                            <li><Link to="/userInfo" style={{ textDecoration: 'none', color: "#161616" }}>내 프로필</Link></li>
                            <li><Link to="/profile" style={{ textDecoration: 'none', color: "#161616" }}>둘러보기</Link></li>
                            <li>
                                <div id="msgBox">
                                    <Link to="/Msg" style={{ textDecoration: 'none', color: "#161616" }}>메시지</Link>
                                    <div id="msgCnt">+</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div id="sideBottom">
                        <button>글쓰기</button>
                        <div id="logOutBox">
                            {userId ? (<div><a href="#" onClick={async function logout() {
                                await setUserId(sessionStorage.removeItem("userId"));
                                window.location.href = "http://localhost:3000/";
                            }}>
                                로그아웃</a></div>) : (<div> <Link to="/login">로그인</Link></div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
}
export default Navbar;