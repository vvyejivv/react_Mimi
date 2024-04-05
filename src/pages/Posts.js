import { useState, useEffect } from "react";
import Menu from '../components/Menu';
function Posts() {
    const userId = sessionStorage.getItem("userId");
    const [postList, setPostList] = useState([]);
    const [userName, setUserName] = useState("");
    useEffect(() => {
        async function fetchList() {
            try {
                const response = await fetch(`http://localhost:4000/postList.dox?userId=${userId}`);
                const jsonData = await response.json();
                setPostList(jsonData);
                setUserName(jsonData[0].USERID);
                console.log(jsonData);
            } catch (error) {
                console.error("!!error!!");
            }
        }
        fetchList();
    }, []);

    return <div>
        <div>
            {/* 프로필사진 / 아이디 */}
            <div>
                <div className="row" style={{
                    padding: "10px 20px",
                }}>
                    {postList.map(item => (
                        // 한바퀴씩 돌면서 item이 list에 들어감
                        // 반복하는 값의 key값이 필수
                        <div key={item.POSTNO} className="col-sm-6 col-md-12 col-lg-12">
                            <div style={{
                                width: "1420px",
                                height: "80px",
                                display: "flex",
                            }}>
                                <div style={{
                                    width: "80px",
                                    height: "80px",
                                    border: "1px solid #ccc",
                                    borderRadius: "50%",
                                    marginLeft: "50px"
                                }}> </div>
                                <div>{userName}</div>
                            </div>
                            <img style={{ width: "400px", height: "400px" }}
                                src="data:image/jpeg;base64,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"

                            />
                            {/* col-md-3 전체좌우 12칸 / 4칸을 차지 */}
                            <a href="#"><Menu title={item.TITLE} content={item.CONTENTS} /></a>
                        </div>

                    ))}

                </div>
            </div>

        </div>
    </div>
}
export default Posts;