CREATE DATABASE  IF NOT EXISTS `mahro_doctor` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci */;
USE `mahro_doctor`;
-- MySQL dump 10.13  Distrib 8.0.11, for Win64 (x86_64)
--
-- Host: localhost    Database: mahro_doctor
-- ------------------------------------------------------
-- Server version	8.0.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `sitings`
--

DROP TABLE IF EXISTS `sitings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8 ;
CREATE TABLE `sitings` (
  `idsitings` int(11) NOT NULL AUTO_INCREMENT,
  `patient` int(11) NOT NULL,
  `doctor` int(11) NOT NULL,
  `verified` tinyint(4) DEFAULT '0',
  `otp` int(11) NOT NULL,
  `info` varchar(1000) DEFAULT NULL,
  `token` varchar(32) DEFAULT NULL,
  `completed` tinyint(4) DEFAULT '0',
  `time` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idsitings`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sitings`
--

LOCK TABLES `sitings` WRITE;
/*!40000 ALTER TABLE `sitings` DISABLE KEYS */;
INSERT INTO `sitings` VALUES (14,789,456,1,6039,'{\"remarks\":\"qw\",\"medicines\":[{\"name\":\"qw\",\"quantity\":\"qw\"},{\"name\":\"qw\",\"quantity\":\"qw\"}]}','N?6MQXep12JNKSXkXPNL6isb4xiysmu',1,'Mon Jul 23 2018 18:35:20'),(15,789,456,1,7243,'{\"remarks\":\"qweqwe\",\"medicines\":[{\"name\":\"qwe\",\"quantity\":\"qwe\"},{\"name\":\"qwe\",\"quantity\":\"qwe\"}]}','MEa7KsmeSgiAML1fdxRpBv!J?7f6Qay',1,'Mon Jul 23 2018 18:37:42'),(16,789,456,1,3561,'{\"remarks\":\"qwreqwreewrq\",\"medicines\":[{\"name\":\"qwer\",\"quantity\":\"qwreqwre\"},{\"name\":\"qrwqwre\",\"quantity\":\"qwreqwr\"}]}','YdXiDHZPPes2fXHIdfZK9yl9?5KY0AM',1,'Mon Jul 23 2018 18:40:38'),(17,789,456,1,4008,'{\"remarks\":\"qwreqweqwreqrweqr\",\"medicines\":[{\"name\":\"qwre\",\"quantity\":\"qwer\"},{\"name\":\"qwre\",\"quantity\":\"qwer\"}]}','rdo9mE7RtG9Gn3BS9XihJP?2Mpx9kv0',1,'Mon Jul 23 2018 18:42:56'),(28,789,456,1,692,'{\"remarks\":\"12\",\"medicines\":[{\"name\":\"12\",\"quantity\":\"12\"},{\"name\":\"12\",\"quantity\":\"12\"}]}','yVRQ69jv?TEHZTjqqMebkAIgclUu?Er',1,'Wed Jul 25 2018 19:56:29'),(29,789,456,1,2587,'{\"remarks\":\"Go to Hell\",\"medicines\":[{\"name\":\"cough syrup\",\"quantity\":\"12\"},{\"name\":\"oitment\",\"quantity\":\"124144\"}]}','Ar!Ftm5B67QPFIvi4roJr0fu28OBJUs',1,'Wed Jul 25 2018 20:15:34');
/*!40000 ALTER TABLE `sitings` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-07-26 10:22:52
