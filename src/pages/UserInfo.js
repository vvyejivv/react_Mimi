import { useState, useEffect } from "react";
import { json } from "react-router-dom";
import './UserInfo.css';
import './Posting.css';
function UserInfo() {
    const userId = sessionStorage.getItem("userId");
    const [userInfo, setUserInfo] = useState([]);
    const [userIntro, setUserIntro] = useState("");
    const [pwd, setPwd] = useState("");
    const [userName, setUserName] = useState("");
    const [birth, setBirth] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        async function fetchList() {
            try {
                const response = await fetch(`http://localhost:4000/userInfo.dox?userId=${userId}`);
                const jsonData = await response.json();
                setUserInfo(jsonData.userInfo);
                setUserIntro(jsonData.userInfo.INTRO || "");
                setUserName(jsonData.userInfo.NAME || "");
                setBirth(jsonData.userInfo.BIRTH || "");
                setPhone(jsonData.userInfo.PHONE || "");
                setEmail(jsonData.userInfo.EMAIL || "");

            } catch (error) {
                console.error("!!error!!");
            }
        }
        fetchList();
    }, [userId]);

    const fnUserIntro = (e) => {
        setUserIntro(e.target.value);
    }
    const fnUserPwd = (e) => {
        setPwd(e.target.value);
    }
    const fnUserName = (e) => {
        setUserName(e.target.value);
    }
    const fnUserBirth = (e) => {
        setBirth(e.target.value);
    }
    const fnUserPhone = (e) => {
        setPhone(e.target.value);
    }
    const fnUserEmail = (e) => {
        setEmail(e.target.value);
    }
    const fnInfoUpdate = () => {
        async function fnUserInfoUpdate() {
            try {
                let str = `pwd=${pwd}&name=${userName}&birth=${birth}&phone=${phone}&email=${email}&intro=${userIntro}&userId=${userId}`;
                const response = await fetch(`http://localhost:4000/userInfoUpdate.dox?${str}`);
                const jsonData = await response.json();
                if (jsonData.result == "success") {
                    alert(jsonData.msg);
                    window.location.href = `http://localhost:3000/profile?userId=${userId}`;
                } else if (jsonData.result == "fail") {
                    alert("다시 시도 바랍니다.");
                    return;
                }


            } catch (error) {
                console.error("에러!");
            }
        }
        fnUserInfoUpdate();
    }



    return <div id="userInfoContainer">
        <div id="userInfoBox">
            <div id="beforeBtn" onClick={() => {
                window.history.back();
            }}>←</div>
            {/* 내 정보에 프로필 사진 첨부 해야함 */}
            <div id="userInfoSmallBox">
                <div id="userInfo_title">내 정보 수정</div>

                <div className="userInfo_flex">
                    <div>프로필 사진</div>
                    <input type="file"></input>
                </div>
                <div className="userInfo_flex">
                    <div>소개글</div>
                    <input type="text" onChange={fnUserIntro} value={userIntro} ></input>
                </div>
                <div className="userInfo_flex">
                    <div>아이디 </div>
                    <input type="text" value={userId} disabled></input>
                </div>
                <div className="userInfo_flex">
                    <div>비밀번호 </div>
                    <input type="password" onChange={fnUserPwd} value={pwd} ></input>
                </div>
                {pwd == "" && <div><span>*</span> 비밀번호를 입력해주세요!</div>}
                <div className="userInfo_flex">
                    <div>이름 </div>
                    <input type="text" onChange={fnUserName} value={userName}></input>
                </div>
                <div className="userInfo_flex">
                    <div>생년월일 </div>
                    <input type="text" placeholder="ex : 19971025" onChange={fnUserBirth} value={birth}></input>
                </div>
                <div className="userInfo_flex">
                    <div>연락처 </div>
                    <input type="text" placeholder="ex : 0100000000" onChange={fnUserPhone} value={phone}></input>
                </div>
                <div className="userInfo_flex">
                    <div>이메일 </div>
                    <input type="text" placeholder="ex : abcd@abcd.com" onChange={fnUserEmail} value={email}></input>
                </div>
                <div>
                    <button onClick={fnInfoUpdate}>수정하기</button>
                    <button onClick={() => {
                        window.history.back();
                    }}>취소</button>
                </div>
            </div>
        </div>
    </div>
}
export default UserInfo;