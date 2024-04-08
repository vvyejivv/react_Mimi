import { useState, useEffect } from "react";
import Menu from '../components/Menu';
import './Posts.css';
function Posts() {
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

    return <div id="postsContainer">
        <div id="postsBox">
            <div id="postsTitleBox">
                <div id="postsTitle">Home</div>
                <div id="postsPoint"></div>
            </div>
            <div id="postsList">
                <div id="postBox">
                    <div id="postSmallBox">
                        <div id="postTitleBox">
                            <div id="postUser">
                                <div id="postUserImg"></div>
                                <div id="postUserId">{userId}</div>
                            </div>
                            <div id="postDate">2024/04/08 16:42</div>
                        </div>
                        <div id="postContentsBox">
                            <div id="postContents">
                                <div id="postPhoto">사진!</div>
                                내용을 써야돼
                                내용을 써야돼
                                내용을 써야돼

                            </div>
                        </div>
                        <div id="postLikesCmtBox">
                            <div id="postLikesCmtSmallBox">
                                <div id="likesBox">
                                    <div id="heartImg"></div>
                                    <div className="likesTxt">0</div>
                                </div>
                                <div id="cmtBox">
                                    <div id="cmtImg"></div>
                                    <div className="likesTxt">0</div>
                                </div>
                                <div id="cmtAddBox">
                                    <div id="cmtAddTxt">댓글달기</div>
                                </div>
                            </div>
                            <div id="postBtnBox">
                                    <div className="postUpdateBtn"><button>수정</button></div>
                                    <div className="postDeleteBtn"><button>삭제</button></div>
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
                                        <div id="cmtUserId">{userId}</div>
                                        <div id="cmtDate">2024/04/08 17:00</div>
                                    </div>
                                </div>
                                <div id="cmtBtnBox">
                                    <div className="cmtUpdateBtn"><button>수정</button></div>
                                    <div className="cmtDeleteBtn"><button>삭제</button></div>
                                </div>
                            </div>
                            <div id="commnetTxt"> 아아링ㄴ러미너리ㅓㅣㅁ너리얼  </div>
                        </div>
                    </div>
                    {/* 댓글 입력 */}
                    <div id="commentContainer">
                        <div id="commentBox">
                            <div id="commentSmallBox">
                                <div id="cmtUserBox">
                                    <div id="cmtUserImg"></div>
                                    <div id="cmtUserId">{userId}</div>
                                    <div id="cmtDate">2024/04/08 17:00</div>
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
export default Posts;