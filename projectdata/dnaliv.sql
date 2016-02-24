-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 25, 2016 at 12:53 AM
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
-- Table structure for table `booking`
--

CREATE TABLE IF NOT EXISTS `booking` (
  `booking_id` int(11) NOT NULL AUTO_INCREMENT,
  `institution` varchar(100) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `klassetrin` varchar(20) NOT NULL,
  `adresse` varchar(80) NOT NULL,
  `postnr` varchar(8) NOT NULL,
  `by` varchar(50) NOT NULL,
  `kommune` varchar(50) NOT NULL,
  `laerer_navn` varchar(40) NOT NULL,
  `laerer_email` varchar(40) NOT NULL,
  `learer_tlf` varchar(20) NOT NULL,
  `fag` varchar(20) NOT NULL,
  `elever_antal` int(11) NOT NULL,
  `laerer_antal` int(11) NOT NULL,
  `kommentar` text NOT NULL,
  PRIMARY KEY (`booking_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `klasse`
--

CREATE TABLE IF NOT EXISTS `klasse` (
  `klasse_id` int(11) NOT NULL,
  `projekt_id` int(11) NOT NULL,
  `institution` varchar(100) NOT NULL,
  `adresse` varchar(100) NOT NULL,
  `postnr` varchar(4) NOT NULL,
  `kommune` varchar(25) NOT NULL,
  `klassetrin` varchar(50) NOT NULL,
  `fag` varchar(50) NOT NULL,
  `laerer_navn` varchar(50) NOT NULL,
  `laerer_tlf` varchar(50) NOT NULL,
  `laerer_email` varchar(50) NOT NULL,
  `antal_elever` int(11) NOT NULL,
  `antal_laerer` int(11) NOT NULL,
  PRIMARY KEY (`klasse_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `locality`
--

CREATE TABLE IF NOT EXISTS `locality` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `projekt`
--

CREATE TABLE IF NOT EXISTS `projekt` (
  `projekt_id` int(11) NOT NULL AUTO_INCREMENT,
  `projekt_kode` varchar(20) NOT NULL,
  `timestamp_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`projekt_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=13 ;

--
-- Dumping data for table `projekt`
--

INSERT INTO `projekt` (`projekt_id`, `projekt_kode`, `timestamp_created`) VALUES
(1, 'QWERTY', '2016-02-24 22:35:37'),
(2, 'test', '2016-02-24 22:36:14'),
(11, 'ÆØÅ', '2016-02-24 23:13:33');

-- --------------------------------------------------------

--
-- Table structure for table `sample`
--

CREATE TABLE IF NOT EXISTS `sample` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `sampledate` date NOT NULL,
  `decimalLatitude` decimal(10,8) NOT NULL,
  `decimalLongitude` decimal(11,8) NOT NULL,
  `locality_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`_id`),
  KEY `locality_id` (`locality_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `sample_taxon`
--

CREATE TABLE IF NOT EXISTS `sample_taxon` (
  `sample_id` int(11) NOT NULL,
  `taxon_id` int(11) NOT NULL,
  `present` tinyint(1) NOT NULL,
  PRIMARY KEY (`sample_id`,`taxon_id`),
  KEY `taxon_id` (`taxon_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `taxon`
--

CREATE TABLE IF NOT EXISTS `taxon` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `sample`
--
ALTER TABLE `sample`
  ADD CONSTRAINT `sample_ibfk_1` FOREIGN KEY (`locality_id`) REFERENCES `locality` (`_id`),
  ADD CONSTRAINT `sample_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`_id`);

--
-- Constraints for table `sample_taxon`
--
ALTER TABLE `sample_taxon`
  ADD CONSTRAINT `sample_taxon_ibfk_1` FOREIGN KEY (`sample_id`) REFERENCES `sample` (`_id`),
  ADD CONSTRAINT `sample_taxon_ibfk_2` FOREIGN KEY (`taxon_id`) REFERENCES `taxon` (`_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
