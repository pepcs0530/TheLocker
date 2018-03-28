/*
SQLyog Community v12.5.0 (64 bit)
MySQL - 10.1.29-MariaDB : Database - db_thelocker
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`db_thelocker` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `db_thelocker`;

/*Table structure for table `tb_locker` */

DROP TABLE IF EXISTS `tb_locker`;

CREATE TABLE `tb_locker` (
  `loc_gen` int(11) NOT NULL AUTO_INCREMENT,
  `loc_id` varchar(20) DEFAULT NULL,
  `loc_name` varchar(20) DEFAULT NULL,
  `loc_status` varchar(1) DEFAULT NULL,
  `rfid_gen` int(11) DEFAULT NULL,
  PRIMARY KEY (`loc_gen`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

/*Data for the table `tb_locker` */

insert  into `tb_locker`(`loc_gen`,`loc_id`,`loc_name`,`loc_status`,`rfid_gen`) values 
(1,'L001','A','Y',NULL),
(2,'L002','B','N',NULL),
(3,'L003','C','Y',NULL),
(4,'L004','D','N',NULL),
(5,'L005','E','Y',NULL),
(6,'L006','F','Y',NULL);

/*Table structure for table `tb_member` */

DROP TABLE IF EXISTS `tb_member`;

CREATE TABLE `tb_member` (
  `mem_gen` int(11) NOT NULL AUTO_INCREMENT,
  `mem_id` varchar(10) DEFAULT NULL,
  `mem_tname` varchar(10) DEFAULT NULL,
  `mem_fname` varchar(20) DEFAULT NULL,
  `mem_lname` varchar(20) DEFAULT NULL,
  `mem_age` int(5) DEFAULT NULL,
  `mem_email` varchar(50) DEFAULT NULL,
  `mem_uname` varchar(50) DEFAULT NULL,
  `mem_pass` varchar(50) DEFAULT NULL,
  `mem_useflg` varchar(1) DEFAULT NULL,
  `mem_birthdate` date DEFAULT NULL,
  PRIMARY KEY (`mem_gen`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

/*Data for the table `tb_member` */

insert  into `tb_member`(`mem_gen`,`mem_id`,`mem_tname`,`mem_fname`,`mem_lname`,`mem_age`,`mem_email`,`mem_uname`,`mem_pass`,`mem_useflg`,`mem_birthdate`) values 
(1,'m001','นาย','อภิวิชญ์','สังข์เมือง',11,'api@test.com','admin','1234','1','1993-03-31'),
(2,'m002','ผอ.','ทดสอบ','ระบบ',22,'test@test.com',NULL,NULL,'1',NULL),
(3,'m003','ดร.','ไม่รู้','สินะ',30,'mairu@test.com',NULL,NULL,'1',NULL),
(5,'m005','นาย','เอ','บี',44,'a.b@t.com',NULL,NULL,'1',NULL),
(6,'m006','นางสาว','แดง','มากมาย',1,'red.m@t.com',NULL,NULL,'1',NULL),
(7,'m007','นาย','สมชาย','ใจดี',2,'somchai.j@t.com',NULL,NULL,'0',NULL),
(8,'m008','นาย','ไก่','ขันแต่เช้า',3,'kai.k@t.com',NULL,NULL,'0',NULL),
(9,'m009','นางสาว','ปลา','สะลิด',4,'pla.s@t.com',NULL,NULL,'0',NULL),
(10,'m0010','นาย','เขียว','โซดา',5,'kaew.s@t.com',NULL,NULL,'0',NULL),
(11,'m0011','นาย','รี','เจนซี่',6,'re.j@t.com',NULL,NULL,'0',NULL),
(12,'m0012','นางสาว','ดอก','ไม้งาม',7,'dok.m@t.com',NULL,NULL,'0',NULL),
(13,'m0013','นาย','ทดเวลา','บาดเจ็บ',8,'tod.b@t.com',NULL,NULL,'0',NULL),
(25,'m001','qq','ww','ee',12,'apiwich.cs.kmitl@gmail.com',NULL,NULL,'1',NULL),
(26,'m001','rr','tt','yy',33,'apiwich.cs.kmitl@gmail.com',NULL,NULL,'1',NULL),
(27,'m001','hh','jj','kk',11,'apiwich.cs.kmitl@gmail.com',NULL,NULL,'1','1970-01-04'),
(28,'m0020','นาย','อร่อย','เหาะ',123,'aroi.h@gmail.com',NULL,NULL,'1','2018-02-10'),
(29,'01','01','01','01',1,'01@hotmail.con',NULL,NULL,'0','2018-03-06');

/*Table structure for table `tb_rfid` */

DROP TABLE IF EXISTS `tb_rfid`;

CREATE TABLE `tb_rfid` (
  `rfid_gen` int(11) NOT NULL AUTO_INCREMENT,
  `rfid_id` varchar(50) DEFAULT NULL,
  `rfid_status` varchar(1) DEFAULT NULL,
  `mem_gen` int(11) DEFAULT NULL,
  PRIMARY KEY (`rfid_gen`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `tb_rfid` */

insert  into `tb_rfid`(`rfid_gen`,`rfid_id`,`rfid_status`,`mem_gen`) values 
(1,'RFID0001','1',29);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
