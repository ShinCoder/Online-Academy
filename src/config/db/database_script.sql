-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th1 01, 2023 lúc 10:52 AM
-- Phiên bản máy phục vụ: 10.4.24-MariaDB
-- Phiên bản PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `coursemy`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `parent_category_id` int(11) DEFAULT NULL,
  `banner_url` varchar(100) DEFAULT NULL,
  `slug` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `categories`
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
-- Cấu trúc bảng cho bảng `chapters`
--

CREATE TABLE `chapters` (
  `id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `chapters`
--

INSERT INTO `chapters` (`id`, `course_id`, `title`) VALUES
(4, 42, 'chap1'),
(5, 42, 'chap2');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `courses`
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
-- Đang đổ dữ liệu cho bảng `courses`
--

INSERT INTO `courses` (`id`, `name`, `lecturer_id`, `banner_filename`, `category_id`, `price`, `sale_id`, `is_completed`, `short_description`, `detail_description`, `syllabus`, `created_at`, `updated_at`, `slug`) VALUES
(1, 'Html, css', 3, '/images/courses_banner/1.png', 2, 0, NULL, 2, 'Html and css', 'Html and css from zero to hero', '1.Html\n2.Css', '2022-12-31 16:46:49', '2022-12-31 16:46:49', 'html-css-1'),
(2, 'Javascript cơ bản', 3, '/images/courses_banner/2.png', 5, 0, NULL, 2, 'Javascript cơ bản', 'Javascript cơ bản cho người mới bắt đầu', '1.Javascript', '2022-08-03 00:00:00', '2022-12-31 16:46:49', 'javascript-cơ-bản-1'),
(3, 'Learn Python: The Complete Python Programming Cour', 4, '/images/courses_banner/3.png', 3, 999, NULL, 2, 'Learn A-Z everything about Python, from the basics, to advanced topics like Python GUI, Python Data ', 'Create their own Python Programs\nBecome an experienced Python Programmer\nParse the Web and Create their own Games', '', '2022-11-25 00:00:00', '2022-12-31 16:46:49', 'learn-python-the-complete-python-programming-course-1'),
(42, 'course test 04', 3, 'uploadCourseBannerInput_1672565172376.png', 4, 123, NULL, 0, '<p>COURSE TEST 04</p>', '<p>COURSE TEST 04</p>', '<p>COURSE TEST 04</p>', '2023-01-01 16:26:12', '2023-01-01 16:26:12', 'course-test-04-1');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `enroll`
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
-- Đang đổ dữ liệu cho bảng `enroll`
--

INSERT INTO `enroll` (`student_id`, `course_id`, `status`, `feedback`, `rate_point`, `enroll_date`) VALUES
(2, 1, 'LEARNING', NULL, 4, '2022-12-31'),
(2, 2, 'LEARNING', NULL, 5, '2022-12-20'),
(2, 3, 'LEARNING', NULL, 3, '2022-12-31');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `lecturers`
--

CREATE TABLE `lecturers` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `career_description` varchar(1000) DEFAULT NULL,
  `avatar_url` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `lecturers`
--

INSERT INTO `lecturers` (`user_id`, `first_name`, `last_name`, `career_description`, `avatar_url`) VALUES
(3, 'Sơn', 'Đặng', NULL, NULL),
(4, 'Avinash', 'Jain', NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `lessons`
--

CREATE TABLE `lessons` (
  `id` int(11) NOT NULL,
  `chapter_id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` varchar(2000) NOT NULL,
  `video_filename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `lessons`
--

INSERT INTO `lessons` (`id`, `chapter_id`, `title`, `description`, `video_filename`) VALUES
(3, 4, 'CHAP1 - les1', '<p>CHAP1 - LES1</p>', 'uploadLessonVideo_1672565188171.mp4'),
(4, 4, 'CHAP1 - LES2', '<p>CHAP1 - LES2</p>', 'uploadLessonVideo_1672565201381.mp4'),
(5, 5, 'CHAP2 - les1', '<p>CHAP2 - LES1</p>', 'uploadLessonVideo_1672565229484.mp4'),
(6, 5, 'CHAP2 - LES2', '<p>123</p>', 'uploadLessonVideo_1672565240411.mp4');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sales`
--

CREATE TABLE `sales` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `discount_percent` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `students`
--

CREATE TABLE `students` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `students`
--

INSERT INTO `students` (`user_id`, `first_name`, `last_name`) VALUES
(2, 'Kiệt', 'Trần');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `identity` varchar(50) NOT NULL,
  `authority` enum('STUDENT','LECTURER','ADMIN') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `identity`, `authority`) VALUES
(1, 'admin1', 'admin1@gmail.com', '$2a$10$2cccpQB1RfnUNrOnJJp76uSnpdLWaopuFryOe2gzbHM', 'ADMIN'),
(2, 'student1', 'student1@gmail.com', '$2a$10$HuUM.ckkVOtobrXahdbp5uZOetZMGHbQw70Xo7JcSHp', 'STUDENT'),
(3, 'lecturer1', 'lecturer1@gmail.com', '$2a$10$XK6OtFMKp/p8Gm/xOsxLEePHUIa6DFqLUyGsxhshCiq', 'LECTURER'),
(4, 'Avinash_Jain', 'avinashjain@gmail.com', '$2a$10$chrmwi3fLjkpCf.y8878pukxzAonFqCG0mmtbmUTAZ6', 'LECTURER');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `watchlist`
--

CREATE TABLE `watchlist` (
  `student_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `chapters`
--
ALTER TABLE `chapters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_CHAPTERS_COURSES` (`course_id`);

--
-- Chỉ mục cho bảng `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQUE` (`slug`),
  ADD KEY `FK_COURSES_LECTURERS` (`lecturer_id`),
  ADD KEY `FK_COURSES_SALES` (`sale_id`),
  ADD KEY `FK_COURSES_CATEGORIES` (`category_id`);

--
-- Chỉ mục cho bảng `enroll`
--
ALTER TABLE `enroll`
  ADD PRIMARY KEY (`student_id`,`course_id`),
  ADD KEY `FK_ENROLL_COURSES` (`course_id`);

--
-- Chỉ mục cho bảng `lecturers`
--
ALTER TABLE `lecturers`
  ADD PRIMARY KEY (`user_id`);

--
-- Chỉ mục cho bảng `lessons`
--
ALTER TABLE `lessons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_LESSONS_CHAPTERS` (`chapter_id`);

--
-- Chỉ mục cho bảng `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`user_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `watchlist`
--
ALTER TABLE `watchlist`
  ADD PRIMARY KEY (`student_id`,`course_id`),
  ADD KEY `FK_WATCHLIST_COURSES` (`course_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `chapters`
--
ALTER TABLE `chapters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT cho bảng `lessons`
--
ALTER TABLE `lessons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `chapters`
--
ALTER TABLE `chapters`
  ADD CONSTRAINT `FK_CHAPTERS_COURSES` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`);

--
-- Các ràng buộc cho bảng `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `FK_COURSES_CATEGORIES` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `FK_COURSES_LECTURERS` FOREIGN KEY (`lecturer_id`) REFERENCES `lecturers` (`user_id`),
  ADD CONSTRAINT `FK_COURSES_SALES` FOREIGN KEY (`sale_id`) REFERENCES `sales` (`id`);

--
-- Các ràng buộc cho bảng `enroll`
--
ALTER TABLE `enroll`
  ADD CONSTRAINT `FK_ENROLL_COURSES` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`),
  ADD CONSTRAINT `FK_ENROLL_STUDENTS` FOREIGN KEY (`student_id`) REFERENCES `students` (`user_id`);

--
-- Các ràng buộc cho bảng `lecturers`
--
ALTER TABLE `lecturers`
  ADD CONSTRAINT `FK_LECTURERS_USERS` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `lessons`
--
ALTER TABLE `lessons`
  ADD CONSTRAINT `FK_LESSONS_CHAPTERS` FOREIGN KEY (`chapter_id`) REFERENCES `chapters` (`id`);

--
-- Các ràng buộc cho bảng `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `FK_STUDENTS_USERS` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `watchlist`
--
ALTER TABLE `watchlist`
  ADD CONSTRAINT `FK_WATCHLIST_COURSES` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`),
  ADD CONSTRAINT `FK_WATCHLIST_STUDENTS` FOREIGN KEY (`student_id`) REFERENCES `students` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
