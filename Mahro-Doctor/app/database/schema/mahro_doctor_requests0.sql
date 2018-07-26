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
-- Table structure for table `requests`
--

DROP TABLE IF EXISTS `requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8 ;
CREATE TABLE `requests` (
  `idrequests` int(11) NOT NULL AUTO_INCREMENT,
  `patient` varchar(45) DEFAULT NULL,
  `doctor` varchar(45) DEFAULT NULL,
  `status` int(11) DEFAULT '-1',
  `remarks` varchar(45) DEFAULT NULL,
  `date` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idrequests`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requests`
--

LOCK TABLES `requests` WRITE;
/*!40000 ALTER TABLE `requests` DISABLE KEYS */;
INSERT INTO `requests` VALUES (1,'nikunj97','undefined',-1,NULL,'18-07-2018'),(2,'nikunj97','undefined',-1,NULL,'11-07-2018'),(3,'nikunj97','undefined',-1,NULL,'14-07-2018'),(4,'nikunj97','undefined',-1,NULL,'05-07-2018'),(5,'nikunj97','undefined',-1,NULL,'19-07-2018'),(6,'nikunj97','undefined',-1,NULL,'03-08-2018'),(7,'123','undefined',-1,NULL,'11-07-2018'),(8,'123','undefined',-1,NULL,'19-07-2018'),(9,'123','undefined',-1,NULL,'15-07-2018'),(10,'123','undefined',-1,NULL,'05-07-2018'),(11,'123','undefined',-1,NULL,'28-07-2018'),(12,'123','undefined',-1,NULL,'04-07-2018'),(13,'123','undefined',-1,NULL,'04-07-2018'),(14,'123','undefined',-1,NULL,'04-07-2018'),(15,'123','undefined',-1,NULL,''),(16,'123','undefined',-1,NULL,''),(17,'123','undefined',-1,NULL,''),(18,'123','456',1,'ggfgfgf','17-07-2018');
/*!40000 ALTER TABLE `requests` ENABLE KEYS */;
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
