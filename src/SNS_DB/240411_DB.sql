-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        8.0.36 - MySQL Community Server - GPL
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- sns_kimyeji 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `sns_kimyeji` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sns_kimyeji`;

-- 테이블 sns_kimyeji.chat 구조 내보내기
CREATE TABLE IF NOT EXISTS `chat` (
  `CHATNO` int NOT NULL AUTO_INCREMENT,
  `USERID` varchar(50) NOT NULL,
  `RECEIVER_MESSAGE` varchar(255) NOT NULL,
  `RECEIVER_CDATE` varchar(255) NOT NULL,
  `SENDER_MESSAGE` varchar(255) NOT NULL,
  `SENDER_CDATE` varchar(255) NOT NULL,
  PRIMARY KEY (`CHATNO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 sns_kimyeji.chat:~0 rows (대략적) 내보내기

-- 테이블 sns_kimyeji.user 구조 내보내기
CREATE TABLE IF NOT EXISTS `user` (
  `USERID` varchar(50) NOT NULL,
  `PWD` varchar(100) NOT NULL,
  `NAME` varchar(100) NOT NULL,
  `BIRTH` varchar(50) DEFAULT '설정안함',
  `PHONE` varchar(50) NOT NULL,
  `EMAIL` varchar(50) NOT NULL,
  `CDATE` varchar(50) DEFAULT NULL,
  `GRADE` varchar(50) DEFAULT NULL,
  `INTRO` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`USERID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 sns_kimyeji.user:~4 rows (대략적) 내보내기
INSERT INTO `user` (`USERID`, `PWD`, `NAME`, `BIRTH`, `PHONE`, `EMAIL`, `CDATE`, `GRADE`, `INTRO`) VALUES
	('test', '1234', '테스트', '20240404', '01012345678', 'test@test.com', '2024-04-04 17:13:08', '1', '미미 사이트 최고 많은 이용 바랍니다'),
	('test123', '1234', '이테스트', '20240403', '01098765432', 'test2@test.com', '2024-04-04 17:18:17', '1', '안녕하세요~'),
	('yeji', '1234', '김예지', '19971025', '01040859199', 'kim_yeji97@naver.com', '2024-04-04 13:14:52', '1', '코딩을 배우고 있는 코린이 입니다 （*＾-＾*）'),
	('yejun', '1234', '남예준', '20010912', '010-9999-8888', 'yejun@plave.com', '2024-04-09 18:10:21', '1', NULL);

-- 테이블 sns_kimyeji.user_follow 구조 내보내기
CREATE TABLE IF NOT EXISTS `user_follow` (
  `sessionId` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `userId` varchar(50) NOT NULL,
  PRIMARY KEY (`sessionId`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 sns_kimyeji.user_follow:~0 rows (대략적) 내보내기

-- 테이블 sns_kimyeji.user_follower 구조 내보내기
CREATE TABLE IF NOT EXISTS `user_follower` (
  `USERID` varchar(50) NOT NULL,
  `FOLLOWERCNT` int(10) unsigned zerofill NOT NULL DEFAULT (0),
  PRIMARY KEY (`USERID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 sns_kimyeji.user_follower:~0 rows (대략적) 내보내기

-- 테이블 sns_kimyeji.user_post 구조 내보내기
CREATE TABLE IF NOT EXISTS `user_post` (
  `POSTNO` int NOT NULL AUTO_INCREMENT,
  `USERID` varchar(50) DEFAULT NULL,
  `TITLE` varchar(255) DEFAULT NULL,
  `CONTENTS` text,
  `LIKES` int DEFAULT NULL,
  `HIT` int DEFAULT NULL,
  `CDATE` varchar(50) DEFAULT NULL,
  `UDATE` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`POSTNO`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 sns_kimyeji.user_post:~9 rows (대략적) 내보내기
INSERT INTO `user_post` (`POSTNO`, `USERID`, `TITLE`, `CONTENTS`, `LIKES`, `HIT`, `CDATE`, `UDATE`) VALUES
	(1, 'yeji', 'Mimi의 첫 게시글 작성해봤어요', '오늘은 산책을 하면서 푸른 하늘과 따스한 햇살을 만끽했어요. 자연 속에서 신선한 공기를 마시며 마음까지 편안해졌어요. 어제의 스트레스는 사라졌어요. 더 많은 이른 아침 산책을 기대할게요! ☀️', 0, 0, '2024-04-04 15:10:41', NULL),
	(2, 'yeji', '오늘의 일기', '오늘은 새로운 요리에 도전해봤어요! 처음 시도한 요리라 조금은 떨렸지만, 결과물은 예상보다 훨씬 맛있었어요. 요리에 대한 새로운 열정이 생겼어요!', 0, 0, '2024-04-05 10:18:35', NULL),
	(3, 'yeji', '친구들과의 만남', '친구들과 함께 즐거운 보드게임의 시간을 보냈어요! 웃음이 끊이지 않는 게임 속에서 지루함을 날렸어요. 친구들과 함께한 소중한 시간이 저의 마음을 따뜻하게 만들었어요.', 0, 0, '2024-04-05 10:18:48', NULL),
	(4, 'yeji', '도서관 다녀왔음!', '오늘은 도서관에서 책을 읽으면서 온전히 나만의 시간을 가졌어요. 책 속에는 다양한 이야기가 있어 마음을 여러 가지로 울렸어요. 새로운 지식을 얻으면서 책의 세계에 빠져들었어요', 0, 0, '2024-04-05 12:03:41', NULL),
	(5, 'yeji', '아침 산책', '오늘은 아침 일찍 일어나서 산책을 하면서 일주일 동안의 계획을 세웠어요. 마음을 가다듬기 위해 조용한 길을 걷다보니 생각도 맑아졌어요. 일정표를 만들면서 다가오는 주에 대한 기대감이 생겼어요. 하루를 이렇게 시작하니 더욱 활기찬 하루를 보낼 수 있을 것 같아요! ', 0, 0, '2024-04-11 10:22:46', NULL),
	(6, 'test', '내 친구 강아지', '강아지들은 우리 삶에 끝없는 즐거움과 사랑을 불어넣어줍니다. 그들은 충성스러운 친구이자 가장 충실한 동반자입니다. 우리가 힘든 날에는 그들의 사랑스러운 모습이 우리 마음을 편안하게 해주죠. 그들의 충성심과 애정은 정말 놀라울 정도로 강력합니다. 강아지와 함께하는 시간은 언제나 즐거움과 행복으로 가득 차 있습니다. 그들은 우리의 심장을 저절로 따뜻하게 만들어주며, 우리의 삶에 빛을 더해줍니다. 그들과 함께한 순간들은 우리의 기억 속에서 영원히 간직될 것입니다. ', 0, 0, '2024-04-09 15:29:55', NULL),
	(7, 'test', '고양이는 내 친구', '고양이들은 우리의 가장 특별한 친구입니다. 그들은 우아하고 우아한 동물로서 우리의 가정을 화사하게 만들어줍니다. 우리 고양이의 눈은 매력적이고 신비로운데, 그 귀여움에 사로잡히지 않을 수 없어요. 이들은 때로는 우리의 마음을 따뜻하게 만들고, 때로는 우리를 놀라게 합니다. 우리 고양이의 사랑스러운 행동은 우리의 삶에 풍요를 더합니다. 그들과 함께한 시간은 항상 특별하고 소중하며, 우리는 그들이 우리에게 주는 사랑과 충성을 영원히 기억할 것입니다.', 0, 0, '2024-04-09 15:36:08', NULL),
	(8, 'test', '내일은 선거일', '모든 투표권자는 투표에 참여하시길 바랍니다.', 0, 0, '2024-04-09 18:04:37', NULL),
	(9, 'yejun', '플레이브의 예준 입니다.', '안녕하세요. 플레이브의 리더와 메인보컬을 맡고 있는 예준입니다.', 0, 0, '2024-04-09 18:11:23', NULL);

-- 테이블 sns_kimyeji.user_post_comment 구조 내보내기
CREATE TABLE IF NOT EXISTS `user_post_comment` (
  `COMMENTNO` int NOT NULL AUTO_INCREMENT,
  `POSTNO` int NOT NULL DEFAULT '0',
  `COMMENT` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `USERID` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CDATE` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`COMMENTNO`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 sns_kimyeji.user_post_comment:~1 rows (대략적) 내보내기
INSERT INTO `user_post_comment` (`COMMENTNO`, `POSTNO`, `COMMENT`, `USERID`, `CDATE`) VALUES
	(2, 9, '안녕 예주니', 'yeji', '2024-04-11 12:54:12'),
	(9, 5, '넹?', 'yeji', '2024-04-11 14:34:42'),
	(10, 4, 'ㅇㅂㅇ', 'yeji', '2024-04-11 14:47:16');

-- 테이블 sns_kimyeji.user_post_photo 구조 내보내기
CREATE TABLE IF NOT EXISTS `user_post_photo` (
  `POSTFILENO` int NOT NULL AUTO_INCREMENT,
  `POSTNO` int NOT NULL DEFAULT '0',
  `FILEPATH` varchar(255) DEFAULT NULL,
  `FILENAME` varchar(255) DEFAULT NULL,
  `FILEORGNAME` varchar(255) DEFAULT NULL,
  `FILESIZE` varchar(255) DEFAULT NULL,
  `FILEETC` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`POSTFILENO`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 sns_kimyeji.user_post_photo:~0 rows (대략적) 내보내기

-- 테이블 sns_kimyeji.user_profile_photo 구조 내보내기
CREATE TABLE IF NOT EXISTS `user_profile_photo` (
  `USERPROFILENO` int NOT NULL AUTO_INCREMENT,
  `USERID` varchar(50) NOT NULL,
  `FILEPATH` varchar(255) DEFAULT NULL,
  `FILENAME` varchar(255) DEFAULT NULL,
  `FILEORGNAME` varchar(255) DEFAULT NULL,
  `FILESIZE` varchar(255) DEFAULT NULL,
  `FILEETC` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`USERPROFILENO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 sns_kimyeji.user_profile_photo:~0 rows (대략적) 내보내기

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
