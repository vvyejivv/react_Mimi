import { useState, useEffect } from "react";
import Menu from '../components/Menu';
import { json } from "react-router-dom";
// import './P.css';
function Profile() {
    const userId = sessionStorage.getItem("userId");
    const [postList, setPostList] = useState([]);
    const [userName, setUserName] = useState("");
    const [userIntro, setUserIntro] = useState("");
    const [userPostCnt, setUserPostCnt] = useState("");
    console.log(userId);
    useEffect(() => {
        async function fetchList() {
            try {
                const response = await fetch(`http://localhost:4000/postList.dox?userId=${userId}`);
                const jsonData = await response.json();
                setPostList(jsonData);
                setUserIntro(jsonData[0].INTRO);
                setUserPostCnt(jsonData[0].POSTCNT);


                console.log(jsonData);
            } catch (error) {
                console.error("!!error!!");
            }
        }
        fetchList();
    }, []);

    return <div style={{
        marginLeft: "470px",
    }}>
        <div>
            {/* 프로필 박스 */}
            <div style={{
                display: "flex",
            }}>
                {/* 프로필 사진 박스 */}
                <div style={{
                    width: "200px",
                    height: "200px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <div style={{ width: "150px", height: "150px" }}>
                        <img
                            style={{
                                width: "150px",
                                height: "150px",
                                border: "1px solid #ccc",
                                borderRadius: "50%",
                            }}
                            src = "https://th.bing.com/th/id/OIP.NMPXaBadVF3pdRmwJyqmZQHaHa?w=188&h=188&c=7&r=0&o=5&pid=1.7"

                        />
                    </div>
                </div>
                {/* 프로필 이름 등등 박스*/}
                <div style={{
                    width: "fit-content",
                    marginTop: "20px",
                    padding: "10px 20px",
                    // backgroundColor:"red",
                }}>
                    {/* 사용자 정보 */}
                    <div>
                        <h1>{userId}</h1>
                        <div>{userIntro}</div>
                    </div>
                    <div style={{
                        marginTop: "10px",
                    }}>
                        <div>게시글</div>
                        <div>{userPostCnt}</div>
                    </div>
                </div>
            </div>
            {/* 내가 작성한 게시글 박스 */}
            <div style={{
                width: "1280px",
                height: "500px",
                marginTop: "10px",
            }}>
                {/* h3태그 부분  */}
                <div style={{
                    padding: "10px 20px",
                }}>
                    <h3>내가 작성한 게시글</h3>
                </div>
                {/* 게시물 menu */}
                <div className="row" style={{
                    padding: "10px 20px",
                }}>
                    {postList.map(item => (
                        // 한바퀴씩 돌면서 item이 list에 들어감
                        // 반복하는 값의 key값이 필수
                        <div key={item.POSTNO} className="col-sm-6 col-md-3 col-lg-4">
                            {/* col-md-3 전체좌우 12칸 / 4칸을 차지 */}
                            <a href="#"><Menu title={item.TITLE} content={item.CONTENTS} /></a>
                        </div>

                    ))}

                </div>
            </div>
            {/* 프로필 수정 */}
            <div>
                <button onClick={()=>{
                                window.location.href = `http://localhost:3000/userInfo?userId=${userId}`;
                            }}>내정보 수정</button>
            </div>
        </div>
    </div>
}
export default Profile;