import { useState, useEffect } from "react";
import Menu from '../components/Menu';
import './PostDetailView.css';
import './Posting.css';
import { useParams } from "react-router-dom";

function PostDetailView() {
    const [comment, setComment] = useState("");
    const userId = sessionStorage.getItem("userId");
    const { postNo } = useParams();
    const [postList, setPostList] = useState([]);
    useEffect(() => {
        async function fetchList() {
            try {
                const response = await fetch(`http://localhost:4000/postView.dox?postNo=${postNo}`);
                const jsonData = await response.json();
                setPostList(jsonData[0]);
                console.log(jsonData);
            } catch (error) {
                console.error("!!error!!");
            }
        }
        fetchList();
    }, []);
    const fnDelete = () => {
        async function fetchPostDelete() {
            try {
                if (window.confirm("정말 삭제하시겠습니까?")) {
                    const response = await fetch(`http://localhost:4000/postingDelete.dox?userId=${userId}&postNo=${postNo}`);
                    const jsonData = await response.json();
                    console.log(jsonData.result);
                    if (jsonData.result == "success") {
                        alert(jsonData.msg);
                        window.location.href = `http://localhost:3000/profile?userId=${userId}`;
                    } else {
                        alert("실패했습니다. 다시 시도하세요.");
                        return;
                    }
                }

            } catch (error) {
                console.error("에러!");
            }
        }
        fetchPostDelete();
    }

    const fnComment = (e) => {
        setComment(e.target.value);
    }
    const fnCommentSave = () => {
        async function fetchCommentSave() {
            try {
                if (comment == "") {
                    alert("댓글을 입력하세요.");
                    return;
                }
                const response = await fetch(`http://localhost:4000/commentAdd.dox?postNo=${postNo}&comment=${comment}&userId=${userId}`);
                const jsonData = await response.json();
                if (jsonData.result == "success") {
                    alert(jsonData.msg);
                    window.location.href = `http://localhost:3000/Posts`;
                } else {
                    alert("댓글 작성에 실패했습니다. 다시 시도하세요.");
                    return;
                }

            } catch (error) {
                console.error("에러!");
            }
        }
        fetchCommentSave();
    }
    const fnCommentDelete = (commentNo) => {
        async function fetchCommentDelete() {
            try {
                if (window.confirm("댓글을 정말 삭제하시겠습니까?")) {

                    const response = await fetch(`http://localhost:4000/commentDelete.dox?userId=${userId}&postNo=${postNo}&commentNo=${commentNo}`);
                    const jsonData = await response.json();
                    if (jsonData.result == "success") {
                        alert(jsonData.msg);
                        window.location.href = `http://localhost:3000/Posts`;
                    } else {
                        alert("댓글 삭제 실패했습니다. 다시 시도하세요.");
                        return;
                    }
                }

            } catch (error) {
                console.error("에러!");
            }
        }
        fetchCommentDelete();
    }
    return (
        <div id="postDetailContainer">
            <div id="postDetailBox">
                <div id="beforeBtn" onClick={() => { window.history.back(); }}>←</div>
                <div id="postDetailSmallBox">
                    <div id="detailBox">
                        <div id="detailUserInfoBox">
                            <div id="detailUserBox">
                                <div id="detailUserImg"></div>
                                <div id="detailUserId">{postList.USERID}</div>
                            </div>
                            <div id="detailDate">{postList.CDATE}</div>
                        </div>
                        <div id="detailTitleBox">{postList.TITLE}</div>
                        <div id="detailContentsBox">
                            {postList.PATH && postList.PATH !== "null" && (
                                <div id="postPhoto"><img src={`http://localhost:4000/${postList.PATH}`} alt="post image" /></div>
                            )}
                            <div>{postList.CONTENTS}</div>
                        </div>
                        <div id="detailLikesCmtContainer">
                            <div id="detailLikesCmtBox">
                                <div id="detailLikesBox">
                                    <div id="detailLike"></div>
                                    <div className="detailLikeTxt">{postList.LIKES}</div>
                                </div>
                                <div id="detailCmtBox">
                                    <div id="detailCmt"></div>
                                    <div className="detailLikeTxt">0</div>
                                </div>
                            </div>
                            {userId == postList.USERID && (
                                <div id="postBtnBox">
                                    <div className="postUpdateBtn">
                                        <button onClick={() => { window.location.href = `http://localhost:3000/postingUpdate/${postNo}` }}>수정</button>
                                    </div>
                                    <div className="postDeleteBtn">
                                        <button onClick={fnDelete}>삭제</button>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* 댓글 보기 */}
                        <div id="commentContainer">
                            {postList.COMMENTNO && (
                                <div id="commentBox">
                                    <div id="commentTitle">
                                        <div id="commentSmallBox">
                                            <div id="cmtUserBox">
                                                <div id="cmtUserImg"></div>
                                                <div id="cmtUserId">{postList.COMMENTID}</div>
                                                <div id="cmtDate">{postList.COMMENTDATE}</div>
                                            </div>
                                        </div>
                                        {userId && (
                                            <div id="cmtBtnBox">
                                                <div className="cmtUpdateBtn">
                                                    <button>수정</button>
                                                </div>
                                                <div className="cmtDeleteBtn">
                                                    <button onClick={() => fnCommentDelete(postList.COMMENTNO)}>삭제</button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div id="commnetTxt">{postList.COMMENT}</div>
                                </div>
                            )}
                            {/* 댓글 입력 */}
                            <div id="commentBox">
                                <div id="commentSmallBox">
                                    <div id="cmtUserBox">
                                        <div id="cmtUserImg"></div>
                                        <div id="cmtUserId">{userId}</div>
                                    </div>
                                </div>
                                <div id="commnetAddTxt">
                                    <input type="text" onChange={fnComment} />
                                    <button onClick={fnCommentSave}>작성</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default PostDetailView;