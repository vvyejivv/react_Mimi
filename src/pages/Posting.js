import { useState, useEffect } from "react";
import { json } from "react-router-dom";
import './Posting.css';
function Posting() {
    const userId = sessionStorage.getItem("userId");
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");
    const [selectedFiles, setSelectedFiles] = useState([]); //파일 목록 추가

    const fnTitle = (e) => {
        setTitle(e.target.value);
    }
    const fnContents = (e) => {
        setContents(e.target.value);
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
    const fnAdd = () => {
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

                //파일 post방식
                var map = {};
                map.userId = userId;
                map.title = title;
                map.contents = contents;

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
                const response = await fetch(`http://localhost:4000/posting.dox`, {
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
                } else {
                    alert("글 작성에 실패했습니다. 다시 시도하세요.");
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
            <div id="beforeBtn" onClick={() => {
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
                        <input type="file" id="writeImg" multiple onChange={handleFileUpload}></input>
                    </div>
                    <div id="postingContentsBox">
                        <div id="postingContentsTxt">내용</div>
                        <textarea type="text" id="postingContents" onChange={fnContents} value={contents} />
                    </div>
                </div>
                <div id="postingBtnBox">
                    <div id="addBtn"><button onClick={fnAdd}>작성</button></div>
                    <div><button onClick={() => {
                        window.location.href = "http://localhost:3000/Posts";
                    }}>취소</button></div>
                </div>
            </div>

        </div>
    </div>
}
export default Posting;