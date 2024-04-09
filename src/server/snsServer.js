const express = require('express');
var cors = require('cors');
const mysql = require('mysql');
const path = require('path'); //파일 연결
const session = require('express-session'); //세션
const app = express();


app.use(cors());
app.use(session({
    secret: 'test',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


//ejs(jsp같은 파일) 설정
app.set('view engine', 'ejs'); //디폴트로 ejs파일 잡아둠
app.set('views', path.join(__dirname, '.'));  //.은 경로, 다른 경로일 경우 /파일명

// MySQL 연결 설정
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'test1234',
    database: 'sns_kimyeji'
});

//DB 연결
connection.connect(function (err) {
    if (err) {
        console.error('Error connecting to MySQL database: ' + err.stack + ' db연결 실패');
        return;
    }
    console.log('Connected to MySQL database as id ' + connection.threadId + ' db연결 성공!');
});



//select  - 로그인(dox)
app.get('/login.dox', function (req, res) {
    var map = req.query; //파라미터 값
    console.log(map);
    // MySQL 쿼리 실행
    connection.query(`SELECT * FROM USER WHERE USERID = ? AND PWD = ?`, [map.userId, map.pwd], function (error, results, fields) {
        if (error || results.length === 0) {
            res.send({ result: "fail" });
        } else {
            req.session.userId = results[0].USERID; //select 할때 *로 검색 시 대문자로 입력
            console.log("userId login ==> ", req.session);
            res.send({ result: "success", msg: `Hello`, userId: results[0] });
        }
    });
});


//insert  - 회원가입(dox)
app.get('/userJoin.dox', function (req, res) {
    var map = req.query; //파라미터 값
    // var userId = req.session.userId;

    // MySQL 쿼리 실행
    connection.query(`INSERT INTO USER VALUES(?,?,?,?,?,?,NOW(),1,NULL)`, [map.userId, map.pwd, map.name, map.birth, map.phone, map.email], function (error, results, fields) {
        if (error) {
            res.send({ result: "fail" });
        } else {
            res.send({ result: "success", msg: "가입이 완료되었습니다!" });
        }
    });
});

//select - 아이디 중복확인(dox)
app.get('/idCheck.dox', function (req, res) {
    var map = req.query; //파라미터 값
    console.log(map);
    // MySQL 쿼리 실행
    connection.query(`SELECT * FROM USER WHERE USERID = ?`, [map.userId], function (error, results, fields) {
        if (error) throw error;
        if (results.length == 0) {
            res.send({ result: "사용 가능한 아이디 입니다!" });
        } else {
            res.send({ result: "이미 사용중인 아이디 입니다." });
        }
        console.log(map);
    });
});

//select - 전체 글 불러오기(dox)
app.get('/postListAll.dox', function (req, res) {
    var map = req.query; //파라미터 값
    console.log(map);
    // MySQL 쿼리 실행
    connection.query(`SELECT P.POSTNO AS POSTNO, U.USERID, U.NAME, INTRO, TITLE, CONTENTS, LIKES, HIT, 
    (SELECT COUNT(POSTNO) FROM USER_POST) AS POSTCNT, 
    DATE_FORMAT(P.CDATE, '%Y/%m/%d %p %h:%i') AS CDATE,
    CONCAT(H.FILEPATH,H.FILENAME) AS PATH
    FROM USER_POST P 
    LEFT JOIN USER_POST_PHOTO H ON P.POSTNO = H.POSTNO 
    INNER JOIN USER U ON P.USERID = U.USERID 
    ORDER BY P.CDATE DESC`, function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
});


//select - 사용자 게시글목록(dox)
app.get('/postList.dox', function (req, res) {
    var map = req.query; //파라미터 값
    // MySQL 쿼리 실행
    connection.query(`SELECT P.POSTNO AS POSTNO, U.USERID, U.NAME, INTRO, TITLE, CONTENTS, LIKES, HIT, 
    (SELECT COUNT(POSTNO) FROM USER_POST) AS POSTCNT, 
    DATE_FORMAT(P.CDATE, '%Y/%m/%d %p %h:%i') AS CDATE,
    CONCAT(H.FILEPATH,H.FILENAME) AS PATH
    FROM USER_POST P 
    LEFT JOIN USER_POST_PHOTO H ON P.POSTNO = H.POSTNO 
    INNER JOIN USER U ON P.USERID = U.USERID 
    WHERE P.USERID = ?`, [map.userId], function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
});



//select - 사용자 게시글 자세히(dox)
app.get('/postView.dox', function (req, res) {
    var map = req.query; //파라미터 값
    console.log(map);
    // MySQL 쿼리 실행
    connection.query(`SELECT P.POSTNO AS POSTNO, U.USERID, U.NAME, INTRO, TITLE, CONTENTS, LIKES, HIT, 
    (SELECT COUNT(POSTNO) FROM USER_POST) AS POSTCNT, 
    DATE_FORMAT(P.CDATE, '%Y/%m/%d %p %h:%i') AS CDATE,
    CONCAT(H.FILEPATH,H.FILENAME) AS PATH
    FROM USER_POST P 
    LEFT JOIN USER_POST_PHOTO H ON P.POSTNO = H.POSTNO 
    INNER JOIN USER U ON P.USERID = U.USERID
	 `, [map.postNo], function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
});



//insert  - 사용자 게시글 작성(dox)
app.get('/posting.dox', function (req, res) {
    var map = req.query; //파라미터 값

    // MySQL 쿼리 실행
    connection.query(`INSERT INTO USER_POST VALUES(NULL,?,?,?,0,0,NOW(),NULL)`, [map.userId, map.title, map.contents], function (error, results, fields) {
        if (error) {
            res.send({ result: "fail" });
        } else {
            res.send({ result: "success", msg: "작성되었습니다." });
        }
    });
});

//select - 사용자 정보(dox)
app.get('/userInfo.dox', function (req, res) {
    var map = req.query; //파라미터 값
    // MySQL 쿼리 실행
    connection.query(`SELECT * FROM USER WHERE USERID = ?`, [map.userId], function (error, results, fields) {
        if (error) {
            res.send({ result: "fail" });
        } else {
            res.send({ result: "success", userInfo: results[0] });
        }

    });
});


//update - 사용자 정보 수정(dox)
app.get('/userInfoUpdate.dox', function (req, res) {
    var map = req.query; //파라미터 값
    console.log("사용자정보 -> ", map);
    // MySQL 쿼리 실행
    connection.query(`UPDATE USER SET PWD = ?, NAME = ?, BIRTH = ?, PHONE = ?, EMAIL = ?, INTRO = ?  WHERE USERID = ?`, [map.pwd, map.name, map.birth, map.phone, map.email, map.intro, map.userId], function (error, results, fields) {
        if (error) {
            res.send({ result: "fail" });
        } else {
            res.send({ result: "success", msg: "수정되었습니다." });
        }
    });
});




//delete - 게시판 내용 삭제(dox)
app.get('/boardDelete.dox', function (req, res) {
    var boardNo = req.query.boardNo; //파라미터 값
    // MySQL 쿼리 실행
    connection.query(`DELETE FROM TBL_BOARD WHERE BOARDNO = ?`, [boardNo], function (error, results, fields) {
        if (error) {
            res.send({ result: "fail" });
        } else {
            res.send({ result: "success" });
        }
    });

});






app.listen(4000);

//cors : 보안정책을 풀기위한 npm (npm i cors)
