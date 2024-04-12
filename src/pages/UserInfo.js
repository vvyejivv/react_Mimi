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
    const [selectedFiles, setSelectedFiles] = useState([]); //파일 목록 추가

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
    //파일 저장
    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 3) {
            // 파일 원하는 개수에 따라 수정
            alert('최대 3개까지 파일을 업로드할 수 있습니다!');
            return;
        }
        // selectedFiles에 저장
        setSelectedFiles(files);
    };
    const fnInfoUpdate = () => {
        async function fnUserInfoUpdate() {
            try {
                if (pwd == "") {
                    alert("비밀번호를 입력해주세요.");
                    return;
                }
                //파일 post방식
                var map = {};
                map.pwd = pwd;
                map.name = userName;
                map.birth = birth;
                map.phone = phone;
                map.email = email;
                map.intro = userIntro;
                map.userId = userId;
                
                console.log(map);
                
                //기존 파일명 현재시간 파일명으로 변경
                const now = new Date();
                const year = now.getFullYear().toString().slice(-2);
                const month = (now.getMonth() + 1).toString().padStart(2, '0');
                const day = now.getDate().toString().padStart(2, '0');
                const hours = now.getHours().toString().padStart(2, '0');
                const minutes = now.getMinutes().toString().padStart(2, '0');
                const seconds = now.getSeconds().toString().padStart(2, '0');
                const timestamp = `${year}${month}${day}${hours}${minutes}${seconds}`;

                   //파일 여러개 리스트에 저장
                   let files = [];
                   for (const file of selectedFiles) {
                       const fileName = `${timestamp}_${file.name}`; // 저장되는 순간의 시간(YYMMDDHHmmss)을 파일 이름과 같이 저장     
                       files.push({fileName : fileName, fileOrgName : file.name});   
                       const imgformData = new FormData();
                       imgformData.append('file', file, fileName); 
                       try {
                           const response = await fetch('http://localhost:4000/upload', {
                               method: 'POST',
                               body: imgformData
                           });
                           
                           if (!response.ok) {
                               throw new Error('이미지 업로드에 실패했습니다.');
                           }
                   
                           const responseData = await response.json();
                       } catch (error) {
                           console.error('이미지 업로드 오류:', error.message);
                           // 오류 처리
                       }
                   }
                   map.files = files;
                const response = await fetch(`http://localhost:4000/userInfoUpdate.dox`,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(map)
                });
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
                <div>

                    <div className="userInfo_flex">
                        <div>프로필 사진</div>
                        <input type="file" multiple onChange={handleFileUpload}></input>
                    </div>
                    <div className="userInfo_flex">
                        <div>소개글</div>
                        <input type="text" onChange={fnUserIntro} value={userIntro} id="introBox" ></input>
                    </div>
                    <div className="userInfo_flex">
                        <div>아이디 </div>
                        <input type="text" value={userId} disabled></input>
                    </div>
                    <div id="userInfo_pwdBox">
                        <div>비밀번호 </div>
                        <input type="password" onChange={fnUserPwd} value={pwd} ></input>
                    </div>
                    {pwd == "" && <div style={{
                        marginBottom: "5px",
                        color: "red",
                        fontSize: "13px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}><span>*</span> 비밀번호를 입력해주세요!</div>}
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
                    <div id="userInfo_updateBox">
                        <button id="userInfo_updateBtn" onClick={fnInfoUpdate}>수정하기</button>
                        <button id="userInfo_Btn" onClick={() => {
                            window.history.back();
                        }}>취소</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
export default UserInfo;