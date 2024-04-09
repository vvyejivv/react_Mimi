import { useState, useEffect } from "react";
import Menu from '../components/Menu';
import './PostDetailView.css';
import './Posting.css';
import { useParams } from "react-router-dom";

function PostDetailView() {
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

    return <div id="postDetailContainer">
        <div id="postDetailBox">
            <div id="beforeBtn" onClick={() => {
                window.history.back();
            }}>←</div>
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
                        {userId == postList.USERID ? (<div id="postBtnBox">
                            <div className="postUpdateBtn"><button>수정</button></div>
                            <div className="postDeleteBtn"><button>삭제</button></div>
                        </div>) : ""}
                    </div>

                    {/* 댓글보기 */}
                    <div id="commentContainer">
                        <div id="commentBox">
                            <div id="commentTitle">
                                <div id="commentSmallBox">
                                    <div id="cmtUserBox">
                                        <div id="cmtUserImg"></div>
                                        <div id="cmtUserId">{postList.USERID}</div>
                                        <div id="cmtDate">{postList.CDATE}</div>
                                    </div>
                                </div>
                                {userId ? (<div id="cmtBtnBox">
                                    <div className="cmtUpdateBtn"><button>수정</button></div>
                                    <div className="cmtDeleteBtn"><button>삭제</button></div>
                                </div>) : ""}
                            </div>
                            <div id="commnetTxt"> 댓글 작성은 테스트중입니다. </div>
                        </div>
                    </div>
                    {/* 댓글 입력 */}
                    <div id="commentContainer">
                        <div id="commentBox">
                            <div id="commentSmallBox">
                                <div id="cmtUserBox">
                                    <div id="cmtUserImg"></div>
                                    <div id="cmtUserId">{userId}</div>
                                </div>
                            </div>
                            <div id="commnetAddTxt">
                                <input type="" />
                                <button>작성</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
export default PostDetailView;