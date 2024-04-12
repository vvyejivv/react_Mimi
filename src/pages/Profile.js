import { useState, useEffect } from "react";
import Menu from '../components/Menu';
import { json } from "react-router-dom";
import { useParams } from "react-router-dom";
import './Profile.css';
function Profile() {
    const userId = sessionStorage.getItem("userId");
    const [postList, setPostList] = useState([]);
    const [userName, setUserName] = useState("");
    const [userIntro, setUserIntro] = useState("");
    const [userPostCnt, setUserPostCnt] = useState("");
    const [userInfo, setUserInfo] = useState(null);
    useEffect(() => {
        async function fetchList() {
            try {
                const response = await fetch(`http://localhost:4000/profilePhoto.dox?userId=${userId}`);
                const jsonData = await response.json();
                console.log(jsonData);
                setUserInfo(jsonData[0]);
            } catch (error) {
                console.error("!!error!!");
            }
        }
        fetchList();
    }, []);
    useEffect(() => {
        async function fetchList() {
            try {
                const response = await fetch(`http://localhost:4000/postList.dox?userId=${userId}`);
                const jsonData = await response.json();
                console.log(jsonData);
                setPostList(jsonData);
                setUserIntro(jsonData[0].INTRO);
                setUserPostCnt(jsonData[0].POSTCNT);
                setUserName(jsonData[0].NAME);

            } catch (error) {
                console.error("!!error!!");
            }
        }
        fetchList();
    }, []);

    return <div id="profileContainer">
        <div id="profileBox">
            <div id="profileTitleBox">
                <div id="profileTitleSmallBox">
                    <div id="leftTitleBox">
                        <div id="leftTitleSmallBox">
                            {userInfo != null ? (
                                <div id="userImg"><img src={`http://localhost:4000/${userInfo.FILENAME}`} alt="post image" /></div>
                            ) : (
                                <div id="userInfoImg"></div>
                            )}
                            <div id="profileUserInfoBox">
                                <div id="profileUserNameBox">
                                    <div id="profileNameTxt">{userName}</div>
                                    <div id="profileIdTxt"><span>@</span>{userId}</div>
                                </div>
                                {userId ? (
                                    <div id="profileUpdateBtn">
                                        <button onClick={() => {
                                            window.location.href = "http://localhost:3000/UserInfo";
                                        }}>프로필 수정</button>
                                    </div>
                                ) : ("")}
                            </div>
                        </div>
                    </div>
                    <div id="profileUserIntroBox">{userIntro}</div>
                </div>
            </div>
            <div id="feedListBox">
                <div id="feedContainer" className="row">
                    {postList.map(item => (
                        <div id="feedBox" className="col-md-2" key={item.POSTNO}>
                            <a href="#" onClick={() => {
                                window.location.href = `http://localhost:3000/postDetailView/${item.POSTNO}`;
                            }}>
                                <div id="feedSmallBox">
                                    <div id="feedUserInfo">
                                        <div id="feedUserInfoBox">
                                            {item.USERPATH && item.USERPATH !== "null" ? (
                                                <div id="userImg"><img src={`http://localhost:4000/${item.USERPATH}`} alt="post image" /></div>
                                            ) : (
                                                <div id="userInfoImg"></div>
                                            )}
                                            <div id="feedUserId">{item.USERID}</div>
                                        </div>
                                        <div id="feedUserDate">{item.CDATE}</div>
                                    </div>
                                    {item.PATH == "null" || item.PATH == "" ? <div id="feedContentsImg"><img src=""></img></div> : ""}
                                    <div id="feedTitleBox">
                                        <div id="feedTitleTxt">{item.TITLE}</div>
                                    </div>
                                    <div id="feedContentsBox">
                                        <div id="postContents">
                                            {item.PATH && item.PATH !== "null" && (
                                                <div id="postPhoto"><img src={`http://localhost:4000/${item.PATH}`} alt="post image" /></div>
                                            )}
                                            {item.CONTENTS}
                                        </div>
                                       
                                    </div>
                                    <div id="feedLikesCmtBox">
                                        <div id="feedLikesCmtSmallBox">
                                            <div id="feedHeartBox">
                                                <div id="feedHeart"></div>
                                                <div id="feedHeartTxt">{item.LIKES}</div>
                                            </div>
                                            <div id="feedCmtBox">
                                                <div id="feedCmt"></div>
                                                <div id="feedCmtTxt">{item.COMMENTCNT}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
}
export default Profile;