-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 19, 2016 at 03:02 PM
-- Server version: 5.5.44-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `dnaliv`
--

-- --------------------------------------------------------

--
-- Table structure for table `kommentar`
--

CREATE TABLE IF NOT EXISTS `kommentar` (
  `kommentar_id` int(11) NOT NULL AUTO_INCREMENT,
  `type_id` int(11) NOT NULL,
  `relation_id` int(11) NOT NULL,
  `kommentar` text NOT NULL,
  `created_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_userName` varchar(50) NOT NULL,
  PRIMARY KEY (`kommentar_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1274 ;

--
-- Dumping data for table `kommentar`
--

INSERT INTO `kommentar` (`kommentar_id`, `type_id`, `relation_id`, `kommentar`, `created_timestamp`, `created_userName`) VALUES
(1222, 3, 2, 'Skal analyseres 15-01-2016', '2016-05-19 12:32:49', '{ Excel }'),
(1223, 3, 4, 'Kan bruges af andre', '2016-05-19 12:32:49', '{ Excel }'),
(1224, 3, 5, 'booket 12-05-2016', '2016-05-19 12:32:49', '{ Excel }'),
(1225, 3, 6, 'Kan bruges af andre', '2016-05-19 12:32:50', '{ Excel }'),
(1226, 3, 7, 'Kan bruges af andre. Anne C. Winther Jørgensen og 2ybi', '2016-05-19 12:32:50', '{ Excel }'),
(1227, 3, 8, ' Ole Carsten Pedersen, Kan bruges af andre', '2016-05-19 12:32:50', '{ Excel }'),
(1228, 3, 10, 'Niels J Willumsen, , F15_078 15-03-2016', '2016-05-19 12:32:50', '{ Excel }'),
(1229, 3, 11, 'Vagn Rasmussen', '2016-05-19 12:32:50', '{ Excel }'),
(1230, 3, 12, 'Vagn Rasmussen, evt bruges med holdet fra Allerød 7/4 F15_037', '2016-05-19 12:32:51', '{ Excel }'),
(1231, 3, 13, 'Mogens Ellebæk (må bruges af andre)', '2016-05-19 12:32:51', '{ Excel }'),
(1232, 3, 15, 'kan bruges af andre', '2016-05-19 12:32:51', '{ Excel }'),
(1233, 3, 16, 'Kan bruges af andre', '2016-05-19 12:32:51', '{ Excel }'),
(1234, 3, 17, 'Kan bruges af andre', '2016-05-19 12:32:52', '{ Excel }'),
(1235, 3, 22, 'Prøven hed tidligere DL_F15_063, men blev flytte da den ikke nåede at blive ekstraheret før klassens besøg.', '2016-05-19 12:32:53', '{ Excel }'),
(1236, 3, 30, 'Clara/Frederikke/Mehrshrshad', '2016-05-19 12:32:53', '{ Excel }'),
(1237, 3, 53, 'Kun 50ml vand igennem filter', '2016-05-19 12:32:56', '{ Excel }'),
(1238, 3, 78, 'Prøven er modtaget i juli, hvor der ikke var booket. ', '2016-05-19 12:33:00', '{ Excel }'),
(1239, 3, 157, 'Prøver indsamles i uge 36 og sendes straks derefter.', '2016-05-19 12:33:11', '{ Excel }'),
(1240, 3, 196, 'Stør', '2016-05-19 12:33:15', '{ Excel }'),
(1241, 3, 203, 'Frøer', '2016-05-19 12:33:16', '{ Excel }'),
(1242, 3, 247, '4 prøver per sø koordinat (kaldet A, B, C, D)', '2016-05-19 12:33:22', '{ Excel }'),
(1243, 3, 248, '4 prøver per sø koordinat (kaldet A, B, C, D)', '2016-05-19 12:33:23', '{ Excel }'),
(1244, 3, 249, '4 prøver per sø koordinat (kaldet A, B, C, D)', '2016-05-19 12:33:23', '{ Excel }'),
(1245, 3, 250, '4 prøver per sø koordinat (kaldet A, B, C, D)', '2016-05-19 12:33:23', '{ Excel }'),
(1246, 3, 251, '2 prøver per sø koordinat (kaldet A, B)', '2016-05-19 12:33:24', '{ Excel }'),
(1247, 3, 252, '2 prøver per sø koordinat (kaldet A, B)', '2016-05-19 12:33:24', '{ Excel }'),
(1248, 3, 253, '4 prøver per sø koordinat (kaldet A, B, C, D)', '2016-05-19 12:33:24', '{ Excel }'),
(1249, 3, 254, '4 prøver per sø koordinat (kaldet A, B, C, D)', '2016-05-19 12:33:24', '{ Excel }'),
(1250, 3, 255, '4 prøver per sø koordinat (kaldet A, B, C, D)', '2016-05-19 12:33:24', '{ Excel }'),
(1251, 3, 256, '4 prøver per sø koordinat (kaldet A, B, C, D)', '2016-05-19 12:33:24', '{ Excel }'),
(1252, 3, 257, '4 prøver per sø koordinat (kaldet A, B, C, D)', '2016-05-19 12:33:25', '{ Excel }'),
(1253, 3, 258, '4 prøver per sø koordinat (kaldet A, B, C, D)', '2016-05-19 12:33:25', '{ Excel }'),
(1254, 3, 259, '4 prøver per sø koordinat (kaldet A, B, C, D)', '2016-05-19 12:33:25', '{ Excel }'),
(1255, 3, 260, '4 prøver per sø koordinat (kaldet A, B, C, D)', '2016-05-19 12:33:25', '{ Excel }'),
(1256, 3, 261, '4 prøver per sø koordinat (kaldet A, B, C, D)', '2016-05-19 12:33:25', '{ Excel }'),
(1257, 3, 262, '4 prøver per sø koordinat (kaldet A, B, C, D)', '2016-05-19 12:33:25', '{ Excel }'),
(1258, 3, 263, '4 prøver per sø koordinat (kaldet A, B, C, D)', '2016-05-19 12:33:26', '{ Excel }'),
(1259, 3, 264, '4 prøver per sø koordinat (kaldet A, B, C, D)', '2016-05-19 12:33:26', '{ Excel }'),
(1260, 3, 265, '4 prøver per sø koordinat (kaldet A, B, C, D)', '2016-05-19 12:33:26', '{ Excel }'),
(1261, 3, 266, '4 prøver per sø koordinat (kaldet A, B, C, D)', '2016-05-19 12:33:26', '{ Excel }'),
(1262, 3, 267, '4 prøver per sø koordinat (kaldet A, B, C, D)', '2016-05-19 12:33:26', '{ Excel }'),
(1263, 3, 268, '4 prøver per sø koordinat (kaldet A, B, C, D)', '2016-05-19 12:33:27', '{ Excel }'),
(1264, 3, 269, '4 prøver per sø koordinat (kaldet A, B, C, D)', '2016-05-19 12:33:27', '{ Excel }'),
(1265, 3, 270, '4 prøver per sø koordinat (kaldet A, B, C, D)', '2016-05-19 12:33:27', '{ Excel }'),
(1266, 3, 271, '4 prøver per sø koordinat (kaldet A, B, C, D)', '2016-05-19 12:33:27', '{ Excel }'),
(1267, 3, 272, '4 prøver per sø koordinat (kaldet A, B, C, D)', '2016-05-19 12:33:27', '{ Excel }'),
(1268, 3, 273, '2 prøver per sø koordinat (kaldet A, B)', '2016-05-19 12:33:27', '{ Excel }'),
(1269, 3, 274, '2 prøver per sø koordinat (kaldet A, B)', '2016-05-19 12:33:28', '{ Excel }'),
(1270, 3, 276, '500 ml gennem sterivex filter, til sammenligning med DL_SNM_2014_0002', '2016-05-19 12:33:28', '{ Excel }'),
(1271, 3, 321, 'Der er to ens prøver. Prøven er leveret af en lærer i en spand og kørt igennem filteret af Mette', '2016-05-19 12:33:34', '{ Excel }'),
(1272, 3, 322, 'Der er to ens prøver. Prøven er leveret af en lærer i en spand og kørt igennem filteret af Mette', '2016-05-19 12:33:34', '{ Excel }'),
(1273, 3, 330, 'Næsten tom', '2016-05-19 12:33:35', '{ Excel }');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
