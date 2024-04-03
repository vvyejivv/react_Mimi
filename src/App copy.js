import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { legacy_createStore } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';
import _ from 'lodash'; //dash앞에 lo가 _ 뜻함
import { act } from 'react-dom/test-utils';

//컴포넌트 

function Main(props){
  return <div>
            <h1>메인!</h1>
            <div>
              슬라이드¬_¬
              <Prodect></Prodect>
            </div>

          </div>
}
function Prodect(props){
  return <div>
            제품 목록 ಠ▃ಠ
            <Board></Board>
          </div>
}
function Board(props){
    //useSelector(콜백함수)로 꺼냄
    let num = useSelector((state)=>{return state.num});
  return <div>
            게시판 목록 ಠ╭╮ಠ
            <br />
            숫자 : {num}
          </div>
}
function Main2(props){
  return <div>
            <h1>서브메인!</h1>
            <div>
              슬라이드¬_¬22222
              <Prodect2></Prodect2>
            </div>

          </div>
}
function Prodect2(props){
  let addFunc = useDispatch();
  return <div>
            제품 목록 ಠ▃ಠ2222
            숫자 : <button onClick={()=>{addFunc({type  : "minus"})}}>감소</button>
            <Board2></Board2>
          </div>
}
function Board2(props){
  //legacy_createStore(콜백함수)의 콜백함수 호출
  let addFunc = useDispatch();
  return <div>
                                {/* state,action을 보내야하지만 state를 생략하고 action을 보내도됨,
                                    action의 type을 꼭 보내야함(key 이름은 꼭 type으로 처리)*/}
            숫자 : <button onClick={()=>{addFunc({type  : "add"})}}>증가</button>
            <br />
            게시판 목록 ಠ╭╮ಠ22222
          </div>
}

//일반함수 
//reducer(현재값, 이벤트처리하는 키워드)
function reducer(state, action){
  if(state === undefined){
    return {num : 1} //state안에 num라는 값이 1이 됨(초기화가 없는 경우, vue에 data(변수선언영역)이라고 생각하면 됨)
  }
  console.log(action);
  //기존 값 복사
  let newState = {...state}; 
  if(action.type == "add"){
    newState.num += 1;
  }else if(action.type =="minus"){
    newState.num -= 1;
  }
  return newState; //원본(state)은 남아있고 newState에 값을 복사해서 +1해줌 

}

//현재 상태값을 저장할 변수
const store = legacy_createStore(reducer); //legacy : 이전버전, reducer : 콜백함수 이름(약속)
// store는 객체로, 객체 안에 reducer 함수의 return된 값이 담김
//꺼낼때는 useSelector을 사용!!

function App() {
  // let [num,setNum] = useState(1);
  let map = {num : 1};
  let newMap = {...map}; //객체에 있는 값 복사, arr의 주소(경로)를 복사하는 게 아닌 안의 값을 복사함
  newMap.num = 20;


  //lodash 설치 후 깊은 복사 가능
  //_.cloneDeep 깊은복사
  //ex ) var hong = {name : "홍길동", addr : {post : 1234, area : "인천"}, age : 20};
  //    var copyHong = _.cloneDeep(hong); ->addr에 있는 map도 내용 전체 복사가 됨
  
  //var copyHong = JSON.stringify(hong);  -> json형태를 텍스트로 받음
  //받은 데이터를 json형태로 바꿔주는 것은 ↓
  //var copyHong2 = JSON.parse(JSON.stringify(hong));

  //_.forEach 
  //_.forEach(arr, function(value)){ console.log(value);} //배열에 순차적으로 접근해서 값 찍음(for문)

  // let arr = [1,2,3,4,5]
  // let newArr = [...arr]; //객체에 있는 값 복사, arr의 주소(경로)를 복사하는 게 아닌 안의 값을 복사함
  // newArr[3] = 10;
  // console.log("arr : " + arr[3]);
  // console.log("newArr : " + newArr[3]);


  return (
    <>
      {/* Provider 태그 안에 감싸진 하위태그들은 store에 있는 변수를 내부에서 사용 가능 */}
      <Provider store={store}>
        <Main></Main>
        <Main2></Main2>
      </Provider>
    </>
  );
}

export default App;
