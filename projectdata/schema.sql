-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Vært: localhost
-- Genereringstid: 11. 02 2016 kl. 16:26:11
-- Serverversion: 5.5.47-0ubuntu0.14.04.1-log
-- PHP-version: 5.5.9-1ubuntu4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `dna`
--

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `booking`
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
-- Struktur-dump for tabellen `locality`
--

CREATE TABLE IF NOT EXISTS `locality` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `sample`
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
-- Struktur-dump for tabellen `sample_taxon`
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
-- Struktur-dump for tabellen `taxon`
--

CREATE TABLE IF NOT EXISTS `taxon` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Begrænsninger for dumpede tabeller
--

--
-- Begrænsninger for tabel `sample`
--
ALTER TABLE `sample`
  ADD CONSTRAINT `sample_ibfk_1` FOREIGN KEY (`locality_id`) REFERENCES `locality` (`_id`),
  ADD CONSTRAINT `sample_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`_id`);

--
-- Begrænsninger for tabel `sample_taxon`
--
ALTER TABLE `sample_taxon`
  ADD CONSTRAINT `sample_taxon_ibfk_1` FOREIGN KEY (`sample_id`) REFERENCES `sample` (`_id`),
  ADD CONSTRAINT `sample_taxon_ibfk_2` FOREIGN KEY (`taxon_id`) REFERENCES `taxon` (`_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
