import { useState, useEffect } from "react";
import { json } from "react-router-dom";

function UserJoin() {
    const [userId, setUserId] = useState("");
    const [pwd, setPwd] = useState("");
    const [userName, setUserName] = useState("");
    const [birth, setBirth] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    let [idCheckText, setIdCheckText] = useState(""); //아이디 중복확인 문구

    const fnUserId = (e)=>{
        setUserId(e.target.value);
    }
    const fnUserPwd = (e)=>{
        setPwd(e.target.value);
    }
    const fnUserName = (e)=>{
        setUserName(e.target.value);
    }
    const fnUserBirth = (e)=>{
        setBirth(e.target.value);
    }
    const fnUserPhone = (e)=>{
        setPhone(e.target.value);
    }
    const fnUserEmail = (e)=>{
        setEmail(e.target.value);
    }
    const fnUserJoin = ()=>{
        async function fetchUserJoin(){
            try {
                let str = `userId=${userId}&pwd=${pwd}&name=${userName}&birth=${birth}&phone=${phone}&email=${email}`;
                const response = await fetch(`http://localhost:4000/userJoin.dox?${str}`);
                const jsonData = await response.json();
                if(jsonData.result == "success"){
                    alert(jsonData.msg);
                    window.location.href = "http://localhost:3000/login";
                }else if(jsonData.result == "fail"){
                    alert("다시 시도 바랍니다.");
                    return;
                }

                
            } catch (error) {
                console.error("에러!");
            }
           } 
           fetchUserJoin();
    }
    useEffect(()=>{
        async function fetchUserId(){
            try {
                const response = await fetch(`http://localhost:4000/idCheck.dox?userId=${userId}`);
                const jsonData = await response.json();
                setIdCheckText(jsonData.result);
                
            } catch (error) {
                console.error("error!");
            }
           } 
           fetchUserId();
    },[userId]);

    return <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "0px auto",
    }}>
        <div>
            <div>회원가입</div>
            <div style={{
                margin: "15px 0px",
            }}>
                <span>아이디 : </span>
                <input type="text" onChange={fnUserId} value={userId}></input>
                {userId != "" ? <div>{idCheckText}</div> : <div><span>*</span> 아이디를 입력해주세요!</div>}
            </div>
            <div style={{
                margin: "15px 0px",
            }}>
                <span>비밀번호 : </span>
                <input type="password" onChange={fnUserPwd} value={pwd}></input>
                {pwd =="" && <div><span>*</span> 비밀번호를 입력해주세요!</div>} 
            </div>
            <div style={{
                margin: "15px 0px",
            }}>
                <span>이름 : </span>
                <input type="text"  onChange={fnUserName} value={userName}></input>
            </div>
            <div style={{
                margin: "15px 0px",
            }}>
                <span>생년월일 : </span>
                <input type="text" placeholder="ex : 19971025" onChange={fnUserBirth} value={birth}></input>
            </div>
            <div style={{
                margin: "15px 0px",
            }}>
                <span>연락처 : </span>
                <input type="text" placeholder="ex : 0100000000"  onChange={fnUserPhone} value={phone}></input>
                <div style={{
                    margin: "15px 0px",
                }}>
                    <span>이메일 : </span>
                    <input type="text" placeholder="ex : abcd@abcd.com"  onChange={fnUserEmail} value={email}></input>
                </div>
                <div>
                    <button onClick={fnUserJoin}>가입하기</button>
                    <button onClick={()=>{
                                window.location.href = "http://localhost:3000/";
                            }}>취소</button>
                </div>
            </div>
        </div>
    </div>
}
export default UserJoin;