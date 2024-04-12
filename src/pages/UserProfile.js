import { useState, useEffect } from "react";
import Menu from '../components/Menu';
import { json } from "react-router-dom";
import { useParams } from "react-router-dom";
import './Profile.css';
function Profile() {
    const sessionId = sessionStorage.getItem("userId");
    const { userId } = useParams();
    const [postList, setPostList] = useState([]);
    const [userName, setUserName] = useState("");
    const [userIntro, setUserIntro] = useState("");
    const [userPostCnt, setUserPostCnt] = useState("");
    const [userFollow, setUserFollow] = useState("");
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
                setPostList(jsonData);
                setUserIntro(jsonData[0].INTRO);
                setUserPostCnt(jsonData[0].POSTCNT);
                setUserName(jsonData[0].NAME);
            } catch (error) {
                console.error("!!error!!");
            }
        }
        fetchList();
    }, [userId]);
    useEffect(() => {
        async function fetchSelectFollow() {
            try {
                const response = await fetch(`http://localhost:4000/selectFollow.dox?userId=${userId}&sessionId=${sessionId}`);
                const jsonData = await response.json();
                setUserFollow(jsonData.follow);
            } catch (error) {
                console.error("!!error!!");
            }
        }
        fetchSelectFollow();
    }, []);
    const fnFollow = () => {
        async function fetchfollowing() {
            try {
                const response = await fetch(`http://localhost:4000/following.dox?userId=${userId}&sessionId=${sessionId}`);
                const jsonData = await response.json();
                if (jsonData.result == "success") {
                    alert(jsonData.msg);
                    window.location.href = `http://localhost:3000/userProfile/${userId}`;
                } else {
                    alert("이미 추가되어있습니다.");
                    return;
                }

            } catch (error) {
                console.error("에러!");
            }
        }
        fetchfollowing();
    }

    const fnUnFollow = () => {
        async function fetchUnfollow() {
            try {
                if (window.confirm("정말 팔로우 취소하시겠습니까?")) {
                    const response = await fetch(`http://localhost:4000/followDelete.dox?userId=${userId}&sessionId=${sessionId}`);
                    const jsonData = await response.json();
                    if (jsonData.result == "success") {
                        alert(jsonData.msg);
                        window.location.href = `http://localhost:3000/userProfile/${userId}`;
                    }
                }
            } catch (error) {
                console.error("에러!");
            }
        }
        fetchUnfollow();
    }
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
                                {userFollow != "" ? <div id="followBtn"><button onClick={fnUnFollow}>팔로우 취소</button></div> : <div id="followBtn"><button onClick={fnFollow}>팔로우</button></div>}
                                {userId == sessionId ? (
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
                    {/* 사진 있을때 */}
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
                                        <div id="feedContentsTxt">
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