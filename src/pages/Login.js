import { useState, useEffect } from "react";

function Login(){
    const [userId,setUserId] = useState("");
    const [pwd,setPwd] = useState("");
    const fnUserId = (e)=>{
        setUserId(e.target.value);
    }
    const fnUserPwd = (e)=>{
        setPwd(e.target.value);
    }
    const fnSubmit = ()=>{
        async function fetchUserId(){
            try {
                const response = await fetch(`http://localhost:4000/login.dox?userId=${userId}&pwd=${pwd}`);
                const jsonData = await response.json();
                console.log(jsonData.result);
                if(jsonData.result == "success"){
                    await sessionStorage.setItem('userId', userId);     // sessionStrorage에 저장
                    window.location.href = `http://localhost:3000/Posts?userId=${userId}`;

                }else{
                    alert("로그인이 실패했습니다. 다시 시도하세요.");
                    return;
                }
                
            } catch (error) {
                console.error("에러!");
            }
           } 
           fetchUserId();
    }

    return <div style={{
                display : "flex",
                justifyContent : "center",
                alignItems : "center",
                margin : "0px auto",
                }}>
                <div>
                    <div>
                        <div>
                            <span>아이디 : </span>
                            <input type="text" placeholder="아이디를 입력하세요." onChange={fnUserId} value={userId}></input>
                        </div>
                        <div>
                            <span>비밀번호 : </span>
                            <input type="password" placeholder="비밀번호를 입력하세요." onChange={fnUserPwd} value={pwd} ></input>
                        </div>
                        <div>
                            <button onClick={fnSubmit}>로그인</button>
                            <button onClick={()=>{
                                window.location.href = "http://localhost:3000/userJoin";
                            }}>회원가입</button>
                        </div>
                        
                    </div>
                </div>
            </div>
}
export default Login;