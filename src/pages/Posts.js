import { useState, useEffect } from "react";
import Menu from '../components/Menu';
import './Posts.css';
function Posts() {
    const userId = sessionStorage.getItem("userId");
    const [postList, setPostList] = useState([]);

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
                                    <div id="postUserImg"></div>
                                    <div id="postUserId">{item.USERID}</div>
                                </div>
                                <div id="postDate">{item.CDATE}</div>
                            </div>
                            <div id="postTitle">
                                <div id="postTitleTxt">{item.TITLE}</div>
                            </div>
                            <div id="postContentsBox">
                                <div id="postContents">
                                    {item.PATH == "null" || item.PATH == "" ? <div id="postPhoto"><img src=""></img></div> : ""}
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
                                        <div className="likesTxt">0</div>
                                    </div>
                                    <div id="cmtAddBox">
                                        <div id="cmtAddTxt">댓글달기</div>
                                    </div>
                                </div>
                                {userId == item.USERID ? (<div id="postBtnBox">
                                    <div className="postUpdateBtn"><button>수정</button></div>
                                    <div className="postDeleteBtn"><button>삭제</button></div>
                                </div>) : ""}

                            </div>
                        </div>
                        {/* 댓글보기 */}
                        <div id="commentContainer">
                            <div id="commentBox">
                                <div id="commentTitle">
                                    <div id="commentSmallBox">
                                        <div id="cmtUserBox">
                                            <div id="cmtUserImg"></div>
                                            <div id="cmtUserId">{item.USERID}</div>
                                            <div id="cmtDate">{item.CDATE}</div>
                                        </div>
                                    </div>
                                    {userId == item.USERID ? (<div id="cmtBtnBox">
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
                ))}
            </div>

        </div>
    </div>
}
export default Posts;