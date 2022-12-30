-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 30, 2022 at 08:39 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `coursemy`
--
CREATE DATABASE IF NOT EXISTS `coursemy` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `coursemy`;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `parent_category_id` int(11) DEFAULT NULL,
  `banner_url` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `parent_category_id`, `banner_url`) VALUES
(1, 'Information Technology', NULL, NULL),
(2, 'Web Development', 1, '/images/categories_banner/2.png'),
(3, 'Python', 1, '/images/categories_banner/3.png'),
(4, 'Excel', 1, '/images/categories_banner/4.png'),
(5, 'Javascript', 1, '/images/categories_banner/5.png'),
(6, 'Data Science', 1, '/images/categories_banner/6.png'),
(7, 'AWS Certification', 1, '/images/categories_banner/7.png'),
(8, 'Art', NULL, NULL),
(9, 'Drawing', 8, '/images/categories_banner/9.png');

-- --------------------------------------------------------

--
-- Table structure for table `chapters`
--

CREATE TABLE `chapters` (
  `id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `lesson_number` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `lecturer_id` int(11) NOT NULL,
  `banner_url` varchar(100) NOT NULL,
  `category_id` int(11) NOT NULL,
  `price` float NOT NULL,
  `sale_id` int(11) DEFAULT NULL,
  `status` enum('COMPLETE','INCOMPLETE') NOT NULL,
  `short_description` varchar(100) NOT NULL,
  `detail_description` varchar(2000) NOT NULL,
  `syllabus` varchar(2000) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `slug` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `name`, `lecturer_id`, `banner_url`, `category_id`, `price`, `sale_id`, `status`, `short_description`, `detail_description`, `syllabus`, `created_at`, `updated_at`, `slug`) VALUES
(1, 'Html, css', 3, '/images/courses_banner/1.png', 2, 0, NULL, 'INCOMPLETE', 'Html and css', 'Html and css from zero to hero', '1.Html\n2.Css', '2022-12-30 19:21:41', '2022-12-30 19:21:41', 'html-css-1'),
(2, 'Javascript cơ bản', 3, '/images/courses_banner/2.png', 2, 0, NULL, 'INCOMPLETE', 'Javascript cơ bản', 'Javascript cơ bản cho người mới bắt đầu', '1.Javascript', '2022-12-30 19:21:41', '2022-12-30 19:21:41', 'javascript-cơ-bản-1'),
(3, 'Learn Python: The Complete Python Programming Cour', 4, '/images/courses_banner/3.png', 2, 999, NULL, 'INCOMPLETE', 'Learn A-Z everything about Python, from the basics, to advanced topics like Python GUI, Python Data ', 'Create their own Python Programs\nBecome an experienced Python Programmer\nParse the Web and Create their own Games', '', '2022-12-30 19:21:41', '2022-12-30 19:21:41', 'learn-python-the-complete-python-programming-course-1');

-- --------------------------------------------------------

--
-- Table structure for table `enroll`
--

CREATE TABLE `enroll` (
  `student_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `status` enum('FINISH','LEARNING') NOT NULL,
  `feedback` varchar(2000) DEFAULT NULL,
  `rate_point` float DEFAULT NULL,
  `enroll_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `enroll`
--

INSERT INTO `enroll` (`student_id`, `course_id`, `status`, `feedback`, `rate_point`, `enroll_date`) VALUES
(2, 1, 'LEARNING', NULL, NULL, '2022-12-30'),
(2, 2, 'LEARNING', NULL, NULL, '2022-12-20'),
(2, 3, 'LEARNING', NULL, NULL, '2022-12-30');

-- --------------------------------------------------------

--
-- Table structure for table `lecturers`
--

CREATE TABLE `lecturers` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `career_description` varchar(1000) DEFAULT NULL,
  `avatar_url` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `lecturers`
--

INSERT INTO `lecturers` (`user_id`, `first_name`, `last_name`, `career_description`, `avatar_url`) VALUES
(3, 'Sơn', 'Đặng', NULL, NULL),
(4, 'Avinash', 'Jain', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `lessons`
--

CREATE TABLE `lessons` (
  `id` int(11) NOT NULL,
  `chapter_id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` varchar(2000) NOT NULL,
  `video_url` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

CREATE TABLE `sales` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `discount_percent` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`user_id`, `first_name`, `last_name`) VALUES
(2, 'Kiệt', 'Trần');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `identity` varchar(50) NOT NULL,
  `authority` enum('STUDENT','LECTURER','ADMIN') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `identity`, `authority`) VALUES
(1, 'admin1', 'admin1@gmail.com', '$2a$10$OhhhcSuKVTVLFZ35z9oi.uH2q4.gFXQYEVuz7RoWi/T', 'ADMIN'),
(2, 'student1', 'student1@gmail.com', '$2a$10$aC2pl1F9udvjw4VWhqP.o.QiWBCKBLLhyBRR8oyp9RE', 'STUDENT'),
(3, 'lecturer1', 'lecturer1@gmail.com', '$2a$10$8kOFVy/FGMWutrlcg4uzsOmkB1YEU1/eBAj.3Pya7Ud', 'LECTURER'),
(4, 'Avinash_Jain', 'avinashjain@gmail.com', '$2a$10$alSxvP4m7NQNGuo1709uI.rmgIiLXEn5myCOmKf1lHk', 'LECTURER');

-- --------------------------------------------------------

--
-- Table structure for table `watchlist`
--

CREATE TABLE `watchlist` (
  `student_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chapters`
--
ALTER TABLE `chapters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_CHAPTERS_COURSES` (`course_id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQUE` (`slug`),
  ADD KEY `FK_COURSES_LECTURERS` (`lecturer_id`),
  ADD KEY `FK_COURSES_SALES` (`sale_id`),
  ADD KEY `FK_COURSES_CATEGORIES` (`category_id`);

--
-- Indexes for table `enroll`
--
ALTER TABLE `enroll`
  ADD PRIMARY KEY (`student_id`,`course_id`),
  ADD KEY `FK_ENROLL_COURSES` (`course_id`);

--
-- Indexes for table `lecturers`
--
ALTER TABLE `lecturers`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `lessons`
--
ALTER TABLE `lessons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_LESSONS_CHAPTERS` (`chapter_id`);

--
-- Indexes for table `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `watchlist`
--
ALTER TABLE `watchlist`
  ADD PRIMARY KEY (`student_id`,`course_id`),
  ADD KEY `FK_WATCHLIST_COURSES` (`course_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `chapters`
--
ALTER TABLE `chapters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `lessons`
--
ALTER TABLE `lessons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chapters`
--
ALTER TABLE `chapters`
  ADD CONSTRAINT `FK_CHAPTERS_COURSES` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`);

--
-- Constraints for table `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `FK_COURSES_CATEGORIES` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `FK_COURSES_LECTURERS` FOREIGN KEY (`lecturer_id`) REFERENCES `lecturers` (`user_id`),
  ADD CONSTRAINT `FK_COURSES_SALES` FOREIGN KEY (`sale_id`) REFERENCES `sales` (`id`);

--
-- Constraints for table `enroll`
--
ALTER TABLE `enroll`
  ADD CONSTRAINT `FK_ENROLL_COURSES` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`),
  ADD CONSTRAINT `FK_ENROLL_STUDENTS` FOREIGN KEY (`student_id`) REFERENCES `students` (`user_id`);

--
-- Constraints for table `lecturers`
--
ALTER TABLE `lecturers`
  ADD CONSTRAINT `FK_LECTURERS_USERS` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `lessons`
--
ALTER TABLE `lessons`
  ADD CONSTRAINT `FK_LESSONS_CHAPTERS` FOREIGN KEY (`chapter_id`) REFERENCES `chapters` (`id`);

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `FK_STUDENTS_USERS` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `watchlist`
--
ALTER TABLE `watchlist`
  ADD CONSTRAINT `FK_WATCHLIST_COURSES` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`),
  ADD CONSTRAINT `FK_WATCHLIST_STUDENTS` FOREIGN KEY (`student_id`) REFERENCES `students` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
