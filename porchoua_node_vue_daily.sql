-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 10, 2024 at 03:29 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `porchoua_node_vue_daily`
--

-- --------------------------------------------------------

--
-- Table structure for table `daily`
--

CREATE TABLE `daily` (
  `id` bigint(20) NOT NULL,
  `five_six` varchar(20) DEFAULT NULL,
  `six_seven` varchar(20) DEFAULT NULL,
  `seven_eight` varchar(20) DEFAULT NULL,
  `eight_nine` varchar(20) DEFAULT NULL,
  `nine_ten` varchar(20) DEFAULT NULL,
  `ten_eleven` varchar(20) DEFAULT NULL,
  `eleven_twelve` varchar(20) DEFAULT NULL,
  `twelve_thirteen` varchar(20) DEFAULT NULL,
  `thirteen_fourteen` varchar(20) DEFAULT NULL,
  `fourteen_fifteen` varchar(20) DEFAULT NULL,
  `fifteen_sixteen` varchar(20) DEFAULT NULL,
  `sixteen_seventeen` varchar(20) DEFAULT NULL,
  `seventeen_eighteen` varchar(20) DEFAULT NULL,
  `eighteen_nineteen` varchar(20) DEFAULT NULL,
  `nineteen_twenty` varchar(20) DEFAULT NULL,
  `twenty_twentyone` varchar(20) DEFAULT NULL,
  `twentyone_twentytwo` varchar(20) DEFAULT NULL,
  `twentytwo_twentythree` varchar(20) DEFAULT NULL,
  `twentythree_five` varchar(20) DEFAULT NULL,
  `day` varchar(10) DEFAULT NULL,
  `income` int(20) DEFAULT NULL,
  `income_reason` varchar(50) DEFAULT NULL,
  `expenditure` bigint(20) DEFAULT NULL,
  `expenditure_reason` varchar(50) DEFAULT NULL,
  `m_status` varchar(11) DEFAULT NULL,
  `timestamp` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `daily`
--

INSERT INTO `daily` (`id`, `five_six`, `six_seven`, `seven_eight`, `eight_nine`, `nine_ten`, `ten_eleven`, `eleven_twelve`, `twelve_thirteen`, `thirteen_fourteen`, `fourteen_fifteen`, `fifteen_sixteen`, `sixteen_seventeen`, `seventeen_eighteen`, `eighteen_nineteen`, `nineteen_twenty`, `twenty_twentyone`, `twentyone_twentytwo`, `twentytwo_twentythree`, `twentythree_five`, `day`, `income`, `income_reason`, `expenditure`, `expenditure_reason`, `m_status`, `timestamp`) VALUES
(17, 'ຕື່ນນອນ+ແຕ່ງກິນ', 'ອາບນ້ຳ+ກິນເຂົ້າ', 'ກຽມ+ໄປໂຮງຮຽນ', 'machine learning', 'machine learning', 'vue js', 'vue js', 'ກັບຫ້ອງ + ກິນເຂົ້າ +', 'web security', 'web security', 'ກັບຫ້ອງ+ພັກຜ່ອນ', 'ຮຽນ php', 'ຮຽນ php', 'ພັກຜ່ອນ', 'ແຕ່ງກິນ+ກິນເຂົ້າ', 'ອາບນ້ຳ', 'vue js + node js', 'vue js + node js', 'ນອນ', 'ພະຫັດ', NULL, NULL, NULL, NULL, NULL, '2024-06-01'),
(34, 'vfdsdf', 'sdf', 'sdf', 'sdf', 'sdf', 'sdf', 'sdf', 'sdf', 'sdf', 'sf', 'sdf', 'sdf', 'sdf', 'sdf', 'sdf', 'sdf', 'sdf', 'sdfs', 'sdf', 'ທິດ', NULL, NULL, NULL, NULL, NULL, '2024-06-02'),
(35, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2500000, 'ເງິນເດືອນ', NULL, NULL, 'ເງິນໃນບັນຊີ', '2024-06-02'),
(36, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 500000, 'ຄ່າຫ້ອງແຖວ', 'ເງິນໃນບັນຊີ', '2024-06-02'),
(38, 'ຕື່ນນອນ', 'ອາບນ້ຳ', 'ກິນເຂົ້າ', 'ຮຽນ', 'ຮຽນ', 'ຮຽນ', 'ຮຽນ', 'ກິນເຂົ້າ', 'ຮຽນ', 'ຮຽນ', 'ຮຽນ', 'ຮຽນ', 'ພັກຜ່ອນ', 'ພັກຜ່ອນ', 'ອາບນ້ຳ', 'ກິນເຂົ້າ', 'ນອນ', 'ນອນ', 'ນອນ', 'ຈັນ', NULL, NULL, NULL, NULL, NULL, '2024-06-03'),
(41, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2500000, 'ເງິນເດືອນ', NULL, NULL, 'ເງິນໃນບັນຊີ', '2024-06-04'),
(44, 'ASdfsA', 'ASFd', 'ASDFASsdfas', 'asf', 'asf', 'asfd', 'asdf', 'as', 'df', 'asf', 'asdf', 'sadf', 'asdf', 'asf', 'asfd', 'asdf', 'asdf', 'saf', 'sadf', 'ທິດ', NULL, NULL, NULL, NULL, NULL, '2024-06-04'),
(45, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 150000, 'ຄ່າອາຫານ', 'ເງິນສົດ', '2024-06-04'),
(46, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 200000, 'TEST', 'ເງິນໃນບັນຊີ', '2024-06-04'),
(47, 'skfsd', 'asfksas', 'asdf', 'asdfasfd', 'sf', 'sdf', 'sdf', 'sdf', 'sfs', 'asdf', 'asdfas', 'asdf', 'asdf', 'asdf', 'ds', 'sd', 'sd', 'sdf', 'sdf', 'ພຸດ', NULL, NULL, NULL, NULL, NULL, '2024-06-05'),
(48, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 50000, 'ຄ່າອາຫານ', 'ເງິນໃນບັນຊີ', '2024-06-09');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `filename` varchar(100) NOT NULL,
  `path` varchar(100) NOT NULL,
  `timestamp` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `filename`, `path`, `timestamp`) VALUES
