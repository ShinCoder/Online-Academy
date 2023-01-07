-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 07, 2023 at 07:41 PM
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
(1, 'Development', NULL, NULL, 'development'),
(2, 'Web Development', 1, '/images/categories_banner/2.png', 'web-development'),
(3, 'Data Science', 1, '/images/categories_banner/3.png', 'data-science'),
(4, 'Art & Craft', NULL, NULL, 'art--craft'),
(5, 'Drawing', 4, '/images/categories_banner/5.png', 'drawing'),
(6, 'Office Productivity', NULL, NULL, 'office-productivity'),
(7, 'Microsoft', 6, '/images/categories_banner/7.png', 'microsoft'),
(8, 'Google', 6, '/images/categories_banner/8.png', 'google'),
(9, 'Mobile Development', 1, '/images/categories_banner/9.png', 'mobile-development'),
(10, 'Programming Languages', 1, '/images/categories_banner/10.png', 'programming-languages'),
(11, 'Design', NULL, NULL, 'design'),
(12, 'Graphic Design', 11, '/images/categories_banner/12.png', 'graphic-design'),
(13, 'User Experience Design', 11, '/images/categories_banner/13.png', 'user-experience-design');

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
  `slug` varchar(100) NOT NULL,
  `is_activated` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `name`, `lecturer_id`, `banner_filename`, `category_id`, `price`, `sale_id`, `is_completed`, `short_description`, `detail_description`, `syllabus`, `created_at`, `updated_at`, `slug`, `is_activated`) VALUES
