import { useState, useEffect } from "react";
import { json } from "react-router-dom";
import { useParams } from "react-router-dom";
import './Posting.css';
function Posting() {
    const userId = sessionStorage.getItem("userId");
    const [selectedFile, setSelectedFile] = useState(null);
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");
    const [post, setPost] = useState([]);
    const { postNo } = useParams();
    useEffect(() => {
        async function fetchPost() {
            try {
                const response = await fetch(`http://localhost:4000/postView.dox?postNo=${postNo}`);
                const jsonData = await response.json();
                setPost(jsonData[0]);
                setTitle(jsonData[0].TITLE || "");
                setContents(jsonData[0].CONTENTS || "");
            } catch (error) {
                console.error("!!error!!");
            }
        }
        fetchPost();
    },[]);
    const fnTitle = (e) => {
        setTitle(e.target.value);
    }
    const fnContents = (e) => {
        setContents(e.target.value);
    }
    const fnUpdateSave = () => {
        async function fetchPosting() {
            try {
                if (title == "") {
                    alert("제목을 입력하세요.");
                    return;
                }
                if (contents == "") {
                    alert("내용을 입력하세요.");
                    return;
                }
                const response = await fetch(`http://localhost:4000/postingUpdate.dox?title=${title}&contents=${contents}&userId=${userId}&postNo=${postNo}`);
                const jsonData = await response.json();
                console.log(jsonData.result);
                if (jsonData.result == "success") {
                    alert(jsonData.msg);
                    window.location.href = `http://localhost:3000/profile?userId=${userId}`;
                } else {
                    alert("글 수정에 실패했습니다. 다시 시도하세요.");
                    return;
                }

            } catch (error) {
                console.error("에러!");
            }
        }
        fetchPosting();
    }
    

    return <div id="postingContainer">
        <div id="postingBox">
            <div id="beforeBtn" onClick={()=>{
                window.history.back();
            }}>←</div>
            <div id="postingSmallBox">
                <div>

                    <div id="writeBox">
                        <div id="postingTitleTxt">제목</div>
                        <input id="postingTitle" onChange={fnTitle} value={title} />
                    </div>
                    <div id="writeImgBox">
                        <div id="writeImgBoxTxt">사진</div>
                        <input type="file" id="writeImg"></input>
                    </div>
                    <div id="postingContentsBox">
                        <div id="postingContentsTxt">내용</div>
                        <textarea type="text" id="postingContents" onChange={fnContents} value={contents} />
                    </div>
                </div>
                <div id="postingBtnBox">
                    <div id="addBtn"><button onClick={fnUpdateSave}>수정하기</button></div>
                    <div><button onClick={()=>{
                        window.location.href=`http://localhost:3000/postDetailView/${postNo}`;
                    }}>취소</button></div>
                </div>
            </div>

        </div>
    </div>
}
export default Posting;