(12, '1717966599487.png', '/1717966599487.png', '2024-06-09');

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `id` int(11) NOT NULL,
  `content` varchar(200) NOT NULL,
  `module` varchar(50) NOT NULL,
  `timestamp` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`id`, `content`, `module`, `timestamp`) VALUES
(7, 'ຫດຫກດຫກ', 'asdfasdf', '2024-06-03'),
(8, 'fsdfs', 'dsfsdfsd', '2024-06-03');

-- --------------------------------------------------------

--
-- Table structure for table `plans`
--

CREATE TABLE `plans` (
  `id` int(11) NOT NULL,
  `plan_name` varchar(30) NOT NULL,
  `percent` int(3) NOT NULL,
  `active` int(5) NOT NULL DEFAULT 0,
  `status` int(1) NOT NULL DEFAULT 0,
  `timestamp` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `plans`
--

INSERT INTO `plans` (`id`, `plan_name`, `percent`, `active`, `status`, `timestamp`) VALUES
(10, 'node js', 80, 80, 1, '2024-06-04'),
(11, 'vue js', 80, 0, 0, '2024-06-04'),
(12, 'react js', 80, 0, 0, '2024-06-04'),
(13, 'nuxt js', 80, 0, 0, '2024-06-04'),
(14, 'english', 60, 60, 1, '2024-06-07');

-- --------------------------------------------------------

--
-- Table structure for table `school_tables`
--

CREATE TABLE `school_tables` (
  `id` int(11) NOT NULL,
  `day` varchar(11) NOT NULL,
  `first_time` varchar(50) NOT NULL,
  `second_time` varchar(50) NOT NULL,
  `third_time` varchar(50) NOT NULL,
  `fourth_time` varchar(11) NOT NULL,
  `timestamp` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `school_tables`
--

INSERT INTO `school_tables` (`id`, `day`, `first_time`, `second_time`, `third_time`, `fourth_time`, `timestamp`) VALUES
(4, 'ຈັນ', 'test', 'test', 'test', 'test', '2024-06-03'),
(5, 'ອັງຄານ', 'test', 'test', 'test', 'test', '2024-06-03'),
(6, 'ພຸດ', 'test', 'test', 'test', 'test', '2024-06-03'),
(7, 'ພະຫັດ', 'test', 'test', 'test', 'test', '2024-06-03'),
(8, 'ສຸກ', 'test', 'test', 'test', 'test', '2024-06-03');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `phone` varchar(200) NOT NULL,
  `email` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL,
  `timestamp` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `phone`, `email`, `password`, `timestamp`) VALUES
(20, 'porchoua', '02076589225', 'kangserpobtsuasvaaj@', '$2b$10$evNaw4v9JhdFNWTfZNYBGuYqTzgZa.TPNhX2RGXk9R4NxegpYvDQe', '2024-06-09');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `daily`
--
ALTER TABLE `daily`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `plans`
--
ALTER TABLE `plans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `school_tables`
--
ALTER TABLE `school_tables`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `daily`
--
ALTER TABLE `daily`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `notes`
--
ALTER TABLE `notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `plans`
--
ALTER TABLE `plans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `school_tables`
--
ALTER TABLE `school_tables`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
