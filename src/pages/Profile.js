import Menu from '../components/Menu';
function Profile(){
    const list = [
        {id: 1, title: '첫 번째 게시물', content: '첫 번째 게시물입니다.'},
        {id: 2, title: '두 번째 게시물', content: '두 번째 게시물입니다.'},
        {id: 3, title: '세 번째 게시물', content: '세 번째 게시물입니다.'},
        {id: 4, title: '네 번째 게시물', content: '세 번째 게시물입니다.'},
        {id: 5, title: '다섯 번째 게시물', content: '세 번째 게시물입니다.'},
      ];
      
    return <div style={{width:"1920px"}}>
        <div style={{
            width:"1280px",
            height:"800px" , 
            border:"1px solid #ccc", 
            borderRadius:"8px",
            margin : "0px auto",
            }}
        >
            {/* 프로필 박스 */}
            <div style={{width:"1280px", 
                        height:"200px",
                        display : "flex",
                    }}>
                {/* 프로필 사진 박스 */}
                <div style={{
                    width:"200px", 
                    height:"200px",
                    display : "flex",
                    justifyContent : "center",
                    alignItems : "center",
                }}>
                    <div style={{width : "150px", height :"150px"}}>
                        <img 
                            style={{
                                width : "150px",
                                height :"150px",
                                border:"1px solid #ccc",
                                borderRadius:"50%",
                            }}
                            src="data:image/jpeg;base64,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" 
                        />
                    </div>
                </div>
                {/* 프로필 이름 등등 박스*/}
                <div style={{
                    width:"fit-content",
                    marginTop :"20px",
                    padding : "10px 20px",
                    // backgroundColor:"red",
                }}>
                    <div><h1>망붕이</h1></div>
                    <div>망상토끼 망붕이💟</div>
                    <div  style={{
                            marginTop :"10px",
                }}>
                        <table>
                            <tr>
                                <th>20</th>
                                <th>100</th>
                                <th>50</th>
                            </tr>
                            <tr>
                                <td>게시물</td>
                                <td>팔로워</td>
                                <td>팔로잉</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            {/* 내가 작성한 게시글 박스 */}
            <div style={{width:"1280px", 
                        height:"500px",
                        marginTop : "10px",
                    }}>
                {/* h3태그 부분  */}
                <div style={{
                    padding :"10px 20px",
                }}>
                    <h3>내가 작성한 게시글</h3>
                </div>
                {/* 게시물 menu */}
                <div className="row" style={{
                    padding :"10px 20px",
                }}>
                    {list.map(item => (
                        // 한바퀴씩 돌면서 item이 list에 들어감
                        // 반복하는 값의 key값이 필수
                        <div key={item.id} className="col-sm-6 col-md-3 col-lg-4">
                                                    {/* col-md-3 전체좌우 12칸 / 4칸을 차지 */}
                        <Menu title={item.title} content={item.content} />
                        </div>

                        ))}
                </div>
            </div>    
        </div>
    </div>
}
export default Profile;