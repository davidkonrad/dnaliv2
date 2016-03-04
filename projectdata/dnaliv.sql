-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 04, 2016 at 08:42 AM
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
-- Table structure for table `fag`
--

CREATE TABLE IF NOT EXISTS `fag` (
  `fag_id` int(11) NOT NULL AUTO_INCREMENT,
  `fag_navn` varchar(100) NOT NULL,
  PRIMARY KEY (`fag_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `fag`
--

INSERT INTO `fag` (`fag_id`, `fag_navn`) VALUES
(1, 'Natur og teknik'),
(2, 'Biologi'),
(3, 'Geografi'),
(4, 'Fysik/Kemi'),
(5, 'Naturvidenskabeligt grundforløb'),
(6, 'Naturgeografi'),
(7, 'Bioteknologi'),
(8, 'Andet (uddyb i kommentar)');

-- --------------------------------------------------------

--
-- Table structure for table `klasse`
--

CREATE TABLE IF NOT EXISTS `klasse` (
  `klasse_id` int(11) NOT NULL AUTO_INCREMENT,
  `projekt_id` int(11) NOT NULL,
  `institution` varchar(100) NOT NULL,
  `adresse` varchar(100) NOT NULL,
  `postnr` varchar(4) NOT NULL,
  `by` varchar(30) NOT NULL,
  `kommune` varchar(25) NOT NULL,
  `klassetrin` varchar(50) NOT NULL,
  `fag` varchar(50) NOT NULL,
  `laerer_navn` varchar(50) NOT NULL,
  `laerer_tlf` varchar(50) NOT NULL,
  `laerer_email` varchar(50) NOT NULL,
  `antal_elever` int(11) NOT NULL,
  `antal_laerer` int(11) NOT NULL,
  PRIMARY KEY (`klasse_id`),
  KEY `projekt_id` (`projekt_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=12 ;

--
-- Dumping data for table `klasse`
--

INSERT INTO `klasse` (`klasse_id`, `projekt_id`, `institution`, `adresse`, `postnr`, `by`, `kommune`, `klassetrin`, `fag`, `laerer_navn`, `laerer_tlf`, `laerer_email`, `antal_elever`, `antal_laerer`) VALUES
(1, 1, 'Asferg Skole (Folkeskole i Fårup)', 'ssssqqqqfff', 'sss', '', 'sss', '2', '2', 'ss', 'sss', '', 45, 45),
(2, 1, 'As Friskole (Friskole i Juelsminde)', '', '', '', '', '', '', '', '', '', 0, 0),
(3, 1, '', '', '', '', '', '', '', '', '', '', 0, 0),
(4, 1, '', '', '', '', '', '', '', '', '', '', 0, 0),
(5, 1, '< ikke udfyldt >', '', '', '', '', '', '', '', '', '', 0, 0),
(6, 19, '< ikke udfyldt >', '', '', '', '', '', '', '', '', '', 0, 0),
(7, 19, '< ikke udfyldt >', '', '', '', '', '', '', '', '', '', 0, 0),
(8, 14, '< ikke udfyldt >', '', '', '', '', '', '', '', '', '', 0, 0),
(9, 11, 'As Friskole (Friskole i Juelsminde)', 'ssdfsd', 'sdf', '', '', '', '', '', '', '', 0, 0),
(10, 13, 'Afdeling for Eskimologi og Arktiske Studier (Universitet i København K)', '', '', '', '', '', '', '', '', '', 0, 0),
(11, 20, 'Asferg Skole (Folkeskole i Fårup)', '', '', '', '', '', '', '', '', '', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `klassetrin`
--

CREATE TABLE IF NOT EXISTS `klassetrin` (
  `klassetrin_id` int(11) NOT NULL AUTO_INCREMENT,
  `klassetrin_navn` varchar(50) NOT NULL,
  PRIMARY KEY (`klassetrin_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `klassetrin`
--

INSERT INTO `klassetrin` (`klassetrin_id`, `klassetrin_navn`) VALUES
(1, '1.g'),
(2, '2.g'),
(3, '3.g');

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
  `projekt_dato` date NOT NULL,
  `projekt_tidspunkt` time NOT NULL DEFAULT '09:09:00',
  PRIMARY KEY (`projekt_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=21 ;

--
-- Dumping data for table `projekt`
--

INSERT INTO `projekt` (`projekt_id`, `projekt_kode`, `timestamp_created`, `projekt_dato`, `projekt_tidspunkt`) VALUES
(1, 'QWERTYaaa', '2016-02-26 20:28:46', '2016-05-17', '19:00:00'),
(2, 'test', '2016-02-26 18:15:35', '2016-05-31', '00:00:00'),
(11, 'ÆØÅ', '2016-02-26 17:56:59', '2015-12-27', '00:00:00'),
(12, 'sdadad', '2016-03-01 18:17:14', '2016-03-01', '00:00:00'),
(13, 'aaaaa', '2016-02-29 22:25:57', '0000-00-00', '09:09:00'),
(14, 'werwer', '2016-03-02 19:44:12', '2016-03-06', '09:09:00'),
(15, 'yyyy', '2016-02-29 22:28:40', '0000-00-00', '09:09:00'),
(16, 'erer', '2016-02-29 22:30:04', '0000-00-00', '09:09:00'),
(17, 'dfgdfg', '2016-02-29 22:30:36', '0000-00-00', '09:09:00'),
(18, 'fsdfsdf', '2016-02-29 22:31:44', '0000-00-00', '09:09:00'),
(19, 'AK81', '2016-03-01 18:22:36', '2016-03-06', '22:55:00'),
(20, 'MMMM', '2016-03-04 07:31:17', '2016-03-01', '07:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `projekt_taxon`
--

CREATE TABLE IF NOT EXISTS `projekt_taxon` (
  `projekt_taxon_id` int(11) NOT NULL AUTO_INCREMENT,
  `projekt_id` int(11) NOT NULL,
  `taxon_id` int(11) NOT NULL,
  `is_included` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`projekt_taxon_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=34 ;

--
-- Dumping data for table `projekt_taxon`
--

INSERT INTO `projekt_taxon` (`projekt_taxon_id`, `projekt_id`, `taxon_id`, `is_included`) VALUES
(1, 11, 3, 1),
(2, 11, 5, 1),
(3, 11, 8, 1),
(4, 11, 8, 1),
(5, 2, 5, 0),
(6, 2, 8, 1),
(7, 2, 3, 0),
(8, 2, 9, 1),
(9, 1, 5, 1),
(10, 1, 8, 1),
(11, 1, 9, 1),
(12, 1, 5, 1),
(13, 1, 3, 1),
(14, 1, 8, 1),
(15, 1, 9, 1),
(16, 1, 3, 1),
(17, 1, 3, 1),
(18, 1, 5, 1),
(19, 1, 3, 1),
(20, 1, 8, 1),
(21, 1, 3, 1),
(22, 1, 11, 1),
(23, 1, 12, 1),
(24, 1, 13, 1),
(25, 1, 14, 1),
(26, 1, 15, 1),
(27, 13, 3, 1),
(28, 13, 5, 1),
(29, 13, 8, 1),
(30, 20, 3, 1),
(31, 20, 5, 1),
(32, 20, 8, 1),
(33, 20, 9, 1);

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
  `taxon_id` int(11) NOT NULL AUTO_INCREMENT,
  `taxon_navn` varchar(100) NOT NULL,
  `taxon_navn_dk` varchar(100) DEFAULT NULL,
  `taxon_artsgruppe` varchar(50) DEFAULT NULL,
  `taxon_basisliste` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`taxon_id`),
  UNIQUE KEY `taxon_navn` (`taxon_navn`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=23 ;

--
-- Dumping data for table `taxon`
--

INSERT INTO `taxon` (`taxon_id`, `taxon_navn`, `taxon_navn_dk`, `taxon_artsgruppe`, `taxon_basisliste`) VALUES
(1, 'Perca fluviatilis', 'Aborre', 'Fisk', 0),
(2, 'Abramis brama', 'Brasen', 'Fisk', 0),
(3, 'Misgurnus fossilis', 'Dyndsmerling', 'Fisk', 1),
(4, 'Anguilla anguilla', 'Ål', 'Fisk', 0),
(5, 'Esox lucius', 'Gedde', 'Fisk', 1),
(6, 'Ctenopharyngodon idella', 'Græskarpe', 'Fisk', 0),
(7, 'Carassius carassius', 'Karusse', 'Fisk', 0),
(8, 'Cobitis taenia', 'Pigsmerling', 'Fisk', 1),
(9, 'Rutilus rutilus', 'Skalle', 'Fisk', 1),
(10, 'Gasterosteus aculeatus', 'Trepigget hundestejle', 'Fisk', 1),
(11, 'Dytiscus latissimus', 'Bred vandkalv', 'Biller', 1),
(12, 'Graphoderus bilineatus', 'Lys skivevandkalv', 'Biller', 1),
(13, 'Leucorrhinia pectoralis', 'Stor kærguldsmed', 'Guldsmede', 1),
(14, 'Astacus astacus', 'Flodkrebs', 'Tibenede krebsdyr', 1),
(15, 'Pacifastacus leniusculus', 'Signalkrebs', 'Tibenede krebsdyr', 1),
(16, 'Bufotes variabilis', 'Grønbroget tudse', 'Padder', 1),
(17, 'Pelobates fuscus', 'Løgfrø', 'Padder', 1),
(18, 'Hyla arborea', 'Løvfrø', 'Padder', 1),
(19, 'Rana arvalis', 'Spidssnudet frø', 'Padder', 1),
(20, 'Lissotriton vulgaris', 'Lille vandsalamander', 'Padder', 1),
(21, 'Triturus cristatus', 'Stor vandsalamander', 'Padder', 1),
(22, 'Rana temporaria', 'Butsnudet frø', 'Padder', 1);

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

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
