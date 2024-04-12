import { useState, useEffect } from "react";
import Menu from '../components/Menu';
import { NavLink } from 'react-router-dom';
import './Posts.css';
function Posts() {
    const userId = sessionStorage.getItem("userId");
    const [postList, setPostList] = useState([]);
    const [showComment, setShowComment] = useState(false);
    const [comment, setComment] = useState("");

    useEffect(() => {
        async function fetchList() {
            try {
                const response = await fetch(`http://localhost:4000/postListAll.dox`);
                const jsonData = await response.json();
                setPostList(jsonData);
                console.log(jsonData);
            } catch (error) {
                console.error("!!error!!");
            }
        }
        fetchList();
    }, []);
    const fnDelete = (postNo) => {
        async function fetchPostDelete() {
            try {
                if (window.confirm("정말 삭제하시겠습니까?")) {
                    const response = await fetch(`http://localhost:4000/postingDelete.dox?userId=${userId}&postNo=${postNo}`);
                    const jsonData = await response.json();
                    console.log(jsonData.result);
                    if (jsonData.result == "success") {
                        alert(jsonData.msg);
                        window.location.href = `http://localhost:3000/Posts`;
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
    const toggleComment = (postNo) => {
        setShowComment(prevState => ({
            ...prevState,
            [postNo]: !prevState[postNo]
        }));
    };
    const fnComment = (e) => {
        setComment(e.target.value);
    }

    const fnCommentSave = (postNo) => {
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
    const fnCommentDelete = (postNo, userId, commentNo) => {
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

    return <div id="postsContainer">
        <div id="postsBox">
            <div id="postsTitleBox">
                <div id="postsTitle">Home</div>
                <div id="postsPoint"></div>
            </div>
            <div id="postsList" className="row">
                {postList.map(item => (
                    <div id="postBox" className="col-md-1" key={item.POSTNO}>

                        <div id="postSmallBox">
                            <div id="postTitleBox">
                                <div id="postUser">
                                    {item.USERPATH !== null && item.USERPATH !== undefined ? (
                                        <div id="userImg"><img src={`http://localhost:4000/${item.USERPATH}`} alt="post image" /></div>
                                    ) : (
                                        <div id="postUserImg"></div>
                                    )}
                                    <div id="postUserId"><a href="#" onClick={() => {
                                        window.location.href = `http://localhost:3000/userProfile/${item.USERID}`;
                                    }}>{item.USERID}</a></div>
                                </div>
                                <div id="postDate">{item.CDATE}</div>
                            </div>
                            <div id="postTitle">
                                <div id="postTitleTxt">{item.TITLE}</div>
                            </div>
                            <div id="postContentsBox">
                                <div id="postContents">
                                    {item.PATH && item.PATH !== "null" && (
                                        <div id="postPhoto"><img src={`http://localhost:4000/${item.PATH}`} alt="post image" /></div>
                                    )}
                                    {item.CONTENTS}
                                </div>
                            </div>
                            <div id="postLikesCmtBox">
                                <div id="postLikesCmtSmallBox">
                                    <div id="likesBox">
                                        <div id="heartImg"></div>
                                        <div className="likesTxt">{item.LIKES}</div>
                                    </div>
                                    <div id="cmtBox">
                                        <div id="cmtImg"></div>
                                        <div className="likesTxt">{item.COMMENTCNT}</div>
                                    </div>
                                    <div id="cmtAddBox">
                                        <div id="cmtAddTxt" onClick={() => toggleComment(item.POSTNO)}>댓글달기</div>
                                    </div>
                                </div>
                                {userId == item.USERID ? (<div id="postBtnBox">
                                    <div className="postUpdateBtn"><button onClick={() => {
                                        window.location.href = `http://localhost:3000/postingUpdate/${item.POSTNO}`
                                    }}>수정</button></div>
                                    <div className="postDeleteBtn"><button onClick={() => fnDelete(item.POSTNO)}> 삭제</button></div>
                                </div>) : ""}

                            </div>
                        </div>
                        {/* 댓글보기 */}
                        {showComment[item.POSTNO] && (
                            <div>
                                <div id="commentContainer">
                                    {item.COMMENTNO && (
                                        <div id="commentBox">
                                            <div id="commentTitle">
                                                <div id="commentSmallBox">
                                                    <div id="cmtUserBox">
                                                        <div id="cmtUserImg"></div>
                                                        <div id="cmtUserId">{item.COMMENTID}</div>
                                                        <div id="cmtDate">{item.COMMENTDATE}</div>
                                                    </div>
                                                </div>
                                                {userId == item.USERID ? (
                                                    <div id="cmtBtnBox">
                                                        <div className="cmtUpdateBtn"><button>수정</button></div>
                                                        <div className="cmtDeleteBtn"><button onClick={() => fnCommentDelete(item.POSTNO, userId, item.COMMENTNO)}>삭제</button></div>
                                                    </div>
                                                ) : ""}
                                            </div>
                                            <div id="commnetTxt">{item.COMMENT}</div>
                                        </div>
                                    )}
                                </div>
                                <div id="commentContainer">
                                    <div id="commentBox">
                                        <div id="commentSmallBox">
                                            <div id="cmtUserBox">
                                                <div id="cmtUserImg"></div>
                                                <div id="cmtUserId">{userId}</div>
                                            </div>
                                        </div>
                                        <div id="commnetAddTxt">
                                            <input type="" onChange={fnComment} />
                                            <button onClick={() => fnCommentSave(item.POSTNO)}>작성</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                ))}
            </div>

        </div>
    </div>
}
export default Posts;