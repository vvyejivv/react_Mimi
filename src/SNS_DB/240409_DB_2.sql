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

-- 테이블 데이터 sns_kimyeji.user:~3 rows (대략적) 내보내기
INSERT INTO `user` (`USERID`, `PWD`, `NAME`, `BIRTH`, `PHONE`, `EMAIL`, `CDATE`, `GRADE`, `INTRO`) VALUES
	('test', '1234', '테스트', '20240404', '01012345678', 'test@test.com', '2024-04-04 17:13:08', '1', '미미 사이트 최고 많은 이용 바랍니다'),
	('test123', '1234', '이테스트', '20240403', '01098765432', 'test2@test.com', '2024-04-04 17:18:17', '1', '안녕하세요~'),
	('yeji', '1234', '김예지', '19971025', '01040859199', 'kim_yeji97@naver.com', '2024-04-04 13:14:52', '1', '코딩을 배우고 있는 코린이 입니다 （*＾-＾*）'),
	('yejun', '1234', '남예준', '20010912', '010-9999-8888', 'yejun@plave.com', '2024-04-09 18:10:21', '1', NULL);

-- 테이블 sns_kimyeji.user_follow 구조 내보내기
CREATE TABLE IF NOT EXISTS `user_follow` (
  `USERID` varchar(50) NOT NULL,
  `FOLLOWERCNT` int NOT NULL DEFAULT (0),
  PRIMARY KEY (`USERID`)
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 sns_kimyeji.user_post:~7 rows (대략적) 내보내기
INSERT INTO `user_post` (`POSTNO`, `USERID`, `TITLE`, `CONTENTS`, `LIKES`, `HIT`, `CDATE`, `UDATE`) VALUES
	(1, 'yeji', '첫번째 게시물', '오늘은 목요일', 0, 0, '2024-04-04 15:10:41', NULL),
	(2, 'yeji', '두 번째 게시물', '오늘은 금요일', 0, 0, '2024-04-05 10:18:35', NULL),
	(3, 'yeji', '세 번째 게시물', '오늘은 햄버거데이', 0, 0, '2024-04-05 10:18:48', NULL),
	(4, 'yeji', '4 번째 게시물', '주말은 언제와', 0, 0, '2024-04-05 12:03:41', NULL),
	(5, 'yeji', 'test', '1111', 0, 0, '2024-04-09 12:51:52', NULL),
	(6, 'test', '테스트', '테스트중입니다.', 0, 0, '2024-04-09 15:29:55', NULL),
	(7, 'test', '왜 안 나와', 'ㅠㅠ', 0, 0, '2024-04-09 15:36:08', NULL),
	(8, 'test', '내일은 선거일', '모든 투표권자는 투표에 참여하시길 바랍니다.', 0, 0, '2024-04-09 18:04:37', NULL),
	(9, 'yejun', '플레이브의 예준 입니다.', '안녕하세요. 플레이브의 리더와 메인보컬을 맡고 있는 예준입니다.', 0, 0, '2024-04-09 18:11:23', NULL);

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
