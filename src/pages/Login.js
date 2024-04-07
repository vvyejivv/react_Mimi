import { useState, useEffect } from "react";
import './Login.css';
function Login() {
    const [userId, setUserId] = useState("");
    const [pwd, setPwd] = useState("");
    const fnUserId = (e) => {
        setUserId(e.target.value);
    }
    const fnUserPwd = (e) => {
        setPwd(e.target.value);
    }
    const fnSubmit = () => {
        async function fetchUserId() {
            try {
                const response = await fetch(`http://localhost:4000/login.dox?userId=${userId}&pwd=${pwd}`);
                const jsonData = await response.json();
                console.log(jsonData.result);
                if (jsonData.result == "success") {
                    await sessionStorage.setItem('userId', userId);     // sessionStrorage에 저장
                    window.location.href = `http://localhost:3000/Posts?userId=${userId}`;
                } else {
                    alert("로그인이 실패했습니다. 다시 시도하세요.");
                    return;
                }

            } catch (error) {
                console.error("에러!");
            }
        }
        fetchUserId();
    }

    return <div id="container">
        <div id="mainContainer">
            <div id="mainTitle">
                <span>일상</span>을 <span>기록</span>하는 가장 쉬운 방법, <span>Mimi</span>
            </div>
            <div id="idContainer">
                <div id="photoBox"></div>
                <div id="idPwdBox">
                    <div id="idPwdSmallBox">
                        <div id="idBox">
                            <div><input type="text" placeholder="아이디" onChange={fnUserId} value={userId}></input></div>
                            <div id="idCheckMsg">아이디를 입력하세요.</div>
                        </div>
                        <div id="pwdBox">
                            <input type="password" placeholder="비밀번호" onChange={fnUserPwd} value={pwd} ></input>
                            {/* <div id="idCheckMsg">비밀번호를 입력하세요. </div> */}
                        </div>
                    </div>
                    <div id="loginBtnBox">
                        <button onClick={fnSubmit} id="loginBtn">로그인</button>
                        <button onClick={() => {
                            window.location.href = "http://localhost:3000/userJoin";
                        }} id="joinBtn">회원가입</button>
                    </div>
                    <div id="findBox">
                        <div id="idFind">아이디 찾기</div>
                        <div id="findLine"> | </div>
                        <div id="pwdFind">비밀번호 찾기</div>
                    </div>
                </div>

            </div>
        </div>
    </div>
}
export default Login;