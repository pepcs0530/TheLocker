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
  PRIMARY KEY (`mem_gen`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

/*Data for the table `tb_member` */

insert  into `tb_member`(`mem_gen`,`mem_id`,`mem_tname`,`mem_fname`,`mem_lname`,`mem_age`,`mem_email`) values 
(1,'m001','นาย','อภิวิชญ์','สังข์เมือง',11,'api@test.com'),
(2,'m002','ผอ.','ทดสอบ','ระบบ',22,'test@test.com'),
(3,'m003','ดร.','ไม่รู้','สินะ',30,'mairu@test.com'),
(5,'m005','นาย','เอ','บี',123,'a.b@t.com'),
(6,'m006','นางสาว','แดง','มากมาย',1,'red.m@t.com'),
(7,'m007','นาย','สมชาย','ใจดี',2,'somchai.j@t.com'),
(8,'m008','นาย','ไก่','ขันแต่เช้า',3,'kai.k@t.com'),
(9,'m009','นางสาว','ปลา','สะลิด',4,'pla.s@t.com'),
(10,'m0010','นาย','เขียว','โซดา',5,'kaew.s@t.com'),
(11,'m0011','นาย','รี','เจนซี่',6,'re.j@t.com'),
(12,'m0012','นางสาว','ดอก','ไม้งาม',7,'dok.m@t.com'),
(13,'m0013','นาย','ทดเวลา','บาดเจ็บ',8,'tod.b@t.com');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
