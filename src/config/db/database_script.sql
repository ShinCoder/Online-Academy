-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 01, 2023 at 08:38 PM
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
  `banner_url` varchar(100) DEFAULT NULL,
  `slug` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `parent_category_id`, `banner_url`, `slug`) VALUES
(1, 'Information Technology', NULL, NULL, 'information-technology'),
(2, 'Web Development', 1, '/images/categories_banner/2.png', 'web-development'),
(3, 'Python', 1, '/images/categories_banner/3.png', 'python'),
(4, 'Excel', 1, '/images/categories_banner/4.png', 'excel'),
(5, 'Javascript', 1, '/images/categories_banner/5.png', 'javascript'),
(6, 'Data Science', 1, '/images/categories_banner/6.png', 'data-science'),
(7, 'AWS Certification', 1, '/images/categories_banner/7.png', 'aws-certification'),
(8, 'Art', NULL, NULL, 'art'),
(9, 'Drawing', 8, '/images/categories_banner/9.png', 'drawing');

-- --------------------------------------------------------

--
-- Table structure for table `chapters`
--

CREATE TABLE `chapters` (
  `id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `lecturer_id` int(11) NOT NULL,
  `banner_filename` varchar(100) NOT NULL,
  `category_id` int(11) NOT NULL,
  `price` float NOT NULL,
  `sale_id` int(11) DEFAULT NULL,
  `is_completed` tinyint(1) NOT NULL,
  `short_description` varchar(100) NOT NULL,
  `detail_description` varchar(2000) NOT NULL,
  `syllabus` varchar(2000) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `slug` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `name`, `lecturer_id`, `banner_filename`, `category_id`, `price`, `sale_id`, `is_completed`, `short_description`, `detail_description`, `syllabus`, `created_at`, `updated_at`, `slug`) VALUES
(1, 'Html, css', 3, '1.png', 2, 0, NULL, 0, 'Html and css', 'Html and css from zero to hero', '1.Html\n2.Css', '2023-01-01 10:50:03', '2023-01-01 10:50:03', 'html-css-1'),
(2, 'Javascript cơ bản', 3, '2.png', 5, 0, NULL, 0, 'Javascript cơ bản', 'Javascript cơ bản cho người mới bắt đầu', '1.Javascript', '2022-08-03 00:00:00', '2023-01-01 10:50:03', 'javascript-cơ-bản-1'),
(3, 'Learn Python: The Complete Python Programming Course', 4, '3.png', 3, 999000, NULL, 0, 'Learn A-Z everything about Python, from the basics, to advanced topics like Python GUI, Python Data ', 'Create their own Python Programs\nBecome an experienced Python Programmer\nParse the Web and Create their own Games', '', '2022-11-25 00:00:00', '2023-01-01 10:50:03', 'learn-python-the-complete-python-programming-course-1'),
(4, 'Become a Certified HTML, CSS, JavaScript Web Developer', 5, '4.png', 2, 199000, NULL, 0, 'Complete coverage of HTML, CSS, Javascript while you Earn Four Respected Certifications', 'Prepare for Industry Certification Exam\nEarn Certification that is Proof of your Competence\nHours and Hours of Video Instruction\nDozens of Code Examples to Download and Study\nOver 25 Engaging Lab Exercises\nAll Lab Solutions\nInstructor Available by Email or on the Forums\nAll Free Tools\nComprehensive Coverage of HTML and CSS\nClient Side Programming with Javascript\nServer Side Development with PHP\nLearn Database Development with mySQL', '', '2022-12-05 00:00:00', '2022-12-24 00:00:00', 'become-a-certified-html-css-javascript-web-developer-1');

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
  `enroll_date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `enroll`
--

INSERT INTO `enroll` (`student_id`, `course_id`, `status`, `feedback`, `rate_point`, `enroll_date`) VALUES
(2, 1, 'LEARNING', NULL, 4, '2023-01-01'),
(2, 2, 'LEARNING', NULL, 5, '2022-12-20'),
(2, 3, 'LEARNING', NULL, 3, '2023-01-01'),
(2, 4, 'LEARNING', NULL, NULL, '2023-01-02');

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
(4, 'Avinash', 'Jain', NULL, NULL),
(5, 'Mark', 'Lassoff', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `lessons`
--

CREATE TABLE `lessons` (
  `id` int(11) NOT NULL,
  `chapter_id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` varchar(2000) NOT NULL,
  `video_filename` varchar(100) NOT NULL
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
(1, 'admin1', 'admin1@gmail.com', '$2a$10$jbjOUByUlwX6cEkVNoXlLO8G0Xydgh3H6sa7c/tOxAZ', 'ADMIN'),
(2, 'student1', 'student1@gmail.com', '$2a$10$UWQJjlueqeNrjLF1uh86h.4dz6IBv0CO0CwdtRFKMKa', 'STUDENT'),
(3, 'lecturer1', 'lecturer1@gmail.com', '$2a$10$nxvYBdLoqBMAh8QAWxXpB.vAKEjNyVSmxR9ftbjybOm', 'LECTURER'),
(4, 'Avinash_Jain', 'avinashjain@gmail.com', '$2a$10$PcTef.e/pxwynNa1xaHQ.uJnE29Zzq19m1ZQkigxEwA', 'LECTURER'),
(5, 'Mark_Lassoff', 'marklassoff@gmail.com', '$2a$10$oEEDPcfv.fbCLfxTw3/te.XNBWb4jrIuUSl0lwXld/7', 'LECTURER');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `lessons`
--
ALTER TABLE `lessons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chapters`
--
ALTER TABLE `chapters`
  ADD CONSTRAINT `FK_CHAPTERS_COURSES` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
  ADD CONSTRAINT `FK_LESSONS_CHAPTERS` FOREIGN KEY (`chapter_id`) REFERENCES `chapters` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
