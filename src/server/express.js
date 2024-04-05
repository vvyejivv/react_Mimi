//자바스크립트 라이브러리 모음 : npm사이트 참고

//express : spring과 비슷한 것
const express = require('express')
const app = express()
//req : request, 서버가 받는 값(사용자 요청값)
//res : response, 요청에 대한 응답
app.get('/', function (req, res) {
    // '/'는 로컬 주소
    res.send('Hello World')
})

app.get('/test', function (req, res) {
    var map = req.query; //req(요청)에 담겨있는 것을 변수에 저장
    console.log(map);
    res.send(`이름 : ${map.name} <br> 나이 : ${map.age}`)
})



app.listen(3000) // port 3000 열린 상태



//mysql 연결 - 아래 내용  express2.js 파일 참고(아래 작동 안됨)
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'test1234',
    database: 'food114'
});

connection.connect();

app.get('/test/:id', function (req, res) {
    //'/test'는 고정, '/:id'부분은 유동적으로 변함
    var map = req.params;
    var sql = 'SELECT * FROM TBL_USER WHERE USERID = ?';
    var userId = req.query;
    console.log(userId);
    connection.query(sql, userId, function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);
    });

    res.send(`<h1>이름 : </h1>`)
})



connection.end();