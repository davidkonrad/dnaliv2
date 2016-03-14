-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 14, 2016 at 04:47 AM
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
  `sagsNo` varchar(30) NOT NULL,
  `status` int(1) NOT NULL,
  `timestamp_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `periode` int(11) NOT NULL,
  `aar_periode` int(11) NOT NULL,
  PRIMARY KEY (`booking_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1695 ;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`booking_id`, `sagsNo`, `status`, `timestamp_created`, `periode`, `aar_periode`) VALUES
(1453, 'aTest01', 0, '2016-03-14 03:31:18', 1, 1),
(1454, 'aTest02', 0, '2016-03-14 03:31:18', 1, 1),
(1455, 'aTest03', 0, '2016-03-14 03:31:18', 1, 1),
(1456, 'aTest04', 0, '2016-03-14 03:31:18', 1, 1),
(1457, 'aTest05', 0, '2016-03-14 03:31:18', 1, 1),
(1458, 'aTest06', 0, '2016-03-14 03:31:18', 1, 1),
(1459, 'aTest07', 0, '2016-03-14 03:31:18', 1, 1),
(1460, 'F13-003', 0, '2016-03-14 03:31:19', 1, 1),
(1461, 'F13-004', 0, '2016-03-14 03:31:19', 1, 1),
(1462, 'F13-019', 0, '2016-03-14 03:31:19', 1, 1),
(1463, 'F13-008', 0, '2016-03-14 03:31:19', 1, 1),
(1464, 'F13-009', 0, '2016-03-14 03:31:19', 1, 1),
(1465, 'F13-016', 0, '2016-03-14 03:31:19', 1, 1),
(1466, 'F13-041', 0, '2016-03-14 03:31:19', 1, 1),
(1467, 'F13-012', 0, '2016-03-14 03:31:20', 1, 1),
(1468, 'F13-014', 0, '2016-03-14 03:31:20', 1, 1),
(1469, 'F13-038', 0, '2016-03-14 03:31:20', 1, 1),
(1470, 'F13-025', 0, '2016-03-14 03:31:20', 1, 1),
(1471, 'F13-020', 0, '2016-03-14 03:31:20', 1, 1),
(1472, 'F13-010', 0, '2016-03-14 03:31:20', 1, 1),
(1473, 'F13-022', 0, '2016-03-14 03:31:20', 1, 1),
(1474, 'F13-005', 0, '2016-03-14 03:31:20', 1, 1),
(1475, 'F13-006', 0, '2016-03-14 03:31:21', 1, 1),
(1476, 'F13-026', 0, '2016-03-14 03:31:21', 1, 1),
(1477, 'F14-022', 0, '2016-03-14 03:31:21', 1, 1),
(1478, 'F13-013', 0, '2016-03-14 03:31:21', 1, 1),
(1479, 'F13-015', 0, '2016-03-14 03:31:21', 1, 1),
(1480, 'F13-024', 0, '2016-03-14 03:31:21', 1, 1),
(1481, 'F13-027', 0, '2016-03-14 03:31:21', 1, 1),
(1482, 'F13-032', 0, '2016-03-14 03:31:22', 1, 1),
(1483, 'F13-031', 0, '2016-03-14 03:31:22', 1, 1),
(1484, 'F13-040', 0, '2016-03-14 03:31:22', 1, 1),
(1485, 'F13-042', 0, '2016-03-14 03:31:22', 1, 1),
(1486, 'F13-045', 0, '2016-03-14 03:31:22', 1, 1),
(1487, 'F13-044', 0, '2016-03-14 03:31:22', 1, 1),
(1488, 'F13-023', 0, '2016-03-14 03:31:22', 1, 1),
(1489, 'F13-049', 0, '2016-03-14 03:31:22', 1, 1),
(1490, 'F13-002', 0, '2016-03-14 03:31:23', 1, 1),
(1491, 'F13-052', 0, '2016-03-14 03:31:23', 1, 1),
(1492, 'F13-028', 0, '2016-03-14 03:31:23', 1, 1),
(1493, 'F13-034', 0, '2016-03-14 03:31:23', 1, 1),
(1494, 'F14-016', 0, '2016-03-14 03:31:23', 1, 1),
(1495, 'F13-048', 0, '2016-03-14 03:31:23', 1, 1),
(1496, 'F13-007', 0, '2016-03-14 03:31:23', 1, 1),
(1497, 'F14-005', 0, '2016-03-14 03:31:23', 1, 1),
(1498, 'F13-036', 0, '2016-03-14 03:31:24', 1, 1),
(1499, 'F14-013', 0, '2016-03-14 03:31:24', 1, 1),
(1500, 'F14-006', 0, '2016-03-14 03:31:24', 1, 1),
(1501, 'F14-017', 0, '2016-03-14 03:31:24', 1, 1),
(1502, 'F14-009', 0, '2016-03-14 03:31:24', 2, 1),
(1503, 'F14-010', 0, '2016-03-14 03:31:24', 2, 1),
(1504, 'F14-031', 0, '2016-03-14 03:31:24', 2, 1),
(1505, 'F14-007', 0, '2016-03-14 03:31:24', 2, 1),
(1506, 'F14-018', 0, '2016-03-14 03:31:24', 2, 1),
(1507, 'F14-033', 0, '2016-03-14 03:31:25', 2, 1),
(1508, 'F13-021', 0, '2016-03-14 03:31:25', 2, 1),
(1509, 'F13-039', 0, '2016-03-14 03:31:25', 2, 1),
(1510, 'F13-047', 0, '2016-03-14 03:31:25', 2, 1),
(1511, 'F14-015', 0, '2016-03-14 03:31:25', 2, 1),
(1512, 'F13-043', 0, '2016-03-14 03:31:25', 2, 1),
(1513, 'F13-037', 0, '2016-03-14 03:31:25', 2, 1),
(1514, 'F14-004', 0, '2016-03-14 03:31:25', 2, 1),
(1515, 'F14-020', 0, '2016-03-14 03:31:26', 2, 1),
(1516, 'F14-011', 0, '2016-03-14 03:31:26', 2, 1),
(1517, 'F14-027', 0, '2016-03-14 03:31:26', 2, 1),
(1518, 'F14-026', 0, '2016-03-14 03:31:26', 2, 1),
(1519, 'F14-028', 0, '2016-03-14 03:31:26', 2, 1),
(1520, 'F14-024', 0, '2016-03-14 03:31:26', 2, 1),
(1521, 'F13-011', 0, '2016-03-14 03:31:27', 2, 1),
(1522, 'F14-032', 0, '2016-03-14 03:31:27', 2, 1),
(1523, 'F14-034', 0, '2016-03-14 03:31:27', 2, 1),
(1524, 'F14-021', 0, '2016-03-14 03:31:27', 2, 1),
(1525, 'F14-055', 0, '2016-03-14 03:31:27', 2, 1),
(1526, 'F14-052', 0, '2016-03-14 03:31:27', 2, 1),
(1527, 'F14-025', 0, '2016-03-14 03:31:27', 2, 1),
(1528, 'F13-033', 0, '2016-03-14 03:31:27', 2, 1),
(1529, 'F13-035', 0, '2016-03-14 03:31:27', 2, 1),
(1530, 'F13-046_1', 0, '2016-03-14 03:31:28', 2, 1),
(1531, 'F13-046_2', 0, '2016-03-14 03:31:28', 2, 1),
(1532, 'F14-008', 0, '2016-03-14 03:31:28', 2, 1),
(1533, 'F14-054', 0, '2016-03-14 03:31:29', 2, 1),
(1534, 'F14-036', 0, '2016-03-14 03:31:29', 2, 1),
(1535, 'F14-050', 0, '2016-03-14 03:31:29', 2, 1),
(1536, 'F14-030', 0, '2016-03-14 03:31:29', 2, 1),
(1537, 'F14-063', 0, '2016-03-14 03:31:29', 2, 1),
(1538, 'F14-058', 0, '2016-03-14 03:31:29', 2, 1),
(1539, 'F14-012', 0, '2016-03-14 03:31:29', 2, 1),
(1540, 'F14-044', 0, '2016-03-14 03:31:30', 2, 1),
(1541, 'F13-051', 0, '2016-03-14 03:31:30', 2, 1),
(1542, 'F14-029', 0, '2016-03-14 03:31:30', 2, 1),
(1543, 'F14-037', 0, '2016-03-14 03:31:30', 2, 1),
(1544, 'F14-041', 0, '2016-03-14 03:31:30', 2, 1),
(1545, 'F14-045', 0, '2016-03-14 03:31:30', 2, 1),
(1546, 'F14-038', 0, '2016-03-14 03:31:30', 2, 1),
(1547, 'F14-053', 0, '2016-03-14 03:31:30', 2, 1),
(1548, 'F14-035', 0, '2016-03-14 03:31:31', 2, 1),
(1549, 'F14-039', 0, '2016-03-14 03:31:31', 2, 1),
(1550, 'F14-002', 0, '2016-03-14 03:31:31', 2, 1),
(1551, 'F14-042', 0, '2016-03-14 03:31:31', 2, 1),
(1552, 'F14-019', 0, '2016-03-14 03:31:31', 2, 1),
(1553, 'F14-057', 0, '2016-03-14 03:31:31', 2, 1),
(1554, 'F14-014', 0, '2016-03-14 03:31:31', 2, 1),
(1555, 'F14-048', 0, '2016-03-14 03:31:32', 2, 1),
(1556, 'F14-049', 0, '2016-03-14 03:31:32', 2, 1),
(1557, 'F14-068', 0, '2016-03-14 03:31:32', 2, 1),
(1558, 'F14-083', 0, '2016-03-14 03:31:32', 2, 1),
(1559, 'F14-047', 0, '2016-03-14 03:31:32', 2, 1),
(1560, 'F14-051', 0, '2016-03-14 03:31:32', 2, 1),
(1561, 'F14-062', 0, '2016-03-14 03:31:32', 2, 1),
(1562, 'F14-046', 0, '2016-03-14 03:31:32', 2, 1),
(1563, 'F13-017', 0, '2016-03-14 03:31:33', 2, 1),
(1564, 'F14-056', 0, '2016-03-14 03:31:33', 2, 1),
(1565, 'F14-066', 0, '2016-03-14 03:31:33', 2, 1),
(1566, 'F14-061', 0, '2016-03-14 03:31:33', 2, 1),
(1567, 'F14-079', 0, '2016-03-14 03:31:33', 2, 1),
(1568, 'F14-064', 0, '2016-03-14 03:31:33', 2, 1),
(1569, 'F14-093', 0, '2016-03-14 03:31:33', 2, 1),
(1570, 'F14-086', 0, '2016-03-14 03:31:34', 2, 1),
(1571, 'F14-086_2', 0, '2016-03-14 03:31:34', 2, 1),
(1572, 'F14-080', 0, '2016-03-14 03:31:34', 3, 2),
(1573, 'F14-106', 0, '2016-03-14 03:31:34', 3, 2),
(1574, 'F14-082', 0, '2016-03-14 03:31:34', 3, 2),
(1575, 'F14-092', 0, '2016-03-14 03:31:34', 3, 2),
(1576, 'F14-074', 0, '2016-03-14 03:31:34', 3, 2),
(1577, 'F14-040', 0, '2016-03-14 03:31:34', 3, 2),
(1578, 'F14-043', 0, '2016-03-14 03:31:34', 3, 2),
(1579, 'F14-076', 0, '2016-03-14 03:31:35', 3, 2),
(1580, 'F14-085', 0, '2016-03-14 03:31:35', 3, 2),
(1581, 'F14-077', 0, '2016-03-14 03:31:35', 3, 2),
(1582, 'F14-081', 0, '2016-03-14 03:31:35', 3, 2),
(1583, 'F14-091', 0, '2016-03-14 03:31:35', 3, 2),
(1584, 'F14-097', 0, '2016-03-14 03:31:35', 3, 2),
(1585, 'F14-099', 0, '2016-03-14 03:31:35', 3, 2),
(1586, 'F14-075', 0, '2016-03-14 03:31:36', 3, 2),
(1587, 'F14-090', 0, '2016-03-14 03:31:36', 3, 2),
(1588, 'F14-100', 0, '2016-03-14 03:31:36', 3, 2),
(1589, 'F14-094', 0, '2016-03-14 03:31:36', 3, 2),
(1590, 'F14-065', 0, '2016-03-14 03:31:36', 3, 2),
(1591, 'F15-001', 0, '2016-03-14 03:31:36', 3, 2),
(1592, 'F15-017', 0, '2016-03-14 03:31:36', 3, 2),
(1593, 'F15-007', 0, '2016-03-14 03:31:36', 3, 2),
(1594, 'F14-108', 0, '2016-03-14 03:31:37', 3, 2),
(1595, 'F14-084', 0, '2016-03-14 03:31:37', 3, 2),
(1596, 'F14-088', 0, '2016-03-14 03:31:37', 3, 2),
(1597, 'F14-107', 0, '2016-03-14 03:31:37', 3, 2),
(1598, 'F14-110', 0, '2016-03-14 03:31:37', 3, 2),
(1599, 'F15-019', 0, '2016-03-14 03:31:37', 3, 2),
(1600, 'F14-078', 0, '2016-03-14 03:31:37', 3, 2),
(1601, 'F15-012', 0, '2016-03-14 03:31:38', 3, 2),
(1602, 'F14-101', 0, '2016-03-14 03:31:38', 3, 2),
(1603, 'F15-024', 0, '2016-03-14 03:31:38', 3, 2),
(1604, 'F15-006', 0, '2016-03-14 03:31:38', 3, 2),
(1605, 'F15-030', 0, '2016-03-14 03:31:38', 3, 2),
(1606, 'F15-003', 0, '2016-03-14 03:31:38', 3, 2),
(1607, 'F15-028', 0, '2016-03-14 03:31:38', 3, 2),
(1608, 'F15-020', 0, '2016-03-14 03:31:38', 3, 2),
(1609, 'F14-098', 0, '2016-03-14 03:31:39', 3, 2),
(1610, 'F15-023', 0, '2016-03-14 03:31:39', 3, 2),
(1611, 'F15-016', 0, '2016-03-14 03:31:39', 3, 2),
(1612, 'F15-022', 0, '2016-03-14 03:31:39', 3, 2),
(1613, 'F15-031', 0, '2016-03-14 03:31:40', 3, 2),
(1614, 'F15-005', 0, '2016-03-14 03:31:40', 3, 2),
(1615, 'F14-095', 0, '2016-03-14 03:31:40', 3, 2),
(1616, 'F15-008', 0, '2016-03-14 03:31:40', 3, 2),
(1617, 'F15-038', 0, '2016-03-14 03:31:40', 3, 2),
(1618, 'F14-102', 0, '2016-03-14 03:31:40', 3, 2),
(1619, 'F15-026', 0, '2016-03-14 03:31:41', 3, 2),
(1620, 'F14-023', 0, '2016-03-14 03:31:41', 3, 2),
(1621, 'F15-021', 0, '2016-03-14 03:31:41', 3, 2),
(1622, 'F14-059', 0, '2016-03-14 03:31:41', 3, 2),
(1623, 'F14-087', 0, '2016-03-14 03:31:41', 3, 2),
(1624, 'F15-035', 0, '2016-03-14 03:31:41', 4, 2),
(1625, 'F15-056', 0, '2016-03-14 03:31:41', 4, 2),
(1626, 'F15-032', 0, '2016-03-14 03:31:41', 4, 2),
(1627, 'F15-067', 0, '2016-03-14 03:31:42', 4, 2),
(1628, 'F15-071', 0, '2016-03-14 03:31:42', 4, 2),
(1629, 'F15-064', 0, '2016-03-14 03:31:42', 4, 2),
(1630, 'F14-089', 0, '2016-03-14 03:31:42', 4, 2),
(1631, 'F15-018', 0, '2016-03-14 03:31:42', 4, 2),
(1632, 'F14-109', 0, '2016-03-14 03:31:42', 4, 2),
(1633, 'F15-081', 0, '2016-03-14 03:31:42', 4, 2),
(1634, 'F15-080', 0, '2016-03-14 03:31:42', 4, 2),
(1635, 'F15-013', 0, '2016-03-14 03:31:43', 4, 2),
(1636, 'F15-014', 0, '2016-03-14 03:31:43', 4, 2),
(1637, 'F14-103', 0, '2016-03-14 03:31:43', 4, 2),
(1638, 'F15-066', 0, '2016-03-14 03:31:43', 4, 2),
(1639, 'F15-042', 0, '2016-03-14 03:31:43', 4, 2),
(1640, 'F15-070', 0, '2016-03-14 03:31:43', 4, 2),
(1641, 'F15-011', 0, '2016-03-14 03:31:43', 4, 2),
(1642, 'F15-058', 0, '2016-03-14 03:31:43', 4, 2),
(1643, 'F15-004', 0, '2016-03-14 03:31:43', 4, 2),
(1644, 'F15-002', 0, '2016-03-14 03:31:44', 4, 2),
(1645, 'F15-075', 0, '2016-03-14 03:31:44', 4, 2),
(1646, 'F15-029', 0, '2016-03-14 03:31:44', 4, 2),
(1647, 'F15-049', 0, '2016-03-14 03:31:44', 4, 2),
(1648, 'F15-025', 0, '2016-03-14 03:31:44', 4, 2),
(1649, 'F14-096', 0, '2016-03-14 03:31:44', 4, 2),
(1650, 'F15-052', 0, '2016-03-14 03:31:44', 4, 2),
(1651, 'F15-061', 0, '2016-03-14 03:31:45', 4, 2),
(1652, 'F15-060', 0, '2016-03-14 03:31:45', 4, 2),
(1653, 'F15-055', 0, '2016-03-14 03:31:45', 4, 2),
(1654, 'F15-044', 0, '2016-03-14 03:31:45', 4, 2),
(1655, 'F15-072', 0, '2016-03-14 03:31:45', 4, 2),
(1656, 'F15-040', 0, '2016-03-14 03:31:45', 4, 2),
(1657, 'F15-082', 0, '2016-03-14 03:31:45', 4, 2),
(1658, 'F15-036', 0, '2016-03-14 03:31:45', 4, 2),
(1659, 'F15-078', 0, '2016-03-14 03:31:46', 4, 2),
(1660, 'F15-050', 0, '2016-03-14 03:31:46', 4, 2),
(1661, 'F15-062', 0, '2016-03-14 03:31:46', 4, 2),
(1662, 'F15-076', 0, '2016-03-14 03:31:46', 4, 2),
(1663, 'F15-074', 0, '2016-03-14 03:31:46', 4, 2),
(1664, 'F15-043', 0, '2016-03-14 03:31:46', 4, 2),
(1665, 'F15-073', 0, '2016-03-14 03:31:46', 4, 2),
(1666, 'F15-059', 0, '2016-03-14 03:31:46', 4, 2),
(1667, 'F15-063', 0, '2016-03-14 03:31:46', 4, 2),
(1668, 'F15-046', 0, '2016-03-14 03:31:47', 4, 2),
(1669, 'F15-037', 0, '2016-03-14 03:31:47', 4, 2),
(1670, 'F15-039', 0, '2016-03-14 03:31:47', 4, 2),
(1671, 'F14-105', 0, '2016-03-14 03:31:47', 4, 2),
(1672, 'F15-009', 0, '2016-03-14 03:31:47', 4, 2),
(1673, 'F15-065', 0, '2016-03-14 03:31:47', 4, 2),
(1674, 'F15-010', 0, '2016-03-14 03:31:47', 4, 2),
(1675, 'F14-104', 0, '2016-03-14 03:31:47', 4, 2),
(1676, 'F15-027', 0, '2016-03-14 03:31:48', 4, 2),
(1677, 'F15-033', 0, '2016-03-14 03:31:48', 4, 2),
(1678, 'F15-051', 0, '2016-03-14 03:31:48', 4, 2),
(1679, 'F15-034', 0, '2016-03-14 03:31:48', 4, 2),
(1680, 'F15-048', 0, '2016-03-14 03:31:48', 4, 2),
(1681, 'F15-069', 0, '2016-03-14 03:31:48', 4, 2),
(1682, 'F15-077', 0, '2016-03-14 03:31:48', 4, 2),
(1683, 'F15-054', 0, '2016-03-14 03:31:48', 4, 2),
(1684, 'F15-085', 0, '2016-03-14 03:31:49', 4, 2),
(1685, 'F15-083', 0, '2016-03-14 03:31:49', 4, 2),
(1686, 'F15-079', 0, '2016-03-14 03:31:49', 4, 2),
(1687, 'F15-057', 0, '2016-03-14 03:31:49', 4, 2),
(1688, 'F15-053', 0, '2016-03-14 03:31:49', 4, 2),
(1689, 'F15-086', 0, '2016-03-14 03:31:49', 4, 2),
(1690, 'F15-084', 0, '2016-03-14 03:31:49', 4, 2),
(1691, 'F13-029', 0, '2016-03-14 03:31:49', 4, 2),
(1692, 'F13-030', 0, '2016-03-14 03:31:49', 4, 2),
(1693, 'F14-001', 0, '2016-03-14 03:31:50', 4, 2),
(1694, '', 0, '2016-03-14 03:31:50', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `booking_klasse`
--

CREATE TABLE IF NOT EXISTS `booking_klasse` (
  `klasse_id` int(11) NOT NULL AUTO_INCREMENT,
  `booking_id` int(11) NOT NULL,
  `status` int(1) NOT NULL,
  `institutionsnavn` varchar(100) NOT NULL,
  `adresse` varchar(100) NOT NULL,
  `postnr` varchar(4) NOT NULL,
  `by` varchar(30) NOT NULL,
  `kommune` varchar(25) NOT NULL,
  `region` varchar(25) NOT NULL,
  `klassetrin` varchar(50) NOT NULL,
  `fag` varchar(50) NOT NULL,
  `laererNavn` varchar(50) NOT NULL,
  `laererTlf` varchar(50) NOT NULL,
  `laererEmail` varchar(50) NOT NULL,
  `antalElever` int(11) NOT NULL,
  `antalLaerer` int(11) NOT NULL,
  `KuvertProeverAfsendt` tinyint(1) NOT NULL,
  `Proevermodtaget` tinyint(1) NOT NULL,
  `DatoForBesoeg` datetime NOT NULL,
  `DatoForBooking` datetime NOT NULL,
  `DatoForEkst` datetime NOT NULL,
  PRIMARY KEY (`klasse_id`),
  KEY `projekt_id` (`booking_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1093 ;

--
-- Dumping data for table `booking_klasse`
--

INSERT INTO `booking_klasse` (`klasse_id`, `booking_id`, `status`, `institutionsnavn`, `adresse`, `postnr`, `by`, `kommune`, `region`, `klassetrin`, `fag`, `laererNavn`, `laererTlf`, `laererEmail`, `antalElever`, `antalLaerer`, `KuvertProeverAfsendt`, `Proevermodtaget`, `DatoForBesoeg`, `DatoForBooking`, `DatoForEkst`) VALUES
(820, 1453, 1, 'Gammel Hellerup Gymnasium', 'Svanemøllevej 87', '2900', 'Hellerup', 'Gentofte', 'Hovedstaden', '2.g.', 'Bioteknologi', 'Bo Kildeager', '', 'bk@ghg.dk', 30, 1, 0, 0, '2014-09-17 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(821, 1454, 1, 'Gammel Hellerup Gymnasium', 'Svanemøllevej 87', '2900', 'Hellerup', 'Gentofte', 'Sjælland', '3.g.', 'Biologi', 'Trine Iversen', '', 'ti@ghg.dk', 31, 1, 0, 0, '2014-09-19 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(822, 1455, 1, 'Falkonergårdens Gymnasium og HF-Kursus', 'Sønderjyllands Alle 25', '2000', 'Frederiksberg', 'Frederiksberg', 'Hovedstaden', '3.g.', 'Biologi', 'Morten Green Skaarup', '', 'mg@falgoo.dk', 17, 1, 0, 0, '2014-09-23 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(823, 1456, 1, 'Falkonergårdens Gymnasium og HF-Kursus', 'Sønderjyllands Alle 25', '2000', 'Frederiksberg', 'Frederiksberg', 'Syddanmark', '3.g.', 'Biologi', 'Signe Markman', '', 'sg@falko.dk', 24, 1, 0, 0, '2014-09-24 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(824, 1457, 1, 'Gammel Hellerup Gymnasium', 'Svanemøllevej 87', '2900', 'Hellerup', 'Gentofte', 'Hovedstaden', '3.g.', 'Biologi', 'Signe Vie', '', 'sv@ghg.dk', 22, 1, 0, 0, '2014-09-25 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(825, 1458, 1, 'Falkonergårdens Gymnasium og HF-Kursus', 'Sønderjyllands Alle 25', '2000', 'Frederiksberg', 'Frederiksberg', 'Syddanmark', '3.g.', 'Biologi', 'Hanne Strunge', '', 'hs@falgoo.dk', 16, 1, 0, 0, '2014-09-26 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(826, 1459, 1, 'Ørestad Gymnasium', 'Østergade 52', '3200', 'Helsinge', 'Gribskov', 'Hovedstaden', '3.g.', 'Bioteknologi', 'Jan Østrup', '', 'jan@oegnet.dk', 21, 1, 0, 0, '2014-10-01 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(827, 1460, 1, 'Gefion Gymnasium', 'Øster Voldgade 10', '2100', 'København', 'København', 'Sjælland', '3.g.', 'Biologi', 'Eva Fredtoft', '', 'efr@gefion-gym.dk', 11, 1, 0, 0, '2014-10-07 00:00:00', '2014-04-07 00:00:00', '0000-00-00 00:00:00'),
(828, 1461, 1, 'Ribe Katedralskole', 'Puggaardsgade 23', '6761', 'Ribe', 'Esbjerg', 'Hovedstaden', '3.g.', 'Biologi', 'Annemette Witt', '', 'AM@ribekatedralskole.dk', 13, 1, 0, 0, '2014-10-08 00:00:00', '2014-04-07 00:00:00', '0000-00-00 00:00:00'),
(829, 1461, 1, 'Ribe Katedralskole', 'Puggaardsgade 24', '6762', 'Ribe', 'Esbjerg', 'Sjælland', '3.g.', 'Biologi', 'Annemette Witt', '', 'AM@ribekatedralskole.dk', 0, 0, 0, 0, '2014-10-08 00:00:00', '2014-04-07 00:00:00', '0000-00-00 00:00:00'),
(830, 1461, 1, 'Ribe Katedralskole', 'Puggaardsgade 25', '6763', 'Ribe', 'Esbjerg', 'Hovedstaden', '3.g.', 'Biologi', 'Annemette Witt', '', 'AM@ribekatedralskole.dk', 0, 0, 0, 0, '2014-10-08 00:00:00', '2014-04-07 00:00:00', '0000-00-00 00:00:00'),
(831, 1462, 1, 'Allerød Gymnasium', 'Rådhusvej 6', '3450', 'Allerød', 'Allerød', 'Hovedstaden', '2.g.', 'Biologi', 'Birgitte Stokbro', '', 'birgittestokbro@gmail.com', 29, 1, 0, 0, '2014-10-09 00:00:00', '2014-05-21 00:00:00', '0000-00-00 00:00:00'),
(832, 1462, 1, 'Allerød Gymnasium', 'Rådhusvej 6', '3450', 'Allerød', 'Allerød', 'Hovedstaden', '2.g.', 'Biologi', 'Birgitte Stokbro', '', 'birgittestokbro@gmail.com', 0, 1, 0, 0, '2014-10-09 00:00:00', '2014-05-21 00:00:00', '0000-00-00 00:00:00'),
(833, 1462, 1, 'Allerød Gymnasium', 'Rådhusvej 6', '3450', 'Allerød', 'Allerød', 'Hovedstaden', '2.g.', 'Biologi', 'Birgitte Stokbro', '', 'birgittestokbro@gmail.com', 0, 1, 0, 0, '2014-10-09 00:00:00', '2014-05-21 00:00:00', '0000-00-00 00:00:00'),
(834, 1463, 1, 'Gefion Gymnasium', 'Øster Voldgade 10', '2100', 'København', 'København', 'Sjælland', '2.g.', 'Bioteknologi', 'Nanna Danneskiold-Samsøe', '', 'nds@gefion-gym.dk', 22, 1, 0, 0, '2014-10-10 00:00:00', '2014-04-08 00:00:00', '0000-00-00 00:00:00'),
(835, 1464, -1, 'Gefion Gymnasium', 'Øster Voldgade 10', '2100', 'København', 'København', 'Syddanmark', '3.g.', 'Biologi', 'Nanna Danneskiold-Samsøe', '', 'nds@gefion-gym.dk', 27, 0, 0, 0, '2014-10-14 00:00:00', '2014-04-08 00:00:00', '0000-00-00 00:00:00'),
(836, 1465, -1, 'Sankt Annæ Gymnasium', 'Sjælør Boulevard 135', '2500', 'Valby', 'København', 'Sjælland', '2.g.', 'Bioteknologi', 'Hans Marker', '', 'hm@sag.dk', 16, 0, 0, 0, '2014-10-15 00:00:00', '2014-05-21 00:00:00', '0000-00-00 00:00:00'),
(837, 1466, -1, 'Allerød Gymnasium', 'Rådhusvej 6', '3450', 'Allerød', 'Allerød', 'Hovedstaden', '2.g.', 'Biologi', 'Malthe Lund', '', 'malthelund@gmail.com', 27, 0, 0, 0, '2014-10-16 00:00:00', '2014-06-26 00:00:00', '0000-00-00 00:00:00'),
(838, 1467, 1, 'Borupgaard Gymnasium', 'Lautruphøj 9', '2750', 'Ballerup', 'Ballerup', 'Hovedstaden', '2.g.', 'Biologi', 'Peter Sjøholm', '', 'sj@boag.nu', 28, 1, 0, 0, '2014-10-21 00:00:00', '2014-04-08 00:00:00', '0000-00-00 00:00:00'),
(839, 1467, 1, 'Borupgaard Gymnasium', 'Lautruphøj 9', '2750', 'Ballerup', 'Ballerup', 'Hovedstaden', '2.g.', 'Biologi', 'Peter Sjøholm', '', 'sj@boag.nu', 0, 0, 0, 0, '2014-10-21 00:00:00', '2014-04-08 00:00:00', '0000-00-00 00:00:00'),
(840, 1468, 1, 'Espergærde Gymnasium og HF', 'Gymnasievej 2', '3060', 'Espergærde', 'Helsingør', 'Hovedstaden', '3.g.', 'Biologi', 'Kirsten Hede', '', 'he@eg-gym.dk', 26, 1, 0, 0, '2014-10-22 00:00:00', '2014-05-15 00:00:00', '0000-00-00 00:00:00'),
(841, 1469, 1, 'Københavns VUC', 'Vognmagergade 28', '1120', 'Kbh.', 'København', 'Hovedstaden', '2.g.', 'Biologi', 'Bent Nielsen', '', 'bn@kvuc.dk', 25, 1, 0, 0, '2014-10-23 00:00:00', '2014-06-24 00:00:00', '0000-00-00 00:00:00'),
(842, 1470, 1, 'Birkerød Gymnasium - HF - IB & Kostskole', 'Søndervangen 56', '3460', 'Birkerød', 'Rudersdal', 'Hovedstaden', '3.g.', 'Biologi', 'Christina Høier Ricke', '', 'cr@birke-gym.dk', 24, 1, 0, 0, '2014-10-24 00:00:00', '2014-05-27 00:00:00', '0000-00-00 00:00:00'),
(843, 1471, 1, 'Christianshavns Gymnasium', 'Princessegade 35', '1422', 'København', 'København', 'Hovedstaden', '3.g.', 'Bioteknologi', 'Jette Feld', '', 'jf@cg-gym.dk', 11, 1, 0, 0, '2014-10-28 00:00:00', '2014-05-21 00:00:00', '0000-00-00 00:00:00'),
(844, 1472, 1, 'Gefion Gymnasium', 'Øster Voldgade 10', '2100', 'København', 'København', 'Nordjylland', '3.g.', 'Biologi', 'Nanna Danneskiold-Samsøe', '', 'nds@gefion-gym.dk', 27, 1, 0, 0, '2014-10-29 00:00:00', '2014-04-08 00:00:00', '0000-00-00 00:00:00'),
(845, 1473, 1, 'Birkerød Gymnasium - HF - IB & Kostskole', 'Søndervangen 56, ', '3460', 'Birkerød', 'Rudersdal', 'Hovedstaden', '2.g.', 'Biologi', 'Morten Eskildsen', '', 'me@birke-gym.dk', 23, 1, 0, 0, '2014-10-30 00:00:00', '2014-05-23 00:00:00', '0000-00-00 00:00:00'),
(846, 1474, 1, 'Allerød Gymnasium', 'Rådhusvej 6', '3450', 'Allerød', 'Allerød', 'Hovedstaden', '3.g.', 'Biologi', 'Vagn Rasmussen', '', 'vra@mail.dk', 25, 1, 0, 0, '2014-10-31 00:00:00', '2014-04-07 00:00:00', '0000-00-00 00:00:00'),
(847, 1474, 1, 'Allerød Gymnasium', 'Rådhusvej 7', '3450', 'Allerød', 'Allerød', 'Syddanmark', '3.g.', 'Biologi', 'Vagn Rasmussen', '', 'vra@mail.dk', 0, 0, 0, 0, '2014-10-31 00:00:00', '2014-04-07 00:00:00', '0000-00-00 00:00:00'),
(848, 1474, 1, 'Allerød Gymnasium', 'Rådhusvej 8', '3450', 'Allerød', 'Allerød', 'Syddanmark', '3.g.', 'Biologi', 'Vagn Rasmussen', '', 'vra@mail.dk', 0, 0, 0, 0, '2014-10-31 00:00:00', '2014-04-07 00:00:00', '0000-00-00 00:00:00'),
(849, 1475, 1, 'Frederiksborg Gymnasium og HF', 'Carlsbergvej 15', '3400', 'Hillerød', 'Hillerød', 'Hovedstaden', '3.g.', 'Biologi', 'Torsten Ingerslev', '', 'torsten.ingerslev@gmail.com', 25, 1, 0, 0, '2014-11-04 00:00:00', '2014-04-08 00:00:00', '0000-00-00 00:00:00'),
(850, 1476, -1, 'Gefion Gymnasium', 'Øster Voldgade 10', '2100', 'København', 'København', 'Hovedstaden', '2.g.', 'Biologi', 'Thomas Kristiansen', '', 'tkr@gefion-gym.dk', 30, 0, 0, 0, '2014-11-05 00:00:00', '2014-05-27 00:00:00', '0000-00-00 00:00:00'),
(851, 1477, 1, 'Rødovre Gymnasium', 'Hendriksholms Boulevard 28', '2610', 'Rødovre', 'Rødovre', 'Hovedstaden', '3.g.', 'Biologi', 'Nathan Russell', '', 'npf.russell@gmail.com', 19, 1, 0, 0, '2014-11-05 00:00:00', '2014-10-10 00:00:00', '0000-00-00 00:00:00'),
(852, 1478, 1, 'Gefion Gymnasium', 'Østre Voldgade 10', '1350', 'København', 'København', 'Sjælland', '3.g.', 'Bioteknologi', 'Linda Schneider', '', 'lsc@gefion-gym.dk', 29, 1, 0, 0, '2014-11-06 00:00:00', '2014-05-14 00:00:00', '0000-00-00 00:00:00'),
(853, 1479, 1, 'Roskilde Gymnasium', 'Domkirkepladsen', '4000', 'Roskilde', 'Roskilde', 'Hovedstaden', '2.g.', 'Bioteknologi', 'Ida Thingstrup', '', 'rgit@roskilde-gym.dk', 19, 1, 0, 0, '2014-11-07 00:00:00', '2014-05-21 00:00:00', '0000-00-00 00:00:00'),
(854, 1480, 1, 'Selandia, HTX', 'Willemoesvej 4', '4200', 'Slagelse', 'Slagelse', 'Hovedstaden', '3.g.', 'Bioteknologi', 'Frederikke Tom-Petersen', '', 'frto@sceu.dk', 27, 1, 0, 0, '2014-11-11 00:00:00', '2014-05-26 00:00:00', '0000-00-00 00:00:00'),
(855, 1481, 1, 'Stenhus Gymnasium & HF', 'Stenhusvej 20', '4300', 'Holbæk', 'Holbæk', 'Hovedstaden', '3.g.', 'Biologi', 'Johannes Worm', '', 'biosof@gmail.com', 28, 1, 0, 0, '2014-11-12 00:00:00', '2014-05-28 00:00:00', '0000-00-00 00:00:00'),
(856, 1482, -1, 'Slagelse Gymnasium', 'Willemoesvej 2a', '4200', 'Slagelse', 'Slagelse', 'Midtjylland', '2.g.', 'Biologi', 'Kate Beck Jacobsen', '', 'kj@slagelse-gym.dk', 22, 1, 0, 0, '2014-11-13 00:00:00', '2014-05-29 00:00:00', '0000-00-00 00:00:00'),
(857, 1483, 1, 'Grindsted Gymnasium & HF', 'Tinghusgade 20', '7200', 'Grindsted', 'Billund', 'Hovedstaden', '3.g.', 'Biologi', 'Heidi Nystrand', '', 'hn@ggnet.dk', 13, 1, 0, 0, '2014-11-14 00:00:00', '2014-05-28 00:00:00', '0000-00-00 00:00:00'),
(858, 1484, 1, 'Køge Gymnasium', 'Gymnasievej 6', '4600', 'Køge', 'Køge', 'Hovedstaden', '1.g.', 'Bioteknologi', 'Marie Eiland', '', 'kgme@kggym.dk', 15, 1, 0, 0, '2014-11-18 00:00:00', '2014-06-26 00:00:00', '0000-00-00 00:00:00'),
(859, 1485, 1, 'Køge Gymnasium', 'Gymnasievej 6', '4600', 'Køge', 'Køge', 'Hovedstaden', '1.g.', 'Bioteknologi', 'Kristian Poulsen', '', 'kgkp@kggym.dk', 17, 1, 0, 0, '2014-11-19 00:00:00', '2014-06-26 00:00:00', '0000-00-00 00:00:00'),
(860, 1486, 1, 'Allerød Gymnasium', 'Rådhusvej 6', '3450', 'Allerød', 'Allerød', 'Syddanmark', '3.g.', 'Bioteknologi', 'Louise Lund Bækgaard', '', 'louise.lund.baekgaard@skolekom.dk', 12, 1, 0, 0, '2014-11-20 00:00:00', '2014-06-26 00:00:00', '0000-00-00 00:00:00'),
(861, 1487, -1, 'Allerød Gymnasium', 'Rådhusvej 6', '3450', 'Allerød', 'Allerød', 'Hovedstaden', '3.g.', 'Biologi', 'Max Torbensen', '', 'maxtorbensen@hotmail.com', 12, 1, 0, 0, '2014-11-21 00:00:00', '2014-06-26 00:00:00', '0000-00-00 00:00:00'),
(862, 1488, 1, 'Frederiksberg Gymnasium', 'Falkoner Plads 2', '2000', 'Frederiksberg', 'Frederiksberg', 'Sjælland', '2.g.', 'Biologi', 'Camilla Christensen', '', 'camch63@gmail.com', 22, 1, 0, 0, '2014-11-25 00:00:00', '2014-05-26 00:00:00', '0000-00-00 00:00:00'),
(863, 1489, 1, 'Himmelev Gymnasium', 'herregårdsvej30', '4000', 'Roskilde', 'Roskilde', 'Sjælland', '3.g.', 'Biologi', 'Vibeke Almer', '', 'Vibekealmer@gmail.com', 21, 1, 0, 0, '2014-11-26 00:00:00', '2014-07-03 00:00:00', '0000-00-00 00:00:00'),
(864, 1490, 1, 'Gribskov Gymnasium', 'Øster Voldgade 10', '1350', 'København', 'København', 'Hovedstaden', '2.g.', 'Biologi', 'Rudi Pedersen', '', 'rudi.pedersen@skolekom.dk', 19, 1, 0, 0, '2014-11-28 00:00:00', '2014-04-07 00:00:00', '0000-00-00 00:00:00'),
(865, 1491, 1, 'Virum Gymnasium', 'Fuglsangvej 66', '2830', 'Virum', 'Lyngby-Taarbæk', 'Nordjylland', '3.g.', 'Biologi', 'Magnus Groes', '', 'gr@virum-gym.dk', 14, 1, 0, 0, '2014-12-02 00:00:00', '2014-07-31 00:00:00', '0000-00-00 00:00:00'),
(866, 1492, -1, 'Grindsted Gymnasium & HF', 'Tinghusgade 20', '7200', 'Grindsted', 'Billund', 'Hovedstaden', '3.g.', 'Biologi', 'Heidi Nystrand', '', 'hn@ggnet.dk', 28, 0, 0, 0, '2014-12-03 00:00:00', '2014-05-28 00:00:00', '0000-00-00 00:00:00'),
(867, 1493, 1, 'Grindsted Gymnasium & HF', 'Tinghusgade 20', '7200', 'Grindsted', 'Billund', 'Nordjylland', '3.g.', 'Biologi', 'Heidi Nystrand', '', 'hn@ggnet.dk', 12, 1, 0, 0, '2014-12-04 00:00:00', '2014-06-03 00:00:00', '0000-00-00 00:00:00'),
(868, 1493, 1, 'Grindsted Gymnasium & HF', 'Tinghusgade 20', '7200', 'Grindsted', 'Billund', 'Sjælland', '3.g.', 'Biologi', 'Anja Lykke Hundebøll Nielsen', '', 'ah@ggnet.dk', 12, 1, 0, 0, '2014-12-04 00:00:00', '2014-08-04 00:00:00', '0000-00-00 00:00:00'),
(869, 1494, 1, 'Erhvervsskolen Nordsjælland, HTX Hillerød', 'Carlsbergvej 34', '3400', 'Hillerød', 'Hillerød', 'Syddanmark', '3.g.', 'Biologi', 'Peter Rostgaard Christensen', '', 'prc@esnord.dk', 13, 1, 0, 0, '2014-12-05 00:00:00', '2014-08-26 00:00:00', '0000-00-00 00:00:00'),
(870, 1495, 1, 'Ørestad Gymnasium', 'Ørestads Boulevard 75', '2300', 'København', 'København', 'Hovedstaden', '2.g.', 'Bioteknologi', 'Mia Godiksen', '', 'mtg@oegnet.dk', 31, 1, 0, 0, '2014-12-09 00:00:00', '2014-07-02 00:00:00', '0000-00-00 00:00:00'),
(871, 1496, 1, 'Roskilde Katedralskole', 'Holbækvej 59', '4000', 'Roskilde', 'Roskilde', 'Hovedstaden', '2.g.', 'Bioteknologi', 'Mogens Ellebæk', '', 'Mogens.Ellebaek@rks-gym.dk', 30, 1, 0, 0, '2014-12-10 00:00:00', '2014-04-08 00:00:00', '0000-00-00 00:00:00'),
(872, 1497, -1, 'Gladsaxe Gymnasium', 'Buddingehovedgade 81', '2860', 'Søborg', 'Gladsaxe', 'Hovedstaden', '3.g.', 'Bioteknologi', 'Martina Koch og Allan G. Olsen', '', 'MaK@gladgym.dk', 26, 2, 0, 0, '2014-12-11 00:00:00', '2014-08-11 00:00:00', '0000-00-00 00:00:00'),
(873, 1498, 1, 'FYNs HF-kursus', 'Hunderupvej 17', '5000', 'Odense', 'Odense', 'Hovedstaden', '2.g.', 'Biologi', 'Mariann Rasmussen', '', 'mrm@vucfyn.dk', 10, 1, 0, 0, '2014-12-12 00:00:00', '2014-06-19 00:00:00', '0000-00-00 00:00:00'),
(874, 1499, -1, 'Helsingør Gymnasium', 'Borgmester P. Christensensvej 3', '3000', 'Helsingør', 'Helsingør', 'Hovedstaden', '2.g.', 'Bioteknologi', 'Stine Weber', '', 'sw@hels-gym.dk', 28, 2, 0, 0, '2014-12-16 00:00:00', '2014-08-20 00:00:00', '0000-00-00 00:00:00'),
(875, 1500, 1, 'Allerød Gymnasium', 'Rådhusvej 6', '3450', 'Allerød', 'Allerød', 'Hovedstaden', '2.g.', 'Biologi', 'Malthe Lund', '', 'malthelund@gmail.com', 26, 1, 0, 0, '2014-12-17 00:00:00', '2014-06-26 00:00:00', '0000-00-00 00:00:00'),
(876, 1501, 1, 'Gefion Gymnasium', 'Øster Voldgade 10', '1350', 'København', 'København', 'Hovedstaden', '2.g.', 'Biologi', 'Signe Engelsen', '', 'sen@gefion-gym.dk', 30, 1, 0, 0, '2014-12-18 00:00:00', '2014-08-26 00:00:00', '0000-00-00 00:00:00'),
(877, 1502, -1, 'Helsingør Gymnasium', 'Borgmester P. Christensensvej 3', '3000', 'Helsingør', 'Helsingør', 'Midtjylland', '3.g.', 'Biologi', 'Ole Carsten Pedersen', '', 'oc@hels-gym.dk', 23, 1, 0, 0, '2015-01-06 00:00:00', '2014-08-18 00:00:00', '0000-00-00 00:00:00'),
(878, 1503, -1, 'Helsingør Gymnasium', 'Borgmester P. Christensensvej 3', '3000', 'Helsingør', 'Helsingør', 'Midtjylland', '3.g.', 'Biologi', 'Maria Steinhausen', '', 'st@hels-gym.dk', 24, 1, 0, 0, '2015-01-07 00:00:00', '2014-08-18 00:00:00', '0000-00-00 00:00:00'),
(879, 1504, 1, 'Vordingborg Gymnasium & HF', 'Chr. Richardtsvej 45', '4760', 'Vordingborg', 'Vordingborg', 'Hovedstaden', '3.g.', 'Bioteknologi', 'Nils Skov Jørgensen', '29122221', 'nj@vordingborg-gym.dk', 23, 1, 0, 0, '2015-01-07 00:00:00', '2014-11-21 00:00:00', '0000-00-00 00:00:00'),
(880, 1505, 1, 'Gladsaxe Gymnasium', 'Buddingehovedgade 81', '2860', 'Søborg', 'Gladsaxe', 'Hovedstaden', '3.g.', 'Bioteknologi', 'Natacha Bjerre og Anne Christine', '', 'natachabjerre@gmail.com', 36, 2, 0, 0, '2015-01-08 00:00:00', '2014-08-12 00:00:00', '0000-00-00 00:00:00'),
(881, 1506, -1, 'Midtsjællands Gymnasieskole', 'Ahorn Alle 11', '4100', 'Ringsted', 'Ringsted', 'Sjælland', '3.g.', 'Biologi', 'Pernille Lærkedal Sørensen', '', 'ps@msg-gym.dk', 15, 1, 0, 0, '2015-01-09 00:00:00', '2014-08-31 00:00:00', '0000-00-00 00:00:00'),
(882, 1507, 1, 'Gladsaxe Gymnasium', 'Buddinge Hovedgade 81', '', '2860', 'Gladsaxe', 'Hovedstaden', '3.g.', 'Bioteknologi', 'Martina Koch og Allan G. Olsen', '27570444', 'mak@gladgym.dk', 26, 2, 0, 0, '2015-01-09 00:00:00', '2014-12-05 00:00:00', '0000-00-00 00:00:00'),
(883, 1508, 1, 'Gladsaxe Gymnasium', 'Buddinge Hovedgade 81', '2860', 'Søborg', 'Gladsaxe', 'Hovedstaden', '2.g.', 'Bioteknologi', 'Natacha Bjerre', '', 'natachabjerre@gmail.com', 30, 1, 0, 0, '2015-01-13 00:00:00', '2014-05-22 00:00:00', '0000-00-00 00:00:00'),
(884, 1509, 1, 'Høje-Taastrup Gymnasium', 'Frøgårds Alle 2', '2630', 'Taastrup', 'Høje-Taastrup', 'Sjælland', '2.g.', 'Biologi', 'Søren Vienberg', '', 'soeren_vienberg@yahoo.com', 15, 1, 0, 0, '2015-01-14 00:00:00', '2014-06-24 00:00:00', '0000-00-00 00:00:00'),
(885, 1510, 1, 'Odense Katedralskole', 'Jernbanegade 34', '5000', 'Odense', 'Odense', 'Hovedstaden', '3.g.', 'Bioteknologi', 'Jesper Terp', '', 'jesper.terp.joergensen1@skolekom.dk', 24, 1, 0, 0, '2015-01-15 00:00:00', '2014-07-01 00:00:00', '0000-00-00 00:00:00'),
(886, 1511, 1, 'Nørre Gymnasium', 'Mørkhøjvej 78', '2700', 'Brønshøj', 'København', 'Hovedstaden', '2.g.', 'Biologi', 'Helle Nielsen', '', 'ni@norreg.dk', 29, 1, 0, 0, '2015-01-16 00:00:00', '2014-08-25 00:00:00', '0000-00-00 00:00:00'),
(887, 1512, 1, 'Køge Gymnasium', 'Gymnasievej 6', '4600', 'Køge', 'Køge', 'Hovedstaden', '3.g.', 'Bioteknologi', 'Kristian Poulsen', '', 'kgkp@kggym.dk', 10, 1, 0, 0, '2015-01-20 00:00:00', '2014-06-26 00:00:00', '0000-00-00 00:00:00'),
(888, 1513, 1, 'Greve Gymnasium', 'Rådhusholmen 12', '2670', 'Greve', 'Greve', 'Hovedstaden', '3.g.', 'Bioteknologi', 'Vibeke Birkmann', '', 'ggvbi@greve-gym.dk', 28, 2, 0, 0, '2015-01-21 00:00:00', '2014-06-22 00:00:00', '0000-00-00 00:00:00'),
(889, 1514, 1, 'Stenhus Gymnasium & HF', 'Stenhusvej 20', '4300', 'Holbæk', 'Holbæk', 'Sjælland', '3.g.', 'Bioteknologi', 'Nadja Ramseyer', '', 'nramseyer@gmail.com', 26, 2, 0, 0, '2015-01-22 00:00:00', '2014-08-07 00:00:00', '0000-00-00 00:00:00'),
(890, 1515, 1, 'Nørresundby Gymnasium & HF', 'Studievej 14', '9400', 'Nørresundby', 'Aalborg', 'Sjælland', '3.g.', 'Bioteknologi', 'Karen Margrethe Melchiorsen', '', 'kme@nghf.dk', 19, 1, 0, 0, '2015-01-23 00:00:00', '2014-09-11 00:00:00', '0000-00-00 00:00:00'),
(891, 1516, 1, 'Rungsted Gymnasium', 'Stadion Allé 14', '2960', 'Rungsted', 'Hørsholm', 'Sjælland', '3.g.', 'Bioteknologi', 'Knud Johnsen', '', 'jo@rungsted-gym.dk', 10, 1, 0, 0, '2015-01-27 00:00:00', '2014-08-19 00:00:00', '0000-00-00 00:00:00'),
(892, 1517, -1, 'Helsingør Gymnasium', 'Borgmester P. Christensensvej 3', '3000', 'Helsingør', 'Helsingør', 'Sjælland', '3.g.', 'Biologi', 'Maria Steinhausen', '20810825', 'st@hels-gym.dk', 21, 2, 0, 0, '2015-01-28 00:00:00', '2014-11-19 00:00:00', '0000-00-00 00:00:00'),
(893, 1518, 1, 'Roskilde Gymnasium', 'Domkirkepladsen', '4000', 'Roskilde', 'Roskilde', 'Sjælland', '2.g.', 'Biologi', 'Gorm Clausen', '26804725', 'rggc@roskilde-gym.dk', 26, 3, 0, 0, '2015-01-29 00:00:00', '2014-11-13 00:00:00', '0000-00-00 00:00:00'),
(894, 1519, 1, 'Helsingør Gymnasium', 'Borgmester P. Christensensvej 3', '3000', 'Helsingør', 'Helsingør', 'Sjælland', '3.g.', 'Biologi', 'Maria Steinhausen', '21665090', 'st@hels-gym.dk', 15, 1, 0, 0, '2015-02-03 00:00:00', '2014-11-19 00:00:00', '0000-00-00 00:00:00'),
(895, 1520, 1, 'VUC Roskilde', 'Læderstræde 4', '4000', 'Roskilde', 'Roskilde', 'Sjælland', '2.g.', 'Biologi', 'Jesper B. Petersen', '60321946', 'rjp@vucroskilde.dk', 15, 1, 0, 0, '2015-02-04 00:00:00', '2014-11-07 00:00:00', '0000-00-00 00:00:00'),
(896, 1521, 1, 'Gentofte HF', 'Dahlensstræde 5', '2820', 'Gentofte', 'Gentofte', 'Hovedstaden', '2.g.', 'Biologi', 'Jens Gerup Nielsen', '21167761', 'jens.liane@mail.dk', 24, 1, 0, 0, '2015-02-05 00:00:00', '2014-04-08 00:00:00', '0000-00-00 00:00:00'),
(897, 1522, -1, 'Bagsværd kostskole og Gymnasium', 'Aldershvilevej 138', '2880', 'Bagsværd', 'Gladsaxe', 'Hovedstaden', '2.g.', 'Bioteknologi', 'Kirsten Thøgersen', '30668133', 'kt@bagkost.dk', 23, 1, 0, 0, '2015-02-06 00:00:00', '2014-11-27 00:00:00', '0000-00-00 00:00:00'),
(898, 1523, 1, 'Helsingør Gymnasium', 'Borgmester P Christensensvej 3', '3000', 'Helsingør', 'Helsingør', 'Hovedstaden', '2.g.', 'Bioteknologi', 'Stine Weber', '51946203', 'sw@hels-gym.dk', 25, 2, 0, 0, '2015-02-17 00:00:00', '2014-12-16 00:00:00', '0000-00-00 00:00:00'),
(899, 1524, 1, 'Hvidovre Gymnasium & HF', 'Blytækkerporten 2', '2650', 'Hvidovre', 'Hvidovre', 'Hovedstaden', '2.g.', 'Biologi', 'Rune Runesen', '', 'rune.runesen1@skolekom.dk', 20, 2, 0, 0, '2015-02-20 00:00:00', '2014-09-22 00:00:00', '0000-00-00 00:00:00'),
(900, 1525, 1, 'Gladsaxe Gymnasium', 'Buddinge hovedgade 81', '2860', 'Søborg', 'Gladsaxe', 'Hovedstaden', '2.g.', 'Biologi', 'Martina Koch ', '27570444', 'martina.e.k@gmail.com', 16, 1, 0, 0, '2015-02-24 00:00:00', '2015-01-21 00:00:00', '0000-00-00 00:00:00'),
(901, 1526, 1, 'Helsingør Gymnasium', 'Borgmester P Christensensvej 3', '3000', 'Helsingør', 'Helsingør', 'Hovedstaden', '3.g.', 'Biologi', 'Ole Carsten Pedersen', '21665090', 'oc@hels-gym.dk', 20, 1, 0, 0, '2015-02-26 00:00:00', '2014-11-19 00:00:00', '0000-00-00 00:00:00'),
(902, 1527, 1, 'Frederiksberg Gymnasium', 'Falkoner Plads 2', '2000', 'Frederiksberg', 'Frederiksberg', 'Hovedstaden', '3.g.', 'Biologi', 'Peter Toft', '30258217', 'pt@frederiksberggymnasium.dk', 23, 1, 0, 0, '2015-02-27 00:00:00', '2014-11-12 00:00:00', '0000-00-00 00:00:00'),
(903, 1528, 1, 'Svendborg Gymnasium & HF', 'AP Møllersvej 35', '5700', 'Svendborg', 'Svendborg', 'Hovedstaden', '2.g.', 'Biologi', 'Mette Lise Gade Nielsen', '', 'mn@svendborg-gym.dk', 28, 1, 0, 0, '2015-03-06 00:00:00', '2014-06-01 00:00:00', '0000-00-00 00:00:00'),
(904, 1529, 1, 'Greve Gymnasium', 'Rådhusholmen 12', '2670', 'Greve', 'Greve', 'Hovedstaden', '3.g.', 'Biologi', 'Lone Vinkel', '', 'gglav@greve-gym.dk', 21, 1, 0, 0, '2015-03-10 00:00:00', '2014-06-17 00:00:00', '0000-00-00 00:00:00'),
(905, 1530, 1, 'Høje-Taastrup Gymnasium', 'Frøgårds Alle 2', '2630', 'Taastrup', 'Høje-Taastrup', 'Sjælland', '2.g.', 'Biologi', 'Thomas Warner', '', 'tw@htgym.dk', 24, 2, 0, 0, '2015-03-11 00:00:00', '2014-06-30 00:00:00', '0000-00-00 00:00:00'),
(906, 1531, 1, 'Høje-Taastrup Gymnasium', 'Frøgårds Alle 2', '2630', 'Taastrup', 'Høje-Taastrup', 'Hovedstaden', '2.g.', 'Biologi', 'Thomas Warner', '', 'tw@htgym.dk', 0, 0, 0, 0, '2015-03-11 00:00:00', '2014-06-30 00:00:00', '0000-00-00 00:00:00'),
(907, 1532, 1, 'Odsherreds Gymnasium', 'Åstoftevej 34', '4550', 'Asnæs', 'Odsherred', 'Hovedstaden', '3.g.', 'Bioteknologi', 'Klaus Karlsen', '', 'Klaus.karlsen@skolekom.dk', 21, 1, 0, 0, '2015-03-17 00:00:00', '2014-08-14 00:00:00', '0000-00-00 00:00:00'),
(908, 1533, 1, 'TEC Lyngby', 'Bygning 451, Akademivej', '2800', 'Kongens', 'Lyngby-Taarbæk', 'Syddanmark', '2.g.', 'Bioteknologi', 'Hanne Lodberg Olsen', '41418968', 'hlo@tec.dk', 24, 1, 0, 0, '2015-03-19 00:00:00', '2015-01-20 00:00:00', '0000-00-00 00:00:00'),
(909, 1534, 1, 'Nørre Gymnasium', 'Mørkhøjvej 72', '2700', 'brønshøj', 'København', 'Hovedstaden', '2.g.', 'Biologi', 'Katie Lin Pedersen', '26712621', 'kl@norreg.dk', 21, 2, 0, 0, '2015-03-20 00:00:00', '2015-01-04 00:00:00', '0000-00-00 00:00:00'),
(910, 1535, -1, 'Institut for skole og læring', 'Nyelandsvej 27-29', '2000', 'Frederiksberg', 'Frederiksberg', 'Hovedstaden', 'Lærerstuderende', '', 'Henrik Levinsen', '41411142', 'hele@phmetropol.dk', 22, 1, 0, 0, '2015-03-24 00:00:00', '2015-01-13 00:00:00', '0000-00-00 00:00:00'),
(911, 1536, 1, 'Øregård Gymnasium', 'Gersonsvej 32', '2900', 'Hellerup', 'Gentofte', 'Sjælland', '3.g.', 'Biologi', 'Vibeke Tromholt', '30383038', 'vt@oregard.dk', 15, 1, 0, 0, '2015-03-25 00:00:00', '2014-11-20 00:00:00', '0000-00-00 00:00:00'),
(912, 1537, 1, 'Himmelev Gymnasium', 'Herregårdsvej 30', '4000', 'Roskilde', 'Roskilde', 'Sjælland', '2.g.', 'Biologi', 'Mai Bjerg Hagens', '', 'maihagens@gmail.com', 23, 1, 0, 0, '2015-03-26 00:00:00', '2015-02-06 00:00:00', '0000-00-00 00:00:00'),
(913, 1538, 1, 'Egedal Gymnasium & HF', 'Gymnasievej 1', '3660', 'Stenløse', 'Egedal', 'Sjælland', '3.g.', 'Biologi', 'Rikke Anker Jensen', '29914554', 'rj@egedal-gym.dk', 16, 1, 0, 0, '2015-04-07 00:00:00', '2015-02-02 00:00:00', '0000-00-00 00:00:00'),
(914, 1539, -1, 'Nørre Gymnasium', 'Mørkhøjvej 78', '2700', 'Brønshøj', 'København', 'Hovedstaden', '1.g.', 'Biologi', 'Dorte Gedde', '', 'dg@norreg.dk', 28, 1, 0, 0, '2015-04-08 00:00:00', '2014-08-19 00:00:00', '0000-00-00 00:00:00'),
(915, 1540, 1, 'Gladsaxe Gymnasium', 'Buddinge Hovedgade 81', '2860', 'Søborg', 'Gladsaxe', 'Hovedstaden', '3.g.', 'Biologi', 'Natacha Bjerre og Allan Olsen', '61685550', 'natachabjerre@gmail.com', 12, 2, 0, 0, '2015-04-08 00:00:00', '2015-01-12 00:00:00', '0000-00-00 00:00:00'),
(916, 1540, 1, 'Horsens Gymnasium', 'Højen 1', '8700', 'Horsens', 'Horsens', 'Sjælland', '3.g.', 'Biologi', 'Rasmus Østergaard', '61685550', 'roe@horsensgym.dk', 6, 2, 0, 0, '2015-04-08 00:00:00', '2015-01-12 00:00:00', '0000-00-00 00:00:00'),
(917, 1541, 1, 'Rødovre Gymnasium', 'Hendriksholms Boulevard 28', '2610', 'Rødovre', 'Rødovre', 'Sjælland', '2.g.', 'Biologi', 'Liane Gerup Damsø', '', 'liane.damsoe@skolekom.dk', 28, 1, 0, 0, '2015-04-09 00:00:00', '2014-07-23 00:00:00', '0000-00-00 00:00:00'),
(918, 1542, 1, 'Øregård Gymnasium', 'Gersonsvej 32', '2900', 'Hellerup', 'København', 'Sjælland', '3.g.', 'Biologi', 'John hansen', '30383974', 'johnbrut@hotmail.com', 17, 1, 0, 0, '2015-04-10 00:00:00', '2014-11-20 00:00:00', '0000-00-00 00:00:00'),
(919, 1543, -1, 'Køge Private Realskole, Gymnasium', 'Ølby Center 50', '4600', 'Køge', 'Køge', 'Hovedstaden', '1.g.', 'Biologi', 'Marie Kvist Bondesen', '30283077', 'mariebondesen@gmail.com', 15, 1, 0, 0, '2015-04-14 00:00:00', '2015-01-04 00:00:00', '0000-00-00 00:00:00'),
(920, 1544, 1, 'Morsø Gymnasium', 'Limfjordsvej 95', '7900', 'Nykøbing', 'Morsø', 'Syddanmark', '3.g.', 'Biologi', 'Lene Olesen Jensen', '21459353', 'leneviggo@mail.dk', 17, 2, 0, 0, '2015-04-15 00:00:00', '2015-01-09 00:00:00', '0000-00-00 00:00:00'),
(921, 1545, 1, 'Gladsaxe Gymnasium', 'buddinge hovedgade 81', '2860', 'Søborg', 'Gladsaxe', 'Syddanmark', '3.g.', 'Biologi', 'Allan Olsen', '31500392', 'ao@gladgym.dk', 18, 1, 0, 0, '2015-04-16 00:00:00', '2015-01-12 00:00:00', '0000-00-00 00:00:00'),
(922, 1546, -1, 'Køge Private Realskole, Gymnasium', 'Ølby Center 50', '4600', 'Køge', 'Køge', 'Hovedstaden', '1.g.', 'Biologi', 'Marie Kvist Bondesen', '30283077', 'mariebondesen@gmail.com', 15, 1, 0, 0, '2015-04-17 00:00:00', '2015-01-04 00:00:00', '0000-00-00 00:00:00'),
(923, 1547, 1, 'Nordvestsjællands HF & VUC', 'Slotshaven 5', '4300', 'Holbæk', 'Holbæk', 'Hovedstaden', '2.g.', 'Biologi', 'Johnny Vingart Kjerside', '24922021', 'jvk@nvsvuc.dk', 24, 1, 0, 0, '2015-04-17 00:00:00', '2015-01-20 00:00:00', '0000-00-00 00:00:00'),
(924, 1548, 1, 'Sankt Annæ Gymnasium', 'Sjælør Boulevard 135', '2500', 'Valby', 'København', 'Hovedstaden', '3.g.', 'Bioteknologi', 'Mette Bohn Christiansen', '20269256', 'mc@sag.dk', 16, 4, 0, 0, '2015-04-21 00:00:00', '2015-01-04 00:00:00', '0000-00-00 00:00:00'),
(925, 1549, 1, 'Ørestad Gymnasium', 'Ørestad Boulevard 75', '2300', 'København', 'København', 'Hovedstaden', '3.g.', 'Biologi', 'Sofie Bruhns', '29861030', 'srb@oegnet.dk', 24, 1, 0, 0, '2015-04-22 00:00:00', '2015-01-04 00:00:00', '0000-00-00 00:00:00'),
(926, 1550, 1, 'Rysensteen Gymnasium', 'Tietgensgade 74', '1704', 'København', 'København', 'Hovedstaden', '1.g.', 'Bioteknologi', 'Søren Søgaard', '', 'ss@rysensteen.dk', 29, 1, 0, 0, '2015-04-23 00:00:00', '2014-08-06 00:00:00', '0000-00-00 00:00:00'),
(927, 1551, 1, 'Tørring Gymnasium', 'Kirkevej 20', '7160', 'Tørring', 'Hedensted ', 'Hovedstaden', '3.g.', 'Biologi', 'Frank Grønlund Jørgensen', '60607862', 'fg@toerring-gym.dk', 24, 1, 0, 0, '2015-04-24 00:00:00', '2015-01-09 00:00:00', '0000-00-00 00:00:00'),
(928, 1551, 1, 'Tørring Gymnasium', 'Kirkevej 20', '7160', 'Tørring', 'Hedensted ', 'Hovedstaden', '3.g.', 'Biologi', 'Frank Grønlund Jørgensen', '', '', 0, 0, 0, 0, '2015-04-24 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(929, 1552, -1, 'Vordingborg Gymnasium & HF', 'Chr. Richardtsvej 43', '4758', 'Vordingborg', 'Vordingborg', 'Hovedstaden', '2.g.', 'Biologi+biotek', 'Åse Uttenthal', '', 'aau@vordingborg-gym.dk', 30, 2, 0, 0, '2015-04-28 00:00:00', '2014-09-07 00:00:00', '0000-00-00 00:00:00'),
(930, 1553, 1, 'Himmelev Gymnasium', 'Herregårdsvej 30', '4000', 'Roskilde', 'Roskilde', 'Hovedstaden', '2.g.', 'Biologi', 'Mai Bjerg Hagens', '25398979', 'maihagens@gmail.com', 23, 1, 0, 0, '2015-04-28 00:00:00', '2015-01-30 00:00:00', '0000-00-00 00:00:00'),
(931, 1554, 1, 'Københavns Åbne Gymnasium', 'Sjælør Boulevard 133', '2500', 'Valby', 'København', 'Hovedstaden', '1.g.', 'Biologi', 'Martin Mejlhede Jensen', '', '', 0, 0, 0, 0, '2015-04-29 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(932, 1554, 1, 'Københavns Åbne Gymnasium', 'Sjælør Boulevard 133', '2500', 'Valby', 'København', 'Syddanmark', '1.g.', 'Biologi', 'Martin Mejlhede Jensen', '', 'mt@kg.dk', 28, 1, 0, 0, '2015-04-29 00:00:00', '2014-08-21 00:00:00', '0000-00-00 00:00:00'),
(933, 1555, 1, 'Høng Gymnasium og HF', 'Hovedgaden 2', '4270', 'Høng', 'Kalundborg', 'Sjælland', '1.g.', 'Biologi', 'Tine Tønnes Sørensen', '', 'ts@hoeng-gymhf.dk', 4, 1, 0, 0, '2015-04-30 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(934, 1555, 1, 'Køge Private Realskole, Gymnasium', 'Ølby Center 50', '4600', 'Køge', 'Køge', 'Hovedstaden', '1.g.', 'Biologi', 'Marie Kvist Bondesen', '30283077', 'mariebondesen@gmail.com', 20, 1, 0, 0, '2015-04-30 00:00:00', '2015-01-13 00:00:00', '0000-00-00 00:00:00'),
(935, 1556, 1, 'Køge Private Realskole, Gymnasium', 'Ølby Center 50', '4600', 'Køge', 'Køge', 'Hovedstaden', '1.g.', 'Biologi', 'Marie Kvist Bondesen', '30283077', 'mariebondesen@gmail.com', 16, 1, 0, 0, '2015-05-05 00:00:00', '2015-01-13 00:00:00', '0000-00-00 00:00:00'),
(936, 1557, -1, 'Aurehøj Gymnasium', 'Skolevej 7', '2820', 'Gentofte', 'Gentofte', 'Hovedstaden', '2.g.', 'Biologi', 'Anne Winther Jørgensen', ' ', 'aj@aurehoej.dk', 8, 1, 0, 0, '2015-05-06 00:00:00', '2015-03-19 00:00:00', '0000-00-00 00:00:00'),
(937, 1558, -1, 'Rødovre Gymnasium', 'hendrikholms bouleward 28', '2610', 'Rødovre', 'Rødovre', 'Hovedstaden', '1.g.', 'Biologi', 'liane gerup damsø', '29866967', 'liane.damsoe@skolekom.dk', 28, 2, 0, 0, '2015-05-06 00:00:00', '2015-04-16 00:00:00', '0000-00-00 00:00:00'),
(938, 1559, -1, 'Vordingborg Gymnasium & HF', 'Chr. Richardtsvej 44', '4759', 'Vordingborg', 'Vordingborg', 'Hovedstaden', '3.g.', 'Biologi', 'Jeppe Mordhorst', '40685274', 'jm@vordingborg-gym.dk', 15, 1, 0, 0, '2015-05-06 00:00:00', '2015-01-13 00:00:00', '0000-00-00 00:00:00'),
(939, 1560, 0, 'Vordingborg Gymnasium & HF', 'Chr. Richardtsvej 45', '4760', 'Vordingborg', 'Vordingborg', 'Hovedstaden', '3.g.', 'Bioteknologi', 'Nils Skov Jørgensen', '29122221', 'nj@vordingborg-gym.dk', 15, 1, 0, 0, '2015-05-07 00:00:00', '2015-01-14 00:00:00', '0000-00-00 00:00:00'),
(940, 1561, 1, 'Gribskov Gymnasium', 'Østergade 52', '3200', 'Helsinge', 'Gribskov', 'Hovedstaden', '3.g.', 'Biologi', 'Morten Wermer', '24677788', 'mw@gribskovgymnasium.dk', 15, 1, 0, 0, '2015-05-08 00:00:00', '2015-02-05 00:00:00', '0000-00-00 00:00:00'),
(941, 1562, 1, 'Vordingborg Gymnasium & HF', 'Chr. Richardsvej 45', '4760', 'vordingborg', 'Vordingborg', 'Midtjylland', '2.g.', 'Biologi', 'Åse Uttenthal', '23711143', 'aau@vordingborg-gym.dk', 30, 2, 0, 0, '2015-05-12 00:00:00', '2015-01-13 00:00:00', '0000-00-00 00:00:00'),
(942, 1563, 1, 'Sankt Annæ Gymnasium', 'Sjælør Boulevard 135', '2500', 'Valby', 'København', 'Sjælland', '1.g.', 'Bioteknologi', 'Hans Marker', '', 'hm@sag.dk', 15, 1, 0, 0, '2015-05-13 00:00:00', '2014-05-21 00:00:00', '0000-00-00 00:00:00'),
(943, 1563, 1, 'Sankt Annæ Gymnasium', 'Sjælør Boulevard 135', '2500', 'Valby', 'København', 'Sjælland', '1.g.', 'Bioteknologi', 'Hans Marker', '', 'hm@sag.dk', 0, 0, 0, 0, '2015-05-13 00:00:00', '2014-05-21 00:00:00', '0000-00-00 00:00:00'),
(944, 1564, 1, 'Greve Gymnasium', 'Rådhusholmen 12', '2670', 'Greve', 'Greve', 'Hovedstaden', '2.g.', 'Bioteknologi', 'Kenneth Beri Ploug', '23234288', 'ggkbp@greve-gym.dk', 22, 2, 0, 0, '2015-05-19 00:00:00', '2015-01-22 00:00:00', '0000-00-00 00:00:00'),
(945, 1564, 1, 'Greve Gymnasium', 'Rådhusholmen 12', '2670', 'Greve', 'Greve', 'Sjælland', '2.g.', 'Bioteknologi', 'Kenneth Beri Ploug', '23234288', 'ggkbp@greve-gym.dk', 0, 0, 0, 0, '2015-05-19 00:00:00', '2015-01-22 00:00:00', '0000-00-00 00:00:00'),
(946, 1565, -1, 'Birkerød Gymnasium - HF - IB & Kostskole', 'Søndervangen 56, ', '3460', 'Birkerød', 'Rudersdal', 'Hovedstaden', '2.g.', 'Biologi', 'Christina Høier Ricke', '61696739', 'cr@birke-gym.dk', 26, 1, 0, 0, '2015-05-20 00:00:00', '2015-03-11 00:00:00', '0000-00-00 00:00:00'),
(947, 1566, 1, 'Christianshavns Gymnasium', 'Prinsessegade 35 ', '1422', 'København', 'København', 'Hovedstaden', '2.g.', 'Biologi', 'Rasmus Andreasen', '26826010', 'ra@cg-gym.dk', 15, 1, 0, 0, '2015-05-21 00:00:00', '2015-02-05 00:00:00', '0000-00-00 00:00:00'),
(948, 1567, 1, 'Erhvervsskolen Nordsjælland, HTX Hillerød', 'Carlsbergvej 34', '3400', 'Hillerød', 'Hillerød', 'Sjælland', '1.g.', 'Biologi', 'Peter Rostgaard Christensen', '21515609', 'prc@esnord.dk', 22, 1, 0, 0, '2015-05-22 00:00:00', '2015-04-08 00:00:00', '0000-00-00 00:00:00'),
(949, 1568, 1, 'Ordrup Gymnasium', 'Kirkevej 5', '2920', 'Charlottenlund', 'Gentofte', 'Syddanmark', '1.g.', 'Bioteknologi', 'Karin Frykman', '22253576', 'karinfrykman@gmail.com', 25, 3, 0, 0, '2015-05-28 00:00:00', '2015-02-06 00:00:00', '0000-00-00 00:00:00'),
(950, 1569, 1, 'Rysensteen Gymnasium', 'Tietgensgade 74', '1704', 'København', 'København', 'Sjælland', '2.g.', 'Bioteknologi', 'Kasper Kristiansen', '20656667', 'kk@rysensteen.dk', 25, 2, 0, 0, '2015-05-29 00:00:00', '2015-05-04 00:00:00', '0000-00-00 00:00:00'),
(951, 1570, 1, 'Rødovre Gymnasium', 'Hendrikholms Boulevard 28', '2610', 'Rødovre', 'København', 'Hovedstaden', '1.g.', 'Bioteknologi', 'Liane Gerup Damsø', '29866967', 'liane.damsoe@skolekom.dk', 26, 2, 0, 0, '2015-06-03 00:00:00', '2015-04-20 00:00:00', '0000-00-00 00:00:00'),
(952, 1571, 1, 'Rødovre Gymnasium', 'Hendrikholms Boulevard 28', '2610', 'Rødovre', 'København', 'Hovedstaden', '1.g.', 'Bioteknologi', 'Liane Gerup Damsø', '29866967', 'liane.damsoe@skolekom.dk', 0, 0, 0, 0, '2015-06-03 00:00:00', '2015-04-20 00:00:00', '0000-00-00 00:00:00'),
(953, 1572, -1, 'Tårnby Gymnasium & HF', 'Tejn alle 5', '2770', 'Kastrup', 'Tårnby', 'Hovedstaden', '3.g.', 'Bioteknologi', 'Ingelise Drozd Lund', '20438015', 'il@tgy.dk', 18, 1, 0, 0, '2015-08-25 00:00:00', '2015-04-08 00:00:00', '0000-00-00 00:00:00'),
(954, 1573, 1, 'Svendborg Gymnasium & HF', 'A.P. Møllersvej 35', '5700', 'Svendborg', 'Svendborg', 'Hovedstaden', '3.g.', 'Bioteknologi', 'Peter Teglhøj', '27117255', 'pt@svendborg-gym.dk', 26, 2, 0, 0, '2015-08-25 00:00:00', '2015-06-25 00:00:00', '0000-00-00 00:00:00'),
(955, 1574, 1, 'Gammel Hellerup Gymnasium', 'Svanemøllevej 87', '2900', 'Hellerup', 'Gentofte', 'Hovedstaden', '2.g.', 'Bioteknologi', 'Mie Marving', '26171557', 'mi@ghg.dk', 28, 2, 0, 0, '2015-08-26 00:00:00', '2015-04-16 00:00:00', '0000-00-00 00:00:00'),
(956, 1575, 1, 'Københavns åbne Gymnasium', 'Sjælør Boulevard', '2500', 'Valby', 'København', 'Hovedstaden', '2.g.', 'Biologi', 'Finn Vanman Jørgensen', '25778059', 'fv@kg.dk', 15, 1, 0, 0, '2015-08-27 00:00:00', '2015-04-29 00:00:00', '0000-00-00 00:00:00'),
(957, 1576, 1, 'Frederiksværk Gymnasium og HF', 'Strandgade 34', '3300', 'Frederiksværk', 'Halsnæs', 'Hovedstaden', '2.g.', 'Biologi', 'Bente Lerner Bregnbak', '21267728', 'bb@fvgh.dk', 23, 1, 0, 0, '2015-08-28 00:00:00', '2015-03-30 00:00:00', '0000-00-00 00:00:00'),
(958, 1577, -1, 'Viborg Gymnasium og HF', 'Skaldehøjvej 12', '8800', 'Viborg', 'Viborg', 'Hovedstaden', '3.g.', 'Bioteknologi', 'Ulla Hjorth', '29898048', 'uh@vghf.dk', 15, 1, 0, 0, '2015-09-01 00:00:00', '2015-01-08 00:00:00', '0000-00-00 00:00:00'),
(959, 1578, 1, 'Ørestad Gymnasium', 'Ørestad Boulevard 75', '2300', 'København', 'København', 'Hovedstaden', '3.g.', 'Biologi', 'Sofie Bruhns', '29861030', 'srb@oegnet.dk', 26, 1, 0, 0, '2015-09-02 00:00:00', '2015-01-09 00:00:00', '0000-00-00 00:00:00'),
(960, 1579, 1, 'Gefion Gymnasium', 'Øster Voldgade 10', '1350', 'Kbh', 'København', 'Hovedstaden', '2.g.', 'Bioteknologi', 'Birgit Eliasson', '21692063', 'Bel@gefion-gym.dk', 24, 2, 0, 0, '2015-09-03 00:00:00', '2015-04-07 00:00:00', '0000-00-00 00:00:00'),
(961, 1579, 1, 'Gefion Gymnasium', 'Øster Voldgade 10', '1350', 'Kbh', 'København', 'Sjælland', '2.g.', 'Bioteknologi', 'Birgit Eliasson', '21692063', 'Bel@gefion-gym.dk', 0, 0, 0, 0, '2015-09-03 00:00:00', '2015-04-07 00:00:00', '0000-00-00 00:00:00'),
(962, 1580, -1, 'Allerød Gymnasium', 'Rådhusvej 6', '3450', 'Allerød', 'Allerød', 'Hovedstaden', '2.g.', 'Bioteknologi', 'Louise Lund Bækgaard', '26152562', 'louise.lund.baekgaard@skolekom.dk', 23, 1, 0, 0, '2015-09-04 00:00:00', '2015-04-20 00:00:00', '0000-00-00 00:00:00'),
(963, 1580, -1, 'Allerød Gymnasium', 'Rådhusvej 6', '3450', 'Allerød', 'Allerød', 'Hovedstaden', '2.g.', 'Bioteknologi', 'Louise Lund Bækgaard', '26152562', 'louise.lund.baekgaard@skolekom.dk', 0, 0, 0, 0, '2015-09-04 00:00:00', '2015-04-20 00:00:00', '0000-00-00 00:00:00'),
(964, 1581, 1, 'Viborg Gymnasium og HF', 'Skaldehøjvej 12', '8800', 'Viborg', 'Viborg', 'Syddanmark', '2.g.', 'Bioteknologi', 'Astrid Siegumfeldt', '25115155', 'as@vghf.dk', 27, 1, 0, 0, '2015-09-08 00:00:00', '2015-04-07 00:00:00', '0000-00-00 00:00:00'),
(965, 1582, 1, 'Høje-Taastrup Gymnasium', 'Frøgård Allé 2', '2630', 'Taastrup', 'Høje-Taastrup', 'Hovedstaden', '2.g.', 'Biologi', 'Thomas Warner', '51359953', 'tw@htgym.dk', 12, 1, 0, 0, '2015-09-09 00:00:00', '2015-04-15 00:00:00', '0000-00-00 00:00:00'),
(966, 1582, 1, 'Høje-Taastrup Gymnasium', 'Frøgård Allé 2', '2630', 'Taastrup', 'Høje-Taastrup', 'Sjælland', '2.g.', 'Biologi', 'Gudrun Beyer Poulsen', '51359953', 'tw@htgym.dk', 12, 1, 0, 0, '2015-09-09 00:00:00', '2015-04-15 00:00:00', '0000-00-00 00:00:00'),
(967, 1583, 1, 'Allerød Gymnasium', 'Rådhusvej 6', '3450', 'Allerød', 'Allerød', 'Hovedstaden', '2.g.', 'Biologi', 'Vagn Rasmussen', '21206073', 'vra@mail.dk', 17, 1, 0, 0, '2015-09-10 00:00:00', '2015-04-29 00:00:00', '0000-00-00 00:00:00'),
(968, 1584, 1, 'Tårnby Gymnasium & HF', 'Tejn alle 5', '2770', 'Kastrup', 'Tårnby', 'Syddanmark', '3.g.', 'Bioteknologi', 'Ingelise Drozd Lund', '20438015', 'il@tgy.dk', 15, 1, 0, 0, '2015-09-11 00:00:00', '2015-05-22 00:00:00', '0000-00-00 00:00:00'),
(969, 1584, 1, 'Tårnby Gymnasium & HF', 'Tejn alle 5', '2770', 'Kastrup', 'Tårnby', 'Midtjylland', '3.g.', 'Bioteknologi', 'Ingelise Drozd Lund', '20438015', 'il@tgy.dk', 0, 0, 0, 0, '2015-09-11 00:00:00', '2015-05-22 00:00:00', '0000-00-00 00:00:00'),
(970, 1585, 1, 'Gladsaxe Gymnasium', 'Buddinge Hovedgade 81', '2860', 'Gladsaxe', 'Gladsaxe', 'Sjælland', '2.g.', 'Biologi', 'Tobias Frykman', '51222671', 'tobiasfrykman@gmail.com', 26, 1, 0, 0, '2015-09-16 00:00:00', '2015-05-30 00:00:00', '0000-00-00 00:00:00'),
(971, 1586, 1, 'Borupgaard Gymnasium', 'Lautruphøj 9', '2750', 'Ballerup', 'Ballerup', 'Sjælland', '3.g.', 'Bioteknologi', 'Jens Bøgeskov', '29893667', 'jb@boag.nu', 13, 2, 0, 0, '2015-09-17 00:00:00', '2015-04-06 00:00:00', '0000-00-00 00:00:00'),
(972, 1587, 1, 'FYNs HF-kursus', 'Hunderupvej 17', '5000', 'Odense', 'Odense', 'Sjælland', '2.g.', 'Biologi', 'Morten Jerris', '61716734', 'mrj@vucfyn.dk', 13, 1, 0, 0, '2015-09-18 00:00:00', '2015-04-29 00:00:00', '0000-00-00 00:00:00'),
(973, 1588, 1, 'Nykøbing Katedralskole', 'Poul Martin Møllersvej 3', '4840', 'Nykøbing', 'Guldborgsund', 'Hovedstaden', '3.g.', 'Biologi', 'Grete Christiansen', '29648288', 'gc@nykgym.dk', 26, 2, 0, 0, '2015-09-22 00:00:00', '2015-06-10 00:00:00', '0000-00-00 00:00:00'),
(974, 1589, -1, 'Næstved Gymnasium', 'Nygårdsvej 43', '4700', 'næstved', 'Næstved', 'Hovedstaden', '3.g.', 'Biologi', 'Thomas Bang', '28891969', 'tb@ngh.nu', 25, 1, 0, 0, '2015-09-23 00:00:00', '2015-05-13 00:00:00', '0000-00-00 00:00:00'),
(975, 1590, 1, 'Hasseris Gymnasium', 'Hasserisvej 300', '9000', 'Aalborg', 'Aalborg', 'Hovedstaden', '3.g.', 'Biologi', 'Tore Rubak', '61277766', 'tr@hasseris-gym.dk', 17, 1, 0, 0, '2015-09-24 00:00:00', '2015-02-24 00:00:00', '0000-00-00 00:00:00'),
(976, 1591, -1, 'Slagelse Gymnasium', 'Willemoesvej 2a', '4200', 'Slagelse', 'Slagelse', 'Hovedstaden', '3.g.', 'Biologi', 'Trine Nielsen', '28970393', 'te@slagelse-gym.dk', 26, 1, 0, 0, '2015-09-25 00:00:00', '2015-08-04 00:00:00', '0000-00-00 00:00:00'),
(977, 1592, 1, 'Gladsaxe Gymnasium', 'Buddinge Hovedgade 81', '2860', 'Søborg', 'Gladsaxe', 'Hovedstaden', '3.g.', 'Biologi', 'Tobias Frykman', '51222671', 'tobiasfrykman@gmail.com', 19, 1, 0, 0, '2015-09-25 00:00:00', '2015-08-19 00:00:00', '0000-00-00 00:00:00'),
(978, 1593, 1, 'Allerød Gymnasium', 'Rådhusvej 6', '3450', 'Allerød', 'Allerød', 'Hovedstaden', '2.g.', 'Bioteknologi', 'Louise Lund Bækgaard', '26152562', 'louise.lund.baekaard@gmail.com', 20, 1, 0, 0, '2015-09-29 00:00:00', '2015-08-12 00:00:00', '0000-00-00 00:00:00'),
(979, 1593, 1, 'Allerød Gymnasium', 'Rådhusvej 6', '3450', 'Allerød', 'Allerød', 'Hovedstaden', '2.g.', 'Bioteknologi', 'Louise Lund Bækgaard', '26152562', 'louise.lund.baekaard@gmail.com', 0, 0, 0, 0, '2015-09-29 00:00:00', '2015-08-12 00:00:00', '0000-00-00 00:00:00'),
(980, 1594, 1, 'Høje-Taastrup Gymnasium', 'Frøgaard alle 2', '2630', 'Taastrup', 'Høje-Taastrup', 'Hovedstaden', '2.g.', 'Biologi', 'Sofie Brix', '53344411', 'Sofieab@gmail.com', 15, 2, 0, 0, '2015-09-30 00:00:00', '2015-06-28 00:00:00', '0000-00-00 00:00:00'),
(981, 1595, 1, 'Frederiksborg Gymnasium og HF', 'Carlsbergvej 15', '3400', 'Hillerød', 'Hillerød', 'Hovedstaden', '2.g.', 'Bioteknologi', 'Torsten Ingerslev', '30741421', 'torsten.ingerslev@gmail.com', 20, 1, 0, 0, '2015-10-01 00:00:00', '2015-04-20 00:00:00', '0000-00-00 00:00:00'),
(982, 1596, 1, 'Københavns VUC', 'Vognmagergade 8', '1120', 'KBH', 'København', 'Hovedstaden', '2.g.', 'Biologi', 'Bent Nielsen', '82326600', 'bn@kvuc.dk', 23, 1, 0, 0, '2015-10-02 00:00:00', '2015-04-23 00:00:00', '0000-00-00 00:00:00'),
(983, 1596, 1, 'Københavns VUC', 'Vognmagergade 8', '1120', 'KBH', 'København', 'Midtjylland', '2.g.', 'Biologi', 'Bent Nielsen', '82326600', 'bn@kvuc.dk', 0, 0, 0, 0, '2015-10-02 00:00:00', '2015-04-23 00:00:00', '0000-00-00 00:00:00'),
(984, 1597, 1, 'Skanderborg Gymnasium', 'Højvangens Torv 6', '8660', 'Skanderborg', 'Skanderborg', 'Hovedstaden', '3.g.', 'Bioteknologi', 'Mikala Winther Voldby', '30276193', 'vv@skanderborg-gym.dk', 20, 2, 0, 0, '2015-10-06 00:00:00', '2015-06-25 00:00:00', '0000-00-00 00:00:00'),
(985, 1598, 1, 'Køge Gymnasium', 'Gymnasievej 4', '4600', 'Køge', 'Køge', 'Hovedstaden', '2.g.', 'Biologi', 'Marie Eiland', '27284531', 'kgme@kggym.dk', 20, 2, 0, 0, '2015-10-07 00:00:00', '2015-06-30 00:00:00', '0000-00-00 00:00:00'),
(986, 1599, 1, 'Falkonergårdens Gymnasium og HF-Kursus', 'Sønderjyllands Alle 25', '2000', 'Frederiksberg', 'Frederiksberg', 'Syddanmark', '2.g.', 'Biologi', 'Signe Markman og Morten Skaarup', '26783639', 'signemarkman@gmail.com', 29, 2, 0, 0, '2015-10-08 00:00:00', '2015-08-26 00:00:00', '0000-00-00 00:00:00'),
(987, 1600, 1, 'Egedal Gymnasium & HF', 'Gymnasievej 1', '3660', 'Stenløse', 'Egedal', 'Sjælland', '2.g.', 'Biologi', 'Rikke Anker Jensen', '29914554', 'rj@egedal-gym.dk', 30, 2, 0, 0, '2015-10-23 00:00:00', '2015-04-08 00:00:00', '0000-00-00 00:00:00'),
(988, 1600, 1, 'Egedal Gymnasium & HF', 'Gymnasievej 1', '3660', 'Stenløse', 'Egedal', 'Nordjylland', '2.g.', 'Biologi', 'Rikke Anker Jensen', '29914554', 'rj@egedal-gym.dk', 0, 0, 0, 0, '2015-10-23 00:00:00', '2015-04-08 00:00:00', '0000-00-00 00:00:00'),
(989, 1601, -1, 'Høje-Taastrup Gymnasium', 'Frøgård alle 2', '2630', 'Taastrup', 'Høje-Taastrup', 'Hovedstaden', '2.g.', 'Biologi', 'Anders Jensen', '28251979', 'anders@rapanden.dk', 26, 1, 0, 0, '2015-10-27 00:00:00', '2015-08-17 00:00:00', '0000-00-00 00:00:00'),
(990, 1602, 0, 'Rosborg Gymnasium & HF', 'Vestre Engvej 61', '7100', 'Vejle', 'Vejle', 'Hovedstaden', '3.g.', 'Biologi', 'Lone Kjærby Rasmussen', '27771452', 'lr@rosborg-gym.dk', 17, 1, 0, 0, '2015-10-29 00:00:00', '2015-06-12 00:00:00', '0000-00-00 00:00:00'),
(991, 1603, -1, 'Rosborg Gymnasium & HF', 'Vestre Engvej 61', '7100', 'Vejle', 'Vejle', 'Hovedstaden', '3.g.', 'Biologi', 'Lone Kjærby Rasmussen', '27771452', 'lr@rosborg-gym.dk', 21, 1, 0, 0, '2015-10-30 00:00:00', '2015-09-06 00:00:00', '0000-00-00 00:00:00'),
(992, 1604, -1, 'Viby Gymnasium', 'Søndervangs alle 45', '8260', 'Viby', 'Aarhus', 'Hovedstaden', '3.g.', 'Bioteknologi', 'Katrine Pedersen', '25611514', 'kp@vibygym.dk', 15, 1, 0, 0, '2015-11-05 00:00:00', '2015-08-12 00:00:00', '0000-00-00 00:00:00'),
(993, 1605, 1, 'ZBC HTX Vordingborg', 'Chr. Richardtsvej 43', '4760', 'Vordingborg', 'Vordingborg', 'Sjælland', '3.g.', 'Bioteknologi', 'Eman Soubani og Stefan Vemmer Kronhoff', '42446360, 55788888', 'esou@zbc.dk', 12, 2, 0, 0, '2015-11-05 00:00:00', '2015-10-20 00:00:00', '0000-00-00 00:00:00'),
(994, 1606, -1, 'Viby Gymnasium', 'Søndervangs alle 45', '8260', 'Viby', 'Aarhus', 'Hovedstaden', '3.g.', 'Bioteknologi', 'Katrine Pedersen', '25611514', 'Kp@vibygym.dk', 15, 1, 0, 0, '2015-11-06 00:00:00', '2015-08-10 00:00:00', '0000-00-00 00:00:00'),
(995, 1607, 1, 'Borupgaard Gymnasium', 'Lautruphøj 9', '2750', 'Ballerup', 'Ballerup', 'Hovedstaden', '3.g.', 'Biologi', 'Ditte Zimmermann', '91250681', 'db@boag.nu', 13, 1, 0, 0, '2015-11-06 00:00:00', '2015-10-07 00:00:00', '0000-00-00 00:00:00'),
(996, 1608, 1, 'Espergærde Gymnasium og HF', 'Gymnasievej 2', '3060', 'Espergærde', 'Helsingør', 'Hovedstaden', '3.g.', 'Biologi', 'Rikke Louise Rentsch', '21929989', 'RI@eg-gym.dk', 30, 1, 0, 0, '2015-11-10 00:00:00', '2015-08-27 00:00:00', '0000-00-00 00:00:00'),
(997, 1608, 1, 'Espergærde Gymnasium og HF', 'Gymnasievej 2', '3060', 'Espergærde', 'Helsingør', 'Hovedstaden', '3.g.', 'Biologi', 'Rikke Louise Rentsch', '21929989', 'RI@eg-gym.dk', 0, 0, 0, 0, '2015-11-10 00:00:00', '2015-08-27 00:00:00', '0000-00-00 00:00:00'),
(998, 1609, 1, 'Christianshavns Gymnasium', 'Princessegade 35', '1422', 'KBH', 'København', 'Hovedstaden', '2.g.', 'Bioteknologi', 'Jette Feld', '29800128', 'jf@cg-gym.dk', 0, 0, 0, 0, '2015-11-11 00:00:00', '2015-05-27 00:00:00', '0000-00-00 00:00:00'),
(999, 1609, 1, 'Christianshavns Gymnasium', 'Princessegade 35', '1422', 'KBH', 'København', 'Hovedstaden', '2.g.', 'Bioteknologi', 'Jette Feld', '29800128', 'jf@cg-gym.dk', 14, 1, 0, 0, '2015-11-11 00:00:00', '2015-05-27 00:00:00', '0000-00-00 00:00:00'),
(1000, 1610, 1, 'Vordingborg Gymnasium & HF', 'Chr. Richardtsvej 45', '4760', 'Vordingborg', 'Vordingborg', 'Hovedstaden', '3.g.', 'Biologi', 'Jeppe Mordhorst', '40685274', 'jm@vordingborg-gym.dk', 24, 1, 0, 0, '2015-11-12 00:00:00', '2015-09-03 00:00:00', '0000-00-00 00:00:00'),
(1001, 1611, -1, 'Frederiksberg Gymnasium', 'Falkoner Plads 2', '2000', 'Frederiksberg', 'Frederiksberg', 'Hovedstaden', '3.g.', 'Biologi', 'Peter Toft', '30258217', 'pt@frederiksberggymnasium.dk', 20, 1, 0, 0, '2015-11-13 00:00:00', '2015-08-19 00:00:00', '0000-00-00 00:00:00'),
(1002, 1612, 1, 'Viby Gymnasium', 'Søndervangs alle 45', '8260', 'Viby', 'Aarhus', 'Hovedstaden', '3.g.', 'Bioteknologi', 'Katrine Pedersen', '25611514', 'kp@vibygym.dk', 15, 1, 0, 0, '2015-11-17 00:00:00', '2015-09-02 00:00:00', '0000-00-00 00:00:00'),
(1003, 1613, 1, 'SRP-elever, Borupgaard Gym', 'Gothersgade 130', '1350', 'København', 'København', 'Sjælland', '3.g.', 'Biologi/Biotek', 'Andreas Kelager og Marie Lillemark', '20616020', 'akelager@snm.ku.dk; marie.lillemark@snm.ku.dk', 1, 0, 0, 0, '2015-11-18 00:00:00', '2015-10-20 00:00:00', '0000-00-00 00:00:00'),
(1004, 1613, 1, 'SRP-elever, Frederiksværk Gym', 'Gothersgade 130', '1350', 'København', 'København', 'Hovedstaden', '3.g.', 'Biologi/Biotek', 'Andreas Kelager og Marie Lillemark', '20616020', 'akelager@snm.ku.dk; marie.lillemark@snm.ku.dk', 1, 0, 0, 0, '2015-11-18 00:00:00', '2015-10-20 00:00:00', '0000-00-00 00:00:00'),
(1005, 1613, 1, 'SRP-elever, Frederiksværk Gym', 'Gothersgade 130', '1350', 'København', 'København', 'Hovedstaden', '3.g.', 'Biologi/Biotek', 'Andreas Kelager og Marie Lillemark', '20616020', 'akelager@snm.ku.dk; marie.lillemark@snm.ku.dk', 1, 0, 0, 0, '2015-11-18 00:00:00', '2015-10-20 00:00:00', '0000-00-00 00:00:00'),
(1006, 1613, 1, 'SRP-elever, Rødovre Gym', 'Gothersgade 130', '1350', 'København', 'København', 'Hovedstaden', '3.g.', 'Biologi/Biotek', 'Andreas Kelager og Marie Lillemark', '20616020', 'akelager@snm.ku.dk; marie.lillemark@snm.ku.dk', 1, 0, 0, 0, '2015-11-18 00:00:00', '2015-10-20 00:00:00', '0000-00-00 00:00:00'),
(1007, 1614, 1, 'Birkerød Gymnasium - HF - IB & Kostskole', 'Søndervangen 56', '3460', 'Birkerød', 'Rudersdal', 'Sjælland', '3.g.', 'Biologi', 'Christina Høier Ricke & Jette Eibye-Jacobsen', '61696739', 'ei@birke-gym.dk', 16, 2, 0, 0, '2015-11-19 00:00:00', '2015-08-11 00:00:00', '0000-00-00 00:00:00'),
(1008, 1615, 1, 'Aurehøj Gymnasium', 'Skolevej 7', '2820', 'Gentofte', 'Gentofte', 'Hovedstaden', '2.g.', 'Biologi', 'Anne Winther Jørgensen', '', 'aj@aurehoej.dk', 9, 1, 0, 0, '2015-11-20 00:00:00', '2015-05-16 00:00:00', '0000-00-00 00:00:00'),
(1009, 1615, 1, 'Rungsted Gymnasium', 'Stadion Allé 14', '2960', 'Rungsted', 'Hørsholm', 'Sjælland', '3.g.', 'Biologi', 'Knud Johnsen', '81503755', 'jo@rungsted-gym.dk', 15, 1, 0, 0, '2015-11-20 00:00:00', '2015-05-16 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `booking_klasse` (`klasse_id`, `booking_id`, `status`, `institutionsnavn`, `adresse`, `postnr`, `by`, `kommune`, `region`, `klassetrin`, `fag`, `laererNavn`, `laererTlf`, `laererEmail`, `antalElever`, `antalLaerer`, `KuvertProeverAfsendt`, `Proevermodtaget`, `DatoForBesoeg`, `DatoForBooking`, `DatoForEkst`) VALUES
(1010, 1616, 1, 'Københavns Tekniske Skole, HTX Vibenhus', 'Jagtvej 163', '2100', 'København', 'København', 'Hovedstaden', '2.g.', 'Biologi', 'Hanne Juhl (hju)', '21424674', 'hju@kts.dk', 23, 2, 0, 0, '2015-11-24 00:00:00', '2015-08-13 00:00:00', '0000-00-00 00:00:00'),
(1011, 1617, 1, 'Ørestad Gymnasium', 'Ørestad Boulevard 75', '2300', 'København', 'København', 'Sjælland', '2.g.', 'Bioteknologi', 'Sofie Bruhns', '29861030', 'srb@oegnet.dk', 18, 1, 0, 0, '2015-11-25 00:00:00', '2015-11-04 00:00:00', '0000-00-00 00:00:00'),
(1012, 1618, 1, 'Ordrup Gymnasium', 'Kirkevej 5', '2920', 'Gentofte', 'Gentofte', 'Syddanmark', '3.g.', 'Biologi', 'Karin Frykman', '22253576', 'karinfrykman@gmail.com', 18, 1, 0, 0, '2015-12-02 00:00:00', '2015-06-14 00:00:00', '0000-00-00 00:00:00'),
(1013, 1619, 1, 'Gladsaxe Gymnasium', 'Buddinge Hovedgade 81', '2860', 'Søborg', 'Gladsaxe', 'Hovedstaden', '2.g.', 'Biologi', 'Kenn Madsen', '40941331', 'ksmadsen@msn.com', 27, 1, 0, 0, '2015-12-09 00:00:00', '2015-09-28 00:00:00', '0000-00-00 00:00:00'),
(1014, 1620, -1, 'Espergærde Gymnasium og HF', 'Gymnasievej 2', '3060', 'Espergærde', 'Helsingør', 'Sjælland', '2.g.', 'Biologi', 'Katrine Skjøth', '40786427', 'katrineskjoeth@yahoo.dk', 28, 1, 0, 0, '2015-12-10 00:00:00', '2014-11-03 00:00:00', '0000-00-00 00:00:00'),
(1015, 1621, 1, 'Nærum Gymnasium', 'Nærum Hovedgade 30', '2850', 'Nærum', 'Rudersdal', 'Sjælland', '1.g.', 'Bioteknologi', 'Helle Jarden', '40783646', 'hj@nagym.dk', 29, 1, 0, 0, '2015-12-11 00:00:00', '2015-08-31 00:00:00', '0000-00-00 00:00:00'),
(1016, 1622, 1, 'Grindsted Gymnasium & HF', 'Tinghusgade 20', '7200', 'Grindsted', 'Billund', 'Hovedstaden', '3.g.', 'Bioteknologi', 'Anja Lykke Hundebøll Nielsen', '22819393', 'ah@ggnet.dk', 15, 1, 0, 0, '2015-12-16 00:00:00', '2015-02-03 00:00:00', '0000-00-00 00:00:00'),
(1017, 1623, 1, 'Helsingør Gymnasium', 'Borgmester P. Christensensvej 3', '3000', 'Helsingør', 'Helsingør', 'Sjælland', '2.g.', 'Bioteknologi', 'Thea Feld Nielsen og Stine Weber', '26498331', 'tf@hels-gym.dk', 28, 2, 0, 0, '2015-12-17 00:00:00', '2015-04-21 00:00:00', '0000-00-00 00:00:00'),
(1018, 1624, -1, 'Gladsaxe Gymnasium', 'Søborg hovedgade 81', '2860', 'Søborg', 'Gladsaxe', 'Sjælland', '3.g.', 'Biologi', 'Allan Gylling Olsen', '31500392', 'ao@gladgym.dk', 15, 1, 0, 0, '2016-01-06 00:00:00', '2015-10-24 00:00:00', '0000-00-00 00:00:00'),
(1019, 1625, 1, 'Espergærde Gymnasium og HF', 'Gymnasievej 2', '3060', 'Espergærde', 'Helsingør', 'Sjælland', '3.g.', 'Bioteknologi', 'Niels Kristian Holm', '60731927', 'nk@eg-gym.dk', 24, 1, 0, 0, '2016-01-07 00:00:00', '2015-11-17 00:00:00', '0000-00-00 00:00:00'),
(1020, 1626, 1, 'Egedal Gymnasium & HF', 'Gymnasievej 2', '3660', 'Stenløse', 'Egedal', 'Sjælland', '3.g.', 'Biologi', 'Malene Sloth-Brodersen', '27304769', 'malene@sloth-brodersen.dk', 21, 1, 0, 0, '2016-01-08 00:00:00', '2015-10-21 00:00:00', '0000-00-00 00:00:00'),
(1021, 1627, 1, 'VUC Roskilde', 'Læderstræde 4', '4000', 'Roskilde', 'Roskilde', 'Hovedstaden', '2.g.', 'Biologi', 'Sarah Kassem Kaltoft', '53575904', 'rka@vucroskilde.dk', 19, 1, 0, 0, '2016-01-12 00:00:00', '2015-11-30 00:00:00', '0000-00-00 00:00:00'),
(1022, 1628, 1, 'Roskilde Gymnasium', 'Domkirkepladsen 1', '4000', 'Roskilde', 'Roskilde', 'Syddanmark', '2.g.', 'Biologi', 'Karina Lærekdal Sørensen', '29909774', 'rgks@roskilde-gym.dk', 25, 1, 0, 0, '2016-01-15 00:00:00', '2015-12-07 00:00:00', '0000-00-00 00:00:00'),
(1023, 1629, 1, 'VUC Frederiksberg', 'Falstersvej 3-5', '2000', 'Frederiksberg', 'Frederiksberg', 'Sjælland', '3.g.', 'Biologi', 'Thorsten Dyrby Nielsen', '61995921', 'tdn@vuf.nu', 24, 1, 0, 0, '2016-01-19 00:00:00', '2015-11-24 00:00:00', '0000-00-00 00:00:00'),
(1024, 1630, 1, 'Høje-Taastrup Gymnasium', 'Frøgaard alle 2', '2630', 'Taastrup', 'Høje-Taastrup', 'Sjælland', '2.g.', 'Biologi', 'Christina Bramow & Søren Vienberg', '60682179', 'cb@htgym.dk; Soeren_vienberg@yahoo.com', 30, 2, 0, 0, '2016-01-20 00:00:00', '2015-04-24 00:00:00', '0000-00-00 00:00:00'),
(1025, 1631, -1, 'Roskilde Gymnasium', 'Domkirkepladsen 1', '4000', 'Roskilde', 'Roskilde', 'Hovedstaden', '2.g.', 'Biologi', 'Karina Lærekdal Sørensen', '29909774', 'rgks@roskilde-gym.dk', 28, 1, 0, 0, '2016-01-21 00:00:00', '2015-08-21 00:00:00', '0000-00-00 00:00:00'),
(1026, 1631, -1, 'Roskilde Gymnasium', 'Domkirkepladsen 1', '4000', 'Roskilde', 'Roskilde', 'Hovedstaden', '2.g.', 'Biologi', 'Karina Lærekdal Sørensen', '29909774', 'rgks@roskilde-gym.dk', 0, 0, 0, 0, '2016-01-21 00:00:00', '2015-08-21 00:00:00', '0000-00-00 00:00:00'),
(1027, 1632, 1, 'Nørresundby Gymnasium & HF', 'Studievej 14', '9400', 'Nørresundby', 'Aalborg', 'Sjælland', '3.g.', 'Bioteknologi', 'Dorte Schartau Rasmussen', '21765353', 'dra@nghf.dk', 15, 2, 0, 0, '2016-01-21 00:00:00', '2015-05-19 00:00:00', '0000-00-00 00:00:00'),
(1028, 1633, 1, 'Nørresundby Gymnasium & HF', 'Studievej 14', '9400', 'Nørresundby', 'Aalborg', 'Hovedstaden', '3.g.', 'Bioteknologi', 'Dorte Schartau Rasmussen', '21765353', 'dra@nghf.dk', 15, 2, 0, 0, '2016-01-21 00:00:00', '2015-05-19 00:00:00', '0000-00-00 00:00:00'),
(1029, 1632, -1, 'Nørresundby Gymnasium & HF', 'Studievej 14', '9400', 'Nørresundby', 'Aalborg', 'Hovedstaden', '3.g.', 'Bioteknologi', 'Dorte Schartau Rasmussen', '21765353', 'dra@nghf.dk', 15, 2, 0, 0, '2016-01-22 00:00:00', '2015-05-19 00:00:00', '0000-00-00 00:00:00'),
(1030, 1634, 1, 'VUC Frederiksberg', 'Falstersvej 3-5', '2000', 'Frederiksberg', 'Frederiksberg', '', '2.g.', 'Biologi', 'Tina Flensburg', '22167935', 'tif@vuf.nu', 17, 1, 0, 0, '2016-01-26 00:00:00', '2016-01-05 00:00:00', '0000-00-00 00:00:00'),
(1031, 1635, 1, 'Køge Gymnasium', 'Gymnasievej 4', '4600', 'Køge', 'Køge', 'Midtjylland', '1.g.', 'Bioteknologi', 'Christian Becher Clausen', '61702107', 'kgcc@kggym.dk', 31, 2, 0, 0, '2016-01-27 00:00:00', '2015-08-17 00:00:00', '0000-00-00 00:00:00'),
(1032, 1636, 1, 'Køge Gymnasium', 'Gymnasievej 4', '4600', 'Køge', 'Køge', 'Hovedstaden', '1.g.', 'Biologi', 'Kristian Poulsen', '40348616', 'kgkp@kggym.dk', 26, 1, 0, 0, '2016-01-28 00:00:00', '2015-08-17 00:00:00', '0000-00-00 00:00:00'),
(1033, 1637, 1, 'Gentofte HF', 'Dahlensstræde 5', '2820', 'Gentofte', 'Gentofte', 'Sjælland', '2.g.', 'Biologi', 'Jens Gerup Nielsen', '21167761', 'jens.liane@mail.dk', 27, 1, 0, 0, '2016-01-29 00:00:00', '2015-06-16 00:00:00', '0000-00-00 00:00:00'),
(1034, 1638, 1, 'Falkonergårdens Gymnasium og HF-Kursus', 'Sønderjyllands Alle 25', '2000', 'Frederiksberg', 'Frederiksberg', 'Hovedstaden', '3.g.', 'Biologi', 'Torben Roldsgaard', '23707840', 'torbenroldsgaard@hotmail.com', 20, 1, 0, 0, '2016-02-02 00:00:00', '2015-11-27 00:00:00', '0000-00-00 00:00:00'),
(1035, 1639, 1, 'Frederiksberg Gymnasium', 'Falkoner Plads 2', '2000', 'Frederiksberg', 'Frederiksberg', 'Syddanmark', '2.g.', 'Biologi', 'Jens Vilsom Andersen', '27626080', 'jv@frederiksberggymnasium.dk', 22, 1, 0, 0, '2016-02-03 00:00:00', '2015-11-17 00:00:00', '0000-00-00 00:00:00'),
(1036, 1640, 1, 'Silkeborg Gymnasium', 'Oslovej 10', '8600', 'Silkeborg', 'Silkeborg', 'Hovedstaden', '3.g.', 'Bioteknologi', 'Maiken Larsen', '25135959', 'kl@sg.dk', 28, 2, 0, 0, '2016-02-04 00:00:00', '2015-12-07 00:00:00', '0000-00-00 00:00:00'),
(1037, 1641, 1, 'Gentofte HF', 'Dahlensstræde 5', '2820', 'Gentofte', 'Gentofte', 'Hovedstaden', '1.g.', 'Biologi', 'Helle Munk Jensen', '21167586', 'hellemunk@gmail.com', 26, 2, 0, 0, '2016-02-05 00:00:00', '2015-08-17 00:00:00', '0000-00-00 00:00:00'),
(1038, 1642, 1, 'Virum Gymnasium', 'Fuglsangvej 66', '2830', 'Virum', 'Lyngby-Taarbæk', 'Sjælland', '3.g.', 'Bioteknologi', 'Dorte Kühnau', '29413443', 'dk@edu.virum-gym.dk', 27, 1, 0, 0, '2016-02-09 00:00:00', '2015-11-19 00:00:00', '0000-00-00 00:00:00'),
(1039, 1643, 1, 'Munkensdam Gymnasium', 'Tøndervej 100', '6000', 'Kolding', 'Kolding', 'Sjælland', '3.g.', 'Biologi', 'Merete Greniman', '51208884', 'mg@munkensdam.dk', 24, 2, 0, 0, '2016-02-10 00:00:00', '2015-08-11 00:00:00', '0000-00-00 00:00:00'),
(1040, 1644, 1, 'VUC Roskilde', 'Læderstræde 4', '4000', 'Roskilde', 'Roskilde', 'Hovedstaden', '2.g.', 'Biologi', 'Jesper B. Petersen', '30483062', 'rjp@vucroskilde.dk', 25, 1, 0, 0, '2016-02-11 00:00:00', '2015-08-07 00:00:00', '0000-00-00 00:00:00'),
(1041, 1645, 1, 'Gladsaxe Gymnasium', 'Buddinge Hovedgade 81', '2860', 'Søborg', 'Gladsaxe', 'Sjælland', '3.g.', 'Biologi', 'Kenn Madsen', '40941331', 'ksmadsen@msn.com', 26, 1, 0, 0, '2016-02-23 00:00:00', '2016-01-05 00:00:00', '0000-00-00 00:00:00'),
(1042, 1646, 1, 'Frederiksberg Gymnasium', 'Falkoner Plads 2', '2000', 'Frederiksberg', 'Frederiksberg', 'Hovedstaden', '3.g.', 'Biologi', 'Peter Toft', '30258217', 'pt@frederiksberggymnasium.dk', 20, 1, 0, 0, '2016-02-24 00:00:00', '2015-10-13 00:00:00', '0000-00-00 00:00:00'),
(1043, 1647, 1, 'Kruses Gymnasium', 'Stavnsholtvej 29-31', '3520', 'Farum', 'Furesø', 'Hovedstaden', '3.g.', 'Bioteknologi', 'John B. Nielsen', '31191122', 'jbn1@mks.dk', 27, 1, 0, 0, '2016-02-25 00:00:00', '2015-11-17 00:00:00', '0000-00-00 00:00:00'),
(1044, 1648, 1, 'Øregård Gymnasium', 'Gersonsvej 32', '2900', 'Hellerup', 'Gentofte', 'Sjælland', '3.g.', 'Biologi', 'Vibeke Tromholt', '30383038', 'vt@oregard.dk', 26, 1, 0, 0, '2016-02-26 00:00:00', '2015-09-08 00:00:00', '0000-00-00 00:00:00'),
(1045, 1649, -1, 'Nørresundby Gymnasium & HF', 'Studievej 14', '9400', 'Nørresundby', 'Aalborg', 'Midtjylland', '3.g.', 'Bioteknologi', 'Dorte Schartau Rasmussen', '21765353', 'dra@nghf.dk', 15, 2, 0, 0, '2016-02-28 00:00:00', '2015-05-19 00:00:00', '0000-00-00 00:00:00'),
(1046, 1650, 1, 'Det frie Gymnasium', 'Møllegade 26', '2200', 'København', 'København', 'Hovedstaden', '1.g.', 'Biologi', 'Kazem Neisari', '51367695', 'kn@detfri.dk', 28, 1, 0, 0, '2016-03-02 00:00:00', '2015-11-17 00:00:00', '0000-00-00 00:00:00'),
(1047, 1651, 1, 'Gladsaxe Gymnasium', 'Buddinge hovedgade 81', '2860', 'Søborg', 'Gladsaxe', 'Hovedstaden', '2.g.', 'Biologi', 'Tobias Frykman (forløbet er oprindelig booket af M', '23304980', 'tobiasfrykman@gmail.com', 18, 1, 0, 0, '2016-03-03 00:00:00', '2015-11-20 00:00:00', '0000-00-00 00:00:00'),
(1048, 1652, 1, 'Virum Gymnasium', 'Fuglsangvej 66', '2830', 'Virum', 'Lyngby-Taarbæk', 'Sjælland', '2.g.', 'Biologi', 'Annegrete Rømer', '51898486', 'annegrete_r@yahoo.dk', 21, 2, 0, 0, '2016-03-04 00:00:00', '2015-11-19 00:00:00', '0000-00-00 00:00:00'),
(1049, 1653, 1, 'Øregård Gymnasium', 'Gersonsvej 32', '2900', 'Hellerup', 'Gentofte', 'Hovedstaden', '3.g.', 'Biologi', 'Morten Bøyesen', '30383214', 'mb@oregard.dk', 27, 1, 0, 0, '2016-03-08 00:00:00', '2015-11-17 00:00:00', '0000-00-00 00:00:00'),
(1050, 1654, -1, 'Rysensteen Gymnasium', 'Tietgensgade 74', '1704', 'København', 'København', 'Sjælland', '3.g.', 'Bioteknologi', 'Jan Andersen', '53743576', 'ja@rysensteen.dk', 28, 1, 0, 0, '2016-03-09 00:00:00', '2015-11-17 00:00:00', '0000-00-00 00:00:00'),
(1051, 1655, 1, 'Næstved Gymnasium og hf', 'Nygårdsvej 43', '4700', 'Næstved', 'Næstved', 'Hovedstaden', '3.g.', 'Bioteknologi', 'Kim Bidstrup Withen', '60767799', 'kb@ngh.nu', 10, 2, 0, 0, '2016-03-09 00:00:00', '2015-12-23 00:00:00', '0000-00-00 00:00:00'),
(1052, 1655, 1, 'Silkeborg Gymnasium', 'Oslovej 10', '8600', 'Silkeborg', 'Silkeborg', 'Sjælland', '3.g.', 'Bioteknologi', 'Kim Bidstrup Withen', '60767799', 'kb@ngh.nu', 10, 2, 0, 0, '2016-03-09 00:00:00', '2015-12-23 00:00:00', '0000-00-00 00:00:00'),
(1053, 1655, 1, 'Svendborg Gymnasium & HF', 'AP Møllersvej 35', '5700', 'Svendborg', 'Svendborg', 'Hovedstaden', '3.g.', 'Bioteknologi', 'Kim Bidstrup Withen', '60767799', 'kb@ngh.nu', 10, 2, 0, 0, '2016-03-09 00:00:00', '2015-12-23 00:00:00', '0000-00-00 00:00:00'),
(1054, 1656, 1, 'Næstved Gymnasium og HF', 'Nygårdsvej 43', '4700', 'Næstved', 'Næstved', 'Hovedstaden', '3.g.', 'Biologi', 'Tina Christensen', '27483926', 'tc@ngh.nu', 27, 1, 0, 0, '2016-03-10 00:00:00', '2015-11-17 00:00:00', '0000-00-00 00:00:00'),
(1055, 1657, 1, 'Espergærde Gymnasium og HF', 'Gymnasievej 2', '3060', 'Espergærde', 'Helsingør', '', '1.g.', 'Bioteknologi', 'Thor Højen Wind', '60604723', 'tw@eg-gym.dk', 28, 2, 0, 0, '2016-03-11 00:00:00', '2016-01-12 00:00:00', '0000-00-00 00:00:00'),
(1056, 1658, -1, 'Gammel Hellerup Gymnasium', 'Svanemøllevej 87', '2900', 'Hellerup', 'Gentofte', 'Hovedstaden', '1.g.', 'Bioteknologi', 'Bo Kildeager', '29117481', 'bk@ghg.dk', 28, 1, 0, 0, '2016-03-15 00:00:00', '2015-10-26 00:00:00', '0000-00-00 00:00:00'),
(1057, 1659, 1, 'Gribskov Gymnasium', 'Østergade 52', '3200', 'Helsinge', 'Gribskov', '', '3.g.', 'Bioteknologi', 'Niels J. Willumsen', '26204431', 'njwillumsen@gmail.com', 30, 2, 0, 0, '2016-03-15 00:00:00', '2016-01-06 00:00:00', '0000-00-00 00:00:00'),
(1058, 1660, 1, 'Ribe Katedralskole.dk', 'Puggaaardsgade 22', '6760', 'Ribe', 'Esbjerg', 'Hovedstaden', '1.g.', 'Biologi', 'Hanne Skalborg Jensen', '23644884', 'hs@ribekatedralskole.dk', 25, 1, 0, 0, '2016-03-17 00:00:00', '2015-11-17 00:00:00', '0000-00-00 00:00:00'),
(1059, 1661, -1, 'Gribskov Gymnasium', 'Østergade 52', '3200', 'Helsinge', 'Gribskov', 'Hovedstaden', '3.g.', 'Biologi', 'Rudi Pedersen', '29850957', 'RP@gribskovgymnasium.dk', 17, 1, 0, 0, '2016-03-18 00:00:00', '2015-11-22 00:00:00', '0000-00-00 00:00:00'),
(1060, 1662, 1, 'HF og VUC Nordsjælland', 'Gurrevej 90', '3000', 'Helsingør', 'Helsingør', 'Sjælland', '2.g.', 'Biologi', 'Louise Adelhart', '60870803', 'loa@vucns.dk', 30, 1, 0, 0, '2016-03-18 00:00:00', '2016-01-05 00:00:00', '0000-00-00 00:00:00'),
(1061, 1663, 1, 'Gammel Hellerup Gymnasium', 'Svanemøllevej 87', '2900', 'Hellerup', 'Gentofte', 'Sjælland', '1.g.', 'Bioteknologi', 'Bo Kildeager', '29117481', 'bk@ghg.dk', 19, 1, 0, 0, '2016-03-29 00:00:00', '2016-01-03 00:00:00', '0000-00-00 00:00:00'),
(1062, 1664, 1, 'Stenhus Gymnasium og HF', 'Stenhusvej 20', '4300', 'Holbæk', 'Holbæk', 'Hovedstaden', '3.g.', 'Bioteknologi', 'Peter Jensen', '28959901', '911jensen@gmail.com', 15, 1, 0, 0, '2016-03-30 00:00:00', '2015-11-17 00:00:00', '0000-00-00 00:00:00'),
(1063, 1665, 1, 'Køge Private Realskole, Gymnasium', 'Ølby Center 50', '4600', 'Køge', 'Køge', 'Hovedstaden', '1.g.', 'Biologi', 'Marie Kvist Bondesen', '30283077', 'mariebondesen@gmail.com', 19, 1, 0, 0, '2016-03-31 00:00:00', '2015-12-28 00:00:00', '0000-00-00 00:00:00'),
(1064, 1666, 1, 'Køge Gymnasium', 'Gymnasievej 4', '4600', 'Køge', 'Køge', 'Hovedstaden', '2.g.', 'Biologi', 'Pia Myler', '30272272', 'kgpm@kggym.dk', 28, 1, 0, 0, '2016-04-01 00:00:00', '2015-11-19 00:00:00', '0000-00-00 00:00:00'),
(1065, 1667, 1, 'HTX Gastro Science', 'Vigerslev Allé 18', '2500', 'Valby', 'København', 'Hovedstaden', '1.g.', 'Bioteknologi', 'Ditte Elsborg', '60883120', 'del@hrs.dk', 15, 1, 0, 0, '2016-04-05 00:00:00', '2015-11-24 00:00:00', '0000-00-00 00:00:00'),
(1066, 1668, 1, 'Nordsjællands Grundskole og Gymnasium', 'Christianshusvej 16', '2970', 'Hørsholm', 'Hørsholm', 'Hovedstaden', '2.g.', 'Biologi', 'Marianne Johansson', '27514149', 'mjo@ngg.dk', 25, 2, 0, 0, '2016-04-06 00:00:00', '2015-11-17 00:00:00', '0000-00-00 00:00:00'),
(1067, 1669, 1, 'Allerød Gymnasium', 'Rådhusvej 6', '3450', 'Allerød', 'Fredensborg', 'Hovedstaden', '1.g.', 'Biologi', 'Malthe Lund og Marianne Maigaard', '26364844', 'malthelund@gmail.com', 29, 2, 0, 0, '2016-04-07 00:00:00', '2015-10-28 00:00:00', '0000-00-00 00:00:00'),
(1068, 1670, 1, 'Ingrid Jespersens Gymnasieskole', 'Nordre Frihavnsgade 9', '2100', 'København', 'København', 'Hovedstaden', '2.g.', 'Biologi', 'Christian Riisager-Pedersen', '20119987', 'riisager-pedersen@hotmail.com', 26, 1, 0, 0, '2016-04-08 00:00:00', '2015-11-12 00:00:00', '0000-00-00 00:00:00'),
(1069, 1671, 1, 'Thisted Gymnasium', 'Ringvej 32', '7700', 'Thisted', 'Thisted', 'Syddanmark', '2.g.', 'Biologi', 'Pia Lassen', '20627656', 'pl@thisted-gymnasium.dk', 24, 1, 0, 0, '2016-04-12 00:00:00', '2015-06-23 00:00:00', '0000-00-00 00:00:00'),
(1070, 1672, -1, 'Gribskov Gymnasium', 'Østergade 52', '3200', 'Helsinge', 'Gribskov', 'Midtjylland', '3.g.', 'Biologi', 'Morten Wermer', '24677788', 'mw@gribskovgymnasium.dk', 20, 1, 0, 0, '2016-04-14 00:00:00', '2015-08-14 00:00:00', '0000-00-00 00:00:00'),
(1071, 1673, -1, 'Solrød Gymnasium', 'Solrød Center 2', '2680', 'Solrød', 'Solrød', 'Hovedstaden', '2.g.', 'Biologi', 'Laura Dall Køhler', '31230190', 'sglk@solgym.dk', 30, 1, 0, 0, '2016-04-15 00:00:00', '2015-11-26 00:00:00', '0000-00-00 00:00:00'),
(1072, 1674, 1, 'Marselisborg Gymnasium', 'Birketinget 9', '8000', 'Aarhus', 'Aarhus', 'Syddanmark', '3.g.', 'Biologi', 'Torben Hviid', '29720358', 'th@marselisborg-gym.dk', 24, 2, 0, 0, '2016-04-19 00:00:00', '2015-08-15 00:00:00', '0000-00-00 00:00:00'),
(1073, 1675, 1, 'Rysensteen Gymnasium', 'Tietgensgade 74', '1704', 'København', 'København', 'Sjælland', '1.g.', 'Bioteknologi', 'Søren Søgaard', '53603891', 'ss@rysensteen.dk', 30, 1, 0, 0, '2016-04-20 00:00:00', '2015-06-17 00:00:00', '0000-00-00 00:00:00'),
(1074, 1676, 1, 'Espergærde Gymnasium og HF', 'Gymnasievej 2', '3060', 'Espergærde', 'Helsingør', 'Hovedstaden', '2.g.', 'Biologi', 'Katrine Skjøth', '40786427', 'katrineskjoeth@yahoo.dk', 28, 1, 0, 0, '2016-04-21 00:00:00', '2015-09-28 00:00:00', '0000-00-00 00:00:00'),
(1075, 1677, 1, 'Roskilde Gymnasium', 'Domkirkepladsen', '4000', 'Roskilde', 'Roskilde', 'Hovedstaden', '1.g.', 'Biologi', 'Rune Olsen', '21180778', 'Rune.Olsen@roskilde-gym.dk', 28, 1, 0, 0, '2016-04-26 00:00:00', '2015-10-21 00:00:00', '0000-00-00 00:00:00'),
(1076, 1678, 1, 'Solrød Gymnasium', 'Solrød Center 2', '2680', 'Solrød', 'Solrød', 'Syddanmark', '1.g.', 'Biologi', 'Bodil Theilade', '27127093', 'sgbth@solgym.dk', 29, 1, 0, 0, '2016-04-27 00:00:00', '2015-11-17 00:00:00', '0000-00-00 00:00:00'),
(1077, 1679, 1, 'Borupgaard Gymnasium', 'Lautruphøj 9', '2750', 'Ballerup', 'Ballerup', 'Hovedstaden', '2.g.', 'Bioteknologi', 'Jens Bøgeskov', '29893667', 'jb@boag.nu', 20, 2, 0, 0, '2016-04-28 00:00:00', '2015-10-23 00:00:00', '0000-00-00 00:00:00'),
(1078, 1680, 1, 'Roskilde Gymnasium', 'Domkirkepladsen', '4000', 'Roskilde', 'Roskilde', 'Hovedstaden', '1.g.', 'Bioteknologi', 'Christine Brænder Almstrup', '25852802', 'rgch@roskilde-gym.dk', 30, 1, 0, 0, '2016-04-29 00:00:00', '2015-11-17 00:00:00', '0000-00-00 00:00:00'),
(1079, 1681, 1, 'Erhvervsskolen Nordsjælland, HTX Hillerød', 'Carlsbergvej 34', '3400', 'Hillerød', 'Hillerød', 'Hovedstaden', '2.g.', 'Biologi', 'Maria Rentsch', '20404152', 'mare@esnord.dk', 27, 1, 0, 0, '2016-05-04 00:00:00', '2015-12-03 00:00:00', '0000-00-00 00:00:00'),
(1080, 1682, 1, 'Birkerød Gymnasium - HF - IB & Kostskole', 'Søndervangen 56', '3460', 'Birkerød', 'Rudersdal', 'Hovedstaden', '2.g.', 'Biologi', 'Christina Høier Ricke', '61696739', 'cr@birke-gym.dk', 25, 1, 0, 0, '2016-05-10 00:00:00', '2016-01-05 00:00:00', '0000-00-00 00:00:00'),
(1081, 1683, 1, 'Roskilde Gymnasium', 'Domkirkepladsen 3', '4000', 'Roskilde', 'Roskilde', 'Hovedstaden', '1.g.', 'Biologi', 'Rune Sjødahl', '25678196', 'rgrs@roskilde-gym.dk', 27, 1, 0, 0, '2016-05-11 00:00:00', '2015-11-17 00:00:00', '0000-00-00 00:00:00'),
(1082, 1684, 1, 'Gribskov Gymnasium', 'Østergade 52', '3200', 'Helsinge', 'Gribskov', '', '3.g.', 'Biologi', 'Morten Wermer', '24677788', 'mw@gribskovgymnasium.dk', 20, 1, 0, 0, '2016-05-12 00:00:00', '2016-01-25 00:00:00', '0000-00-00 00:00:00'),
(1083, 1685, 1, 'Rysensteen Gymnasium', 'Tietgensgade 74', '1704', 'København', 'København', '', '2.g.', 'Biologi', 'Marie Brøndum', '60850717', 'br@rysensteen.dk', 24, 1, 0, 0, '2016-05-13 00:00:00', '2016-01-13 00:00:00', '0000-00-00 00:00:00'),
(1084, 1686, 1, 'Birkerød Gymnasium - HF - IB & Kostskole', 'Søndervangen 56', '3460', 'Birkerød', 'Rudersdal', '', '2.g.', 'Biologi', 'Jette Eibye-Jacobsen', '22913753', 'ei@birke-gym.dk', 20, 1, 0, 0, '2016-05-17 00:00:00', '2016-01-07 00:00:00', '0000-00-00 00:00:00'),
(1085, 1687, 1, 'Stenhus Gymnasium og HF', 'Stenhusvej 20', '4300', 'Holbæk', 'Holbæk', 'Hovedstaden', '1.g.', 'Bioteknologi', 'Anfinn Joensen', '30825556', 'anfinn@gmail.com', 30, 2, 0, 0, '2016-05-18 00:00:00', '2015-11-17 00:00:00', '0000-00-00 00:00:00'),
(1086, 1688, 1, 'Rungsted Gymnasium', 'Stadion Alle', '2960', 'Rungsted', 'Hørsholm', 'Hovedstaden', '1.g.', 'Bioteknologi', 'Charlotte puge', '26813503', 'Cpuge@hotmail.com', 15, 1, 0, 0, '2016-05-19 00:00:00', '2015-11-17 00:00:00', '0000-00-00 00:00:00'),
(1087, 1689, 1, 'CELF', 'Kringelborg Alle 7', '4800', 'Nykøbing', 'Guldborgsund', '', '1.g.', 'Bioteknologi', 'Ivar Dencker', '51360563', 'ivde@celf.dk', 22, 2, 0, 0, '2016-05-25 00:00:00', '2016-01-25 00:00:00', '0000-00-00 00:00:00'),
(1088, 1690, -1, 'Vordingborg Gymnasium & HF', 'Chr. Richardtsvej 45', '4760', 'Vordingborg', 'Vordingborg', '', '2.g.', 'Bioteknologi', 'Jeppe Mordhorst', '40685274', 'jm@vordingborg-gym.dk', 28, 2, 0, 0, '2016-05-27 00:00:00', '2016-01-18 00:00:00', '0000-00-00 00:00:00'),
(1089, 1691, -1, 'Grindsted Gymnasium & HF', 'Tinghusgade 20', '7200', 'Grindsted', 'Billund', 'Hovedstaden', '3.g.', 'Biologi', 'Heidi Nystrand', '', 'hn@ggnet.dk', 28, 1, 0, 0, '0000-00-00 00:00:00', '2014-05-28 00:00:00', '0000-00-00 00:00:00'),
(1090, 1692, -1, 'Grindsted Gymnasium & HF', 'Tinghusgade 20', '7200', 'Grindsted', 'Billund', 'Sjælland', '3.g.', 'Biologi', 'Heidi Nystrand', '', 'hn@ggnet.dk', 28, 1, 0, 0, '0000-00-00 00:00:00', '2014-10-01 00:00:00', '0000-00-00 00:00:00'),
(1091, 1693, -1, 'Grindsted Gymnasium & HF', 'Tinghusgade 20', '7200', 'Grindsted', 'Billund', 'Nordjylland', '3.g.', 'Bioteknologi', 'Anja Lykke Hundebøll Nielsen', '', 'ah@ggnet.dk', 16, 1, 0, 0, '0000-00-00 00:00:00', '2014-08-04 00:00:00', '0000-00-00 00:00:00'),
(1092, 1694, 0, '', '', '', '', '', '', '', '', '', '', '', 0, 0, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `booking_kommentar`
--

CREATE TABLE IF NOT EXISTS `booking_kommentar` (
  `kommentar_id` int(11) NOT NULL AUTO_INCREMENT,
  `booking_id` int(11) NOT NULL,
  `kommentar` text NOT NULL,
  PRIMARY KEY (`kommentar_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `booking_taxon`
--

CREATE TABLE IF NOT EXISTS `booking_taxon` (
  `booking_taxon_id` int(11) NOT NULL AUTO_INCREMENT,
  `booking_id` int(11) NOT NULL,
  `taxon_id` int(11) NOT NULL,
  `is_included` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`booking_taxon_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

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
-- Table structure for table `lokalitet`
--

CREATE TABLE IF NOT EXISTS `lokalitet` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=24 ;

--
-- Dumping data for table `taxon`
--

INSERT INTO `taxon` (`taxon_id`, `taxon_navn`, `taxon_navn_dk`, `taxon_artsgruppe`, `taxon_basisliste`) VALUES
(1, 'Perca fluviatilis', 'Aborre', 'Fisk', 1),
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
(22, 'Rana temporaria', 'Butsnudet frø', 'Padder', 1),
(23, 'Scardinius erythrophthalmus', 'Rudskalle', 'Fisk', 1);

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