(1, 'HTML CSS từ Zero đến Hero', 3, '1.png', 2, 0, NULL, 0, 'Trong khóa này chúng ta sẽ cùng nhau xây dựng giao diện 2 trang web là The Band & Shopee.', 'Html and css from zero to hero', '1.Html\n2.Css', '2023-01-04 17:12:17', '2023-01-04 17:12:17', 'html-css-từ-zero-đến-hero-1', 1),
(2, 'Lập Trình JavaScript Cơ Bản', 3, '2.png', 2, 0, NULL, 0, 'Học Javascript cơ bản phù hợp cho người chưa từng học lập trình. Với hơn 100 bài học và có bài tập t', 'Javascript cơ bản cho người mới bắt đầu', '1.Javascript', '2022-08-03 00:00:00', '2023-01-04 17:12:17', 'lập-trình-javascript-cơ-bản-1', 1),
(3, 'Learn Python: The Complete Python Programming Course', 4, '3.png', 3, 999000, NULL, 0, 'Learn A-Z everything about Python, from the basics, to advanced topics like Python GUI, Python Data ', 'Create their own Python Programs\nBecome an experienced Python Programmer\nParse the Web and Create their own Games', '', '2022-11-25 00:00:00', '2023-01-04 17:12:17', 'learn-python-the-complete-python-programming-course-1', 1),
(4, 'Become a Certified HTML, CSS, JavaScript Web Developer', 5, '4.png', 2, 199000, NULL, 0, 'Complete coverage of HTML, CSS, Javascript while you Earn Four Respected Certifications', 'Prepare for Industry Certification Exam\nEarn Certification that is Proof of your Competence\nHours and Hours of Video Instruction\nDozens of Code Examples to Download and Study\nOver 25 Engaging Lab Exercises\nAll Lab Solutions\nInstructor Available by Email or on the Forums\nAll Free Tools\nComprehensive Coverage of HTML and CSS\nClient Side Programming with Javascript\nServer Side Development with PHP\nLearn Database Development with mySQL', '', '2022-12-05 00:00:00', '2022-12-24 00:00:00', 'become-a-certified-html-css-javascript-web-developer-1', 1),
(5, 'Google Sheets Fundamentals', 5, '5.png', 8, 199000, NULL, 0, 'Master Google\'s Spreadsheet Program', 'Competently navigate the Google Sheets Interface and successfully enter data\nFormat spreadsheets so that they are both readable and attractive\nCreate formulas and use built-in Spreadsheet functions\nManage spreadsheet data and apply filters and sorts\nOutput, Use Collaboration Tools and Export Spreadsheets', '', '2021-06-15 00:00:00', '2021-10-24 00:00:00', 'google-sheets-fundamentals-1', 1),
(6, 'JavaScript 2019: JavaScript ES6 Certification Course', 5, '6.png', 2, 249000, NULL, 0, 'Earn the JavaScript Specialist Certification while Learning JavaScript ES6', 'JavaScript syntax, style and usage with a focus on developing apps\nBe Current with ES6 Syntax and Usage\nFundamental to Advanced JavaScript Concepts including Promises, Classes, and Arrow Functions\nIntegration of JavaScript with HTML5 Code for Web Applications', '', '2020-06-25 00:00:00', '2020-10-24 00:00:00', 'javascript-2019-javascript-es6-certification-course-1', 1),
(7, 'Responsive Design for Web Designers', 5, '7.png', 2, 199000, NULL, 0, 'Learn How to Create Flexible Designs for a Multi-Screen World', 'Identify the four elements of responsive Design\nUnderstand and use a mobile-first design approach\nUnderstand how and why to design with fluid content grids\nUnderstand how content scale impacts responsive design\nExecute cross-device preview and testing to ensure designs work on different sized screens\nUtilize the meta tags required in code for responsive design\nWork with the <picture> tag to create responsive images\nCreate media queries that alter designs for multiple size screens', '', '2021-06-25 00:00:00', '2021-11-24 00:00:00', 'responsive-design-for-web-designers-1', 1),
(8, 'Build Android Apps with App Inventor 2 - No Coding Required', 6, '8.png', 9, 199000, NULL, 0, 'Android application,App Inventor 2,Google Play Store,Basic Programming', 'Create Android Applications using App Inventor 2.\nUnderstand how to publish created applications to the Google Play Store.\nUnderstand how to update created applications once they have been published to the Google Play Store.\nNavigate and use the App Inventor 2 interface fluidly, effectively and efficiently.\nUnderstand the basics of programming.', '', '2020-07-25 00:00:00', '2020-12-14 00:00:00', 'build-android-apps-with-app-inventor-2---no-coding-required-1', 1),
(9, 'Microsoft Office 365 Administration', 6, '9.png', 7, 229000, NULL, 0, 'Microsoft Office 365 Administration', 'Setup a custom domain on on microsoft\nUnderstand the basics of the integrated applications\nCheck service health\nCheck and log service requests\nGenerate customized reports\nCreate and manage users in Microsoft Office 365\nCreate security groups\nImport users\nMigrate mail to Office 365 Outlook\nManage spam and malware', '', '2020-07-29 00:00:00', '2020-12-14 00:00:00', 'microsoft-office-365-administration-1', 1),
(10, 'Learn PHP Programming From Scratch', 6, '10.png', 10, 249000, NULL, 0, 'Over 50 hours of PHP programming goodness.', 'Demonstrate understanding of PHP programming\nTo learn the basics of PHP programming\nTo learn PHP programming by working on projects\nTo learn intermediate and advanced PHP programming', '', '2021-02-12 00:00:00', '2021-05-14 00:00:00', 'learn-php-programming-from-scratch-1', 1),
(11, 'Become a Professional Graphic Designer', 6, '11.png', 12, 229000, NULL, 0, 'Learn what you need to know to break into the world of graphic design.', 'To learn what graphic design is and how to become a graphic designer\nLearn what a graphic designer does on the job\nLearn the principles of great graphic design\nLearn graphic design as it relates to Photoshop, Illustrator, InDesign and Acrobat\nLearn graphic design for the web using Dreamweaver\nLearn visual communication fundamentals\nLearn successful layout in graphic design\nLearn how to get a job as a graphic designer', '', '2020-05-22 00:00:00', '2020-09-14 00:00:00', 'become-a-professional-graphic-designer-1', 1),
(12, 'Mobile UI and UX Design', 6, '12.png', 13, 229000, NULL, 0, 'Make your mobile UI design pop and understand the mobile UX process', 'At the end of this course, students will be equipped to oversee design a mobile application\'s\nexperience and interface, through the full process which includes:\nRequirements Assessment\nDesign Project Planning\nUser Experience Recommendations\nUser Interface Design & Documentation\nDesign Implementation Guidelines & Management', '', '2017-01-22 00:00:00', '2017-02-14 00:00:00', 'mobile-ui-and-ux-design-1', 1),
(13, 'Become a Professional Web Developer | Version 3.0', 6, '13.png', 2, 199000, NULL, 0, 'Everything you need to know to become a professional web developer from scratch, updated for modern ', 'To learn every skill needed as a professional web developer/designer\nTo create real life projects for your portfolio\nTo become a professional web developer', '', '2020-02-12 00:00:00', '2020-08-14 00:00:00', 'become-a-professional-web-developer--version-30-1', 1),
(14, 'Learn Pascal Programming from Scratch', 6, '14.png', 10, 199000, NULL, 0, 'Create, maintain, design, and build cross-platform native applications', 'Create, maintain, design, and build cross-platform native applications.\nYou will learn how to write the code once, compile it, and run it on multiple platforms.', '', '2016-12-31 00:00:00', '2017-02-24 00:00:00', 'learn-pascal-programming-from-scratch-1', 1),
(15, 'Java Swing (GUI) Programming: From Beginner to Expert', 8, '15.png', 10, 249000, NULL, 0, 'Learn how to create desktop and Internet GUI Java programs and take your Java programming to the nex', 'Learn how to write GUI (graphical user interface) applications in Java\nUnderstand the Java Swing framework\nDiscover how to create database applications', '', '2015-06-21 00:00:00', '2015-08-14 00:00:00', 'java-swing-gui-programming-from-beginner-to-expert-1', 1),
(16, 'Learn Advanced C++ Programming', 8, '16.png', 10, 229000, NULL, 0, 'Discover intermediate to advanced C++, including C++ 11\'s fantastic additions to the C++ standard.', 'Develop complex C++ applications\nUnderstand C++ 11\nBe in a position to apply for jobs requiring good C++ knowledge', '', '2022-04-13 00:00:00', '2022-06-23 00:00:00', 'learn-advanced-c-programming-1', 1),
(17, 'Java 11 For Complete Beginners', 8, '17.png', 10, 229000, NULL, 0, 'Learn Modern Java From Scratch', 'Computer programming in Java', '', '2020-01-04 00:00:00', '2020-04-30 00:00:00', 'java-11-for-complete-beginners-1', 1),
(18, 'Responsive Với Grid System', 3, '18.png', 2, 0, NULL, 1, 'Trong khóa này chúng ta sẽ học về cách xây dựng giao diện web responsive với Grid System, tương tự B', 'Biết cách xây dựng website Responsive\nHiểu được tư tưởng thiết kế với Grid system\nTự tay xây dựng được thư viện CSS Grid\nTự hiểu được Grid layout trong bootstrap', '', '2020-11-09 00:00:00', '2021-01-12 00:00:00', 'responsive-với-grid-system-1', 1),
(19, 'Lập Trình JavaScript Nâng Cao', 3, '19.png', 2, 0, NULL, 0, 'Hiểu sâu hơn về cách Javascript hoạt động, tìm hiểu về IIFE, closure, reference types, this keyword,', 'Được học kiến thức miễn phí với nội dung chất lượng hơn mất phí\nCác kiến thức nâng cao của Javascript giúp code trở nên tối ưu hơn\nHiểu được cách tư duy nâng cao của các lập trình viên có kinh nghiệm\nHiểu được các khái niệm khó như từ khóa this, phương thức bind, call, apply & xử lý bất đồng bộ\nCó nền tảng Javascript vững chắc để làm việc với mọi thư viện, framework viết bởi Javascript\nNâng cao cơ hội thành công khi phỏng vấn xin việc nhờ kiến thức chuyên môn vững chắc', '', '2023-01-04 17:12:17', '2023-01-04 17:12:17', 'lập-trình-javascript-nâng-cao-1', 1),
(20, 'Node & ExpressJS', 3, '20.png', 2, 0, NULL, 0, 'Học Back-end với Node & ExpressJS framework, hiểu các khái niệm khi làm Back-end và xây dựng RESTful', 'Nắm chắc lý thuyết chung trong việc xây dựng web\nBiết cách làm việc với Mongoose, MongoDB trong NodeJS\nXây dựng web với Express bằng kiến thức thực tế\nBiết cách xây dựng API theo chuẩn RESTful API\nNắm chắc lý thuyết về API và RESTful API\nĐược chia sẻ lại kinh nghiệm làm việc thực tế\nNắm chắc khái niệm về giao thức HTTP\nHiểu rõ tư tưởng và cách hoạt động của mô hình MVC\nHọc được cách tổ chức code trong thực tế\nBiết cách deploy (triển khai) website lên internet', '', '2023-01-04 17:12:17', '2023-01-04 17:12:17', 'node--expressjs-1', 1);

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
  `enroll_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `enroll`
--

INSERT INTO `enroll` (`student_id`, `course_id`, `status`, `feedback`, `rate_point`, `enroll_date`) VALUES
(2, 1, 'LEARNING', NULL, 4, '2023-01-04 00:00:00'),
(2, 2, 'LEARNING', NULL, 5, '2022-12-20 00:00:00'),
(2, 3, 'LEARNING', NULL, 3, '2023-01-04 00:00:00'),
(7, 2, 'LEARNING', NULL, 2, '2023-01-04 00:00:00');

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
(3, 'Sơn', 'Đặng', '<p>He is good guy</p>', 'uploadProfileAvatarInput_1672923812382.jpg'),
(4, 'Avinash', 'Jain', NULL, NULL),
(5, 'Mark', 'Lassoff', NULL, NULL),
(6, 'Stone River', 'elearning', NULL, NULL),
(8, 'John', 'Purcell', NULL, NULL);

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
(2, 'Kiệt', 'Trần'),
(7, 'Kiệt', 'Trần');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `identity` varchar(50) NOT NULL,
  `authority` enum('STUDENT','LECTURER','ADMIN') NOT NULL,
  `is_activated` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `identity`, `authority`, `is_activated`) VALUES
(1, 'admin1', 'admin1@gmail.com', '$2a$10$FV2dj5JYTGT08V/97UE8eehPU/j05EMGtvMutUj6EOS', 'ADMIN', 1),
(2, 'student1', 'student1@gmail.com', '$2a$10$GflWaMQ7N9M7srFllbJMvuCPFEEIHVCOoN7TWirN9YM', 'STUDENT', 1),
(3, 'lecturer1', 'lecturer1@gmail.com', '$2a$10$Nd1fSbD4z59H8j4YP3Y6WOe.FVp/ncq7.V..px.K53Y', 'LECTURER', 1),
(4, 'Avinash_Jain', 'avinashjain@gmail.com', '$2a$10$/ttfYvdnmR9ooVebDjArauqoftEgd3roisp3G464.DV', 'LECTURER', 1),
(5, 'Mark_Lassoff', 'marklassoff@gmail.com', '$2a$10$aelFfre4osCBkjG0DwnObOABSOsE6WXYFdOn3ZN6gds', 'LECTURER', 1),
(6, 'Stone_River_eLearning', 'stoneriverelearning@gmail.com', '$2a$10$RAfIuKUvntvprxN0FXnIg.D.IIjltb.F2q1QgLce4hD', 'LECTURER', 1),
(7, 'student2', 'student2@gmail.com', '$2a$10$bkcbwGXh5wWt6P2APPJlC.DCDKekvwzLnRjg02pbHHP', 'STUDENT', 1),
(8, 'John_Purcell', 'johnpurcell@gmail.com', '$2a$10$ziiw276RUdy0gY82BdSG4e5FpTmgGJeR88A/ENxhIS0', 'LECTURER', 1);

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
ALTER TABLE `courses` ADD FULLTEXT KEY `name` (`name`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
