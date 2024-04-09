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

-- 내보낼 데이터가 선택되어 있지 않습니다.

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

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 sns_kimyeji.user_follow 구조 내보내기
CREATE TABLE IF NOT EXISTS `user_follow` (
  `USERID` varchar(50) NOT NULL,
  `FOLLOWERCNT` int NOT NULL DEFAULT (0),
  PRIMARY KEY (`USERID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 sns_kimyeji.user_follower 구조 내보내기
CREATE TABLE IF NOT EXISTS `user_follower` (
  `USERID` varchar(50) NOT NULL,
  `FOLLOWERCNT` int(10) unsigned zerofill NOT NULL DEFAULT (0),
  PRIMARY KEY (`USERID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

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

-- 내보낼 데이터가 선택되어 있지 않습니다.

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

-- 내보낼 데이터가 선택되어 있지 않습니다.

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

-- 내보낼 데이터가 선택되어 있지 않습니다.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
