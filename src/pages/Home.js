import Menu from '../components/Menu';
function Home(){
    const list = [
        {id: 1, title: '첫 번째 게시물', content: '첫 번째 게시물입니다.'},
        {id: 2, title: '두 번째 게시물', content: '두 번째 게시물입니다.'},
        {id: 3, title: '세 번째 게시물', content: '세 번째 게시물입니다.'},
        {id: 4, title: '네 번째 게시물', content: '세 번째 게시물입니다.'},
        {id: 5, title: '다섯 번째 게시물', content: '세 번째 게시물입니다.'},
      ];

    return <div>
                <div className="text-center my-5">홈</div>
                {/* db데이터 반복문 돌리기 
                    map()함수가 있음 - 자체적으로 있음
                */}
                <div className="row">
                    {list.map(item => (
                        // 한바퀴씩 돌면서 item이 list에 들어감
                        // 반복하는 값의 key값이 필수
                        <div key={item.id} className="col-sm-6 col-md-4 col-lg-3">
                                                    {/* col-md-3 전체좌우 12칸 / 4칸을 차지 */}
                        <Menu title={item.title} content={item.content} />
                        </div>

                        ))}
                </div>
            </div>
}
export default Home;