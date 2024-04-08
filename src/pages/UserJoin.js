import { useState, useEffect } from "react";
import { json } from "react-router-dom";
import './UserJoin.css';

function UserJoin() {
    const [userId, setUserId] = useState("");
    const [pwd, setPwd] = useState("");
    const [userName, setUserName] = useState("");
    const [birth, setBirth] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    let [idCheckText, setIdCheckText] = useState(""); //아이디 중복확인 문구

    const fnUserId = (e) => {
        setUserId(e.target.value);
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
    const fnUserJoin = () => {
        async function fetchUserJoin() {
            try {
                let str = `userId=${userId}&pwd=${pwd}&name=${userName}&birth=${birth}&phone=${phone}&email=${email}`;
                const response = await fetch(`http://localhost:4000/userJoin.dox?${str}`);
                const jsonData = await response.json();
                if (jsonData.result == "success") {
                    alert(jsonData.msg);
                    window.location.href = "http://localhost:3000/login";
                } else if (jsonData.result == "fail") {
                    alert("다시 시도 바랍니다.");
                    return;
                }


            } catch (error) {
                console.error("에러!");
            }
        }
        fetchUserJoin();
    }
    useEffect(() => {
        async function fetchUserId() {
            try {
                const response = await fetch(`http://localhost:4000/idCheck.dox?userId=${userId}`);
                const jsonData = await response.json();
                setIdCheckText(jsonData.result);

            } catch (error) {
                console.error("error!");
            }
        }
        fetchUserId();
    }, [userId]);

    return <div id="joinContainer">
        <div id="joinBox">
            <div id="joinTitle">
                <div id="joinLogo"><a href="http://localhost:3000/">Mimi</a></div>
                <div id="pointLogo"></div>
            </div>
            <div id="joinContentsBox">
                <div id="joinTxt">회원가입</div>
                <div id="joinIdBox">
                    <div id="joinIdTxt">아이디 </div>
                    <input type="text" onChange={fnUserId} value={userId} placeholder="아이디를 입력하세요."></input>
                    {userId != "" ? <div className="idCheckTxt">{idCheckText}</div> : <div className="idCheckTxt">아이디를 입력해주세요.</div>}
                </div>
                <div id="joinPwdBox">
                    <div id="joinPwdTxt">비밀번호 </div>
                    <input type="password" onChange={fnUserPwd} value={pwd} placeholder="비밀번호를 입력하세요."></input>
                    {pwd == "" && <div className="idCheckTxt">비밀번호를 입력해주세요.</div>}
                </div>
                <div id="joinNameBox">
                    <div id="joinNameTxt">이름</div>
                    <input type="text" onChange={fnUserName} value={userName} placeholder="이름을 입력하세요."></input>
                </div>
                <div id="joinBirthBox">
                    <div id="joinBirthTxt">생년월일</div>
                    <input type="text" placeholder="ex) 19971025" onChange={fnUserBirth} value={birth}></input>
                </div>
                <div id="joinPhoneBox">
                    <div id="joinPhoneTxt">연락처</div>
                    <input type="text" placeholder="ex) 0100000000" onChange={fnUserPhone} value={phone}></input>
                </div>
                <div id="joinEmailBox">
                    <div id="joinEmailTxt">이메일</div>
                    <input type="text" placeholder="ex) abcd@abcd.com" onChange={fnUserEmail} value={email}></input>
                </div>
                <div id="joinSaveBox">
                   <div id="joinSaveBtn"> 
                        <button onClick={fnUserJoin}>가입하기</button>
                    </div>
                    <div id="joinCancelBtn">
                        <button onClick={() => {
                            window.location.href = "http://localhost:3000/";
                        }}>취소</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
export default UserJoin;