import { useState, useEffect, useParams } from "react";
import Menu from '../components/Menu';
import './PostDetailView.css';
import './Posting.css';
function PostDetailView() {
    const userId = sessionStorage.getItem("userId");
    const {postNo} = useParams();
    const [postList, setPostList] = useState([]);
    // const [postNo, setPostNo] = useState("");
    const [userIntro, setUserIntro] = useState("");
    const [userPostCnt, setUserPostCnt] = useState("");
    useEffect(() => {
        async function fetchList() {
            try {
                const response = await fetch(`http://localhost:4000/postView.dox?postNo=${postNo}`);
                const jsonData = await response.json();
                setPostList(jsonData);
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
                            <div id="detailUserId">sfjldfhkjfhkjalh</div>
                        </div>
                        <div>2020/02/02 토</div>
                    </div>

                    <div id="detailContentsBox">
                        <div>글글</div>
                    </div>

                    <div id="detailLikesCmtContainer">
                        <div id="detailLikesCmtBox">
                            <div id="detailLikesBox">
                                <div id="detailLike"></div>
                                <div className="detailLikeTxt">0</div>
                            </div>
                            <div id="detailCmtBox">
                                <div id="detailCmt"></div>
                                <div className="detailLikeTxt">0</div>
                            </div>
                        </div>
                    </div>

                    {/* 댓글보기 */}
                    <div id="commentContainer">
                        <div id="commentBox">
                            <div id="commentTitle">
                                <div id="commentSmallBox">
                                    <div id="cmtUserBox">
                                        <div id="cmtUserImg"></div>
                                        <div id="cmtUserId">아이디</div>
                                        <div id="cmtDate">2222/22/22</div>
                                    </div>
                                </div>
                                {userId ? (<div id="cmtBtnBox">
                                    <div className="cmtUpdateBtn"><button>수정</button></div>
                                    <div className="cmtDeleteBtn"><button>삭제</button></div>
                                </div>) : ""}
                            </div>
                            <div id="commnetTxt"> 댓글테스트 </div>
                        </div>
                    </div>
                    {/* 댓글 입력 */}
                    <div id="commentContainer">
                        <div id="commentBox">
                            <div id="commentSmallBox">
                                <div id="cmtUserBox">
                                    <div id="cmtUserImg"></div>
                                    <div id="cmtUserId">아이디</div>
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