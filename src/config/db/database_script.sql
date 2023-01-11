-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 11, 2023 at 08:22 PM
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
(2, 'Web Development', 1, '2.png', 'web-development'),
(3, 'Data Science', 1, '3.png', 'data-science'),
(4, 'Art & Craft', NULL, NULL, 'art--craft'),
(5, 'Drawing', 4, '5.png', 'drawing'),
(6, 'Office Productivity', NULL, NULL, 'office-productivity'),
(7, 'Microsoft', 6, '7.png', 'microsoft'),
(8, 'Google', 6, '8.png', 'google'),
(9, 'Mobile Development', 1, '9.png', 'mobile-development'),
(10, 'Programming Languages', 1, '10.png', 'programming-languages'),
(11, 'Design', NULL, NULL, 'design'),
(12, 'Graphic Design', 11, '12.png', 'graphic-design'),
(13, 'User Experience Design', 11, '13.png', 'user-experience-design'),
(14, 'Colored Pencil Drawing', 4, 'uploadCourseBannerInput_1673329087667.jpg', 'colored-pencil-drawing');

-- --------------------------------------------------------

--
-- Table structure for table `chapters`
--

CREATE TABLE `chapters` (
  `id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `chapters`
--

INSERT INTO `chapters` (`id`, `course_id`, `title`) VALUES
(9, 2, 'Giới thiệu'),
(10, 20, 'Bắt đầu'),
(11, 20, 'Kiến thức cốt lõi'),
(12, 20, 'Xây dựng website'),
(13, 57, 'Chapter 1'),
(14, 57, 'CHAPTER 2'),
(15, 57, 'CHApter 3'),
(18, 3, 'Chapter 1');

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
  `is_featured` tinyint(1) DEFAULT NULL,
  `featured_banner_filename` varchar(100) DEFAULT NULL,
  `is_completed` tinyint(1) NOT NULL,
  `short_description` varchar(100) NOT NULL,
  `detail_description` varchar(2000) NOT NULL,
  `syllabus` varchar(5000) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `slug` varchar(100) NOT NULL,
  `is_activated` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `name`, `lecturer_id`, `banner_filename`, `category_id`, `price`, `sale_id`, `is_featured`, `featured_banner_filename`, `is_completed`, `short_description`, `detail_description`, `syllabus`, `created_at`, `updated_at`, `slug`, `is_activated`) VALUES
(1, 'HTML CSS từ Zero đến Hero', 3, '1.png', 2, 0, NULL, 1, 'html-css-tu-zero-den-hero.png', 0, 'Trong khóa này chúng ta sẽ cùng nhau xây dựng giao diện 2 trang web là The Band & Shopee.', 'Html and css from zero to hero', '1.Html\n2.Css', '2023-01-04 17:12:17', '2023-01-04 17:12:17', 'html-css-từ-zero-đến-hero-1', 1),
(2, 'Lập Trình JavaScript Cơ Bản', 3, '2.png', 2, 0, NULL, 1, 'lap-trinh-javascript-co-ban.png', 0, '<p>Học Javascript cơ bản ph&ugrave; hợp cho người chưa từng học lập tr&igrave;nh. Với hơn 100 b&amp;', '<h2 class=\"CourseDetail_topicHeading__xbkxm\">Bạn sẽ học được g&igrave;?</h2>\r\n<section class=\"index-module_row__-AHgh\">\r\n<section class=\"index-module_col__2EQm9 index-module_c-12__u7UXF index-module_m-12__2CxUL index-module_l-12__340Ve\">\r\n<ul class=\"CourseDetail_list__pdfCp undefined\">\r\n<li>Hiểu chi tiết về c&aacute;c kh&aacute;i niệm cơ bản trong JS</li>\r\n<li>X&acirc;y dựng được website đầu ti&ecirc;n kết hợp với JS</li>\r\n<li>Tự tin khi phỏng vấn với kiến thức vững chắc</li>\r\n<li>C&oacute; nền tảng để học c&aacute;c thư viện v&agrave; framework JS</li>\r\n<li>Nắm chắc c&aacute;c t&iacute;nh năng trong phi&ecirc;n bản ES6</li>\r\n<li>Th&agrave;nh thạo DOM APIs để tương t&aacute;c với trang web</li>\r\n<li>Ghi nhớ c&aacute;c kh&aacute;i niệm nhờ b&agrave;i tập trắc nghiệm</li>\r\n<li>N&acirc;ng cao tư duy với c&aacute;c b&agrave;i kiểm tra với testcases</li>\r\n<li>C&aacute;c b&agrave;i thực h&agrave;nh như Tabs, Music Player</li>\r\n<li>Nhận chứng chỉ kh&oacute;a học do F8 cấp</li>\r\n</ul>\r\n</section>\r\n</section>', '<p>1.Javascript</p>', '2022-08-03 00:00:00', '2023-01-04 17:12:17', 'lập-trình-javascript-cơ-bản-2', 1),
(3, 'Learn Python: The Complete Python Programming Course', 4, '3.png', 3, 999000, 1, 1, 'learn-python-the-complete-python-programming-course-1.png', 0, '<p>Learn A-Z everything about Python, from the basics, to advanced topics like Python GUI, Python Da', '<h2 class=\"ud-heading-xl styles--description__header--2Z7Vb\" data-purpose=\"description-title\">Description</h2>\r\n<div class=\"show-more--container--1bpj2\">\r\n<div class=\"show-more--content--3WBXb show-more--with-gradient--qNzPb\">\r\n<div tabindex=\"0\">\r\n<div data-purpose=\"safely-set-inner-html:description:description\">\r\n<p><strong>Do you want to become a programmer? Do you want to learn how to create games, automate your browser, visualize data, and much more?</strong></p>\r\n<p>If you&rsquo;re looking to learn Python for the very&nbsp;<strong>first time</strong>&nbsp;or need a&nbsp;<strong>quick brush-up</strong>, this is the course for you!</p>\r\n<p>Python has rapidly become one of the&nbsp;<strong>most popular programming languages&nbsp;</strong>around the world. Compared to other languages such as Java or C++, Python consistently outranks and outperforms these languages in demand from businesses and job availability. The average Python developer makes&nbsp;<strong>over $100,000&nbsp;</strong>- this number is only going to grow in the coming years.</p>\r\n<p>The best part? Python is one of the&nbsp;<strong>easiest coding languages&nbsp;</strong>to learn right now. It doesn&rsquo;t matter if you have no programming experience or are unfamiliar with the syntax of Python. By the time you finish this course, you\'ll be an&nbsp;<strong>absolute pro</strong>&nbsp;at programming!</p>\r\n<p>This course will cover&nbsp;<strong>all the basics</strong>&nbsp;and&nbsp;<strong>several advanced concepts</strong>&nbsp;of Python. We&rsquo;ll go over:</p>\r\n<ul>\r\n<li>\r\n<p>The fundamentals of Python programming</p>\r\n</li>\r\n<li>\r\n<p>Writing and Reading to Files</p>\r\n</li>\r\n<li>\r\n<p>Automation of Word and Excel Files</p>\r\n</li>\r\n<li>\r\n<p>Web scraping with BeautifulSoup4</p>\r\n</li>\r\n<li>\r\n<p>Browser automation with Selenium</p>\r\n</li>\r\n<li>\r\n<p>Data Analysis and Visualization with MatPlotLib</p>\r\n</li>\r\n<li>\r\n<p>Regex parsing and Task Management</p>\r\n</li>\r\n<li>\r\n<p>GUI and Gaming with Tkinter</p>\r\n', '<ol>\r\n<li>&nbsp;Up and running with Python</li>\r\n<li>The basic (data type)</li>\r\n</ol>', '2022-11-25 00:00:00', '2023-01-04 17:12:17', 'learn-python-the-complete-python-programming-course-2', 1),
(4, 'Become a Certified HTML, CSS, JavaScript Web Developer', 5, '4.png', 2, 1990000, 1, NULL, NULL, 0, 'Complete coverage of HTML, CSS, Javascript while you Earn Four Respected Certifications', 'Prepare for Industry Certification Exam\nEarn Certification that is Proof of your Competence\nHours and Hours of Video Instruction\nDozens of Code Examples to Download and Study\nOver 25 Engaging Lab Exercises\nAll Lab Solutions\nInstructor Available by Email or on the Forums\nAll Free Tools\nComprehensive Coverage of HTML and CSS\nClient Side Programming with Javascript\nServer Side Development with PHP\nLearn Database Development with mySQL', '', '2022-12-05 00:00:00', '2022-12-24 00:00:00', 'become-a-certified-html-css-javascript-web-developer-1', 1),
(5, 'Google Sheets Fundamentals', 5, '5.png', 8, 199000, NULL, NULL, NULL, 0, 'Master Google\'s Spreadsheet Program', 'Competently navigate the Google Sheets Interface and successfully enter data\nFormat spreadsheets so that they are both readable and attractive\nCreate formulas and use built-in Spreadsheet functions\nManage spreadsheet data and apply filters and sorts\nOutput, Use Collaboration Tools and Export Spreadsheets', '', '2021-06-15 00:00:00', '2021-10-24 00:00:00', 'google-sheets-fundamentals-1', 1),
(6, 'JavaScript 2019: JavaScript ES6 Certification Course', 5, '6.png', 2, 249000, 2, NULL, NULL, 0, 'Earn the JavaScript Specialist Certification while Learning JavaScript ES6', 'JavaScript syntax, style and usage with a focus on developing apps\nBe Current with ES6 Syntax and Usage\nFundamental to Advanced JavaScript Concepts including Promises, Classes, and Arrow Functions\nIntegration of JavaScript with HTML5 Code for Web Applications', '', '2020-06-25 00:00:00', '2020-10-24 00:00:00', 'javascript-2019-javascript-es6-certification-course-1', 1),
(7, 'Responsive Design for Web Designers', 5, '7.png', 2, 199000, NULL, NULL, NULL, 0, 'Learn How to Create Flexible Designs for a Multi-Screen World', 'Identify the four elements of responsive Design\nUnderstand and use a mobile-first design approach\nUnderstand how and why to design with fluid content grids\nUnderstand how content scale impacts responsive design\nExecute cross-device preview and testing to ensure designs work on different sized screens\nUtilize the meta tags required in code for responsive design\nWork with the <picture> tag to create responsive images\nCreate media queries that alter designs for multiple size screens', '', '2021-06-25 00:00:00', '2021-11-24 00:00:00', 'responsive-design-for-web-designers-1', 1),
(8, 'Build Android Apps with App Inventor 2 - No Coding Required', 6, '8.png', 9, 199000, NULL, NULL, NULL, 0, 'Android application,App Inventor 2,Google Play Store,Basic Programming', 'Create Android Applications using App Inventor 2.\nUnderstand how to publish created applications to the Google Play Store.\nUnderstand how to update created applications once they have been published to the Google Play Store.\nNavigate and use the App Inventor 2 interface fluidly, effectively and efficiently.\nUnderstand the basics of programming.', '', '2020-07-25 00:00:00', '2020-12-14 00:00:00', 'build-android-apps-with-app-inventor-2---no-coding-required-1', 1),
(9, 'Microsoft Office 365 Administration', 6, '9.png', 7, 229000, NULL, NULL, NULL, 0, 'Microsoft Office 365 Administration', 'Setup a custom domain on on microsoft\nUnderstand the basics of the integrated applications\nCheck service health\nCheck and log service requests\nGenerate customized reports\nCreate and manage users in Microsoft Office 365\nCreate security groups\nImport users\nMigrate mail to Office 365 Outlook\nManage spam and malware', '', '2020-07-29 00:00:00', '2020-12-14 00:00:00', 'microsoft-office-365-administration-1', 1),
(10, 'Learn PHP Programming From Scratch', 6, '10.png', 10, 249000, 2, NULL, NULL, 0, 'Over 50 hours of PHP programming goodness.', 'Demonstrate understanding of PHP programming\nTo learn the basics of PHP programming\nTo learn PHP programming by working on projects\nTo learn intermediate and advanced PHP programming', '', '2021-02-12 00:00:00', '2021-05-14 00:00:00', 'learn-php-programming-from-scratch-1', 1),
(11, 'Become a Professional Graphic Designer', 6, '11.png', 12, 229000, NULL, NULL, NULL, 0, 'Learn what you need to know to break into the world of graphic design.', 'To learn what graphic design is and how to become a graphic designer\nLearn what a graphic designer does on the job\nLearn the principles of great graphic design\nLearn graphic design as it relates to Photoshop, Illustrator, InDesign and Acrobat\nLearn graphic design for the web using Dreamweaver\nLearn visual communication fundamentals\nLearn successful layout in graphic design\nLearn how to get a job as a graphic designer', '', '2020-05-22 00:00:00', '2020-09-14 00:00:00', 'become-a-professional-graphic-designer-1', 1),
(12, 'Mobile UI and UX Design', 6, '12.png', 13, 229000, NULL, NULL, NULL, 0, 'Make your mobile UI design pop and understand the mobile UX process', 'At the end of this course, students will be equipped to oversee design a mobile application\'s\nexperience and interface, through the full process which includes:\nRequirements Assessment\nDesign Project Planning\nUser Experience Recommendations\nUser Interface Design & Documentation\nDesign Implementation Guidelines & Management', '', '2017-01-22 00:00:00', '2017-02-14 00:00:00', 'mobile-ui-and-ux-design-1', 1),
(13, 'Become a Professional Web Developer | Version 3.0', 6, '13.png', 2, 199000, NULL, NULL, NULL, 0, 'Everything you need to know to become a professional web developer from scratch, updated for modern ', 'To learn every skill needed as a professional web developer/designer\nTo create real life projects for your portfolio\nTo become a professional web developer', '', '2020-02-12 00:00:00', '2020-08-14 00:00:00', 'become-a-professional-web-developer--version-30-1', 1),
(14, 'Learn Pascal Programming from Scratch', 6, '14.png', 10, 199000, 2, NULL, NULL, 0, 'Create, maintain, design, and build cross-platform native applications', 'Create, maintain, design, and build cross-platform native applications.\nYou will learn how to write the code once, compile it, and run it on multiple platforms.', '', '2016-12-31 00:00:00', '2017-02-24 00:00:00', 'learn-pascal-programming-from-scratch-1', 1),
(15, 'Java Swing (GUI) Programming: From Beginner to Expert', 8, '15.png', 10, 249000, 2, NULL, NULL, 0, 'Learn how to create desktop and Internet GUI Java programs and take your Java programming to the nex', 'Learn how to write GUI (graphical user interface) applications in Java\nUnderstand the Java Swing framework\nDiscover how to create database applications', '', '2015-06-21 00:00:00', '2015-08-14 00:00:00', 'java-swing-gui-programming-from-beginner-to-expert-1', 1),
(16, 'Learn Advanced C++ Programming', 8, '16.png', 10, 229000, NULL, NULL, NULL, 0, 'Discover intermediate to advanced C++, including C++ 11\'s fantastic additions to the C++ standard.', 'Develop complex C++ applications\nUnderstand C++ 11\nBe in a position to apply for jobs requiring good C++ knowledge', '', '2022-04-13 00:00:00', '2022-06-23 00:00:00', 'learn-advanced-c-programming-1', 1),
(17, 'Java 11 For Complete Beginners', 8, '17.png', 10, 229000, NULL, NULL, NULL, 0, 'Learn Modern Java From Scratch', 'Computer programming in Java', '', '2020-01-04 00:00:00', '2020-04-30 00:00:00', 'java-11-for-complete-beginners-1', 1),
(18, 'Responsive Với Grid System', 3, '18.png', 2, 0, NULL, NULL, NULL, 1, 'Trong khóa này chúng ta sẽ học về cách xây dựng giao diện web responsive với Grid System, tương tự B', 'Biết cách xây dựng website Responsive\nHiểu được tư tưởng thiết kế với Grid system\nTự tay xây dựng được thư viện CSS Grid\nTự hiểu được Grid layout trong bootstrap', '', '2020-11-09 00:00:00', '2021-01-12 00:00:00', 'responsive-với-grid-system-1', 1),
(19, 'Lập Trình JavaScript Nâng Cao', 3, '19.png', 2, 0, NULL, NULL, NULL, 0, 'Hiểu sâu hơn về cách Javascript hoạt động, tìm hiểu về IIFE, closure, reference types, this keyword,', 'Được học kiến thức miễn phí với nội dung chất lượng hơn mất phí\nCác kiến thức nâng cao của Javascript giúp code trở nên tối ưu hơn\nHiểu được cách tư duy nâng cao của các lập trình viên có kinh nghiệm\nHiểu được các khái niệm khó như từ khóa this, phương thức bind, call, apply & xử lý bất đồng bộ\nCó nền tảng Javascript vững chắc để làm việc với mọi thư viện, framework viết bởi Javascript\nNâng cao cơ hội thành công khi phỏng vấn xin việc nhờ kiến thức chuyên môn vững chắc', '', '2023-01-04 17:12:17', '2023-01-04 17:12:17', 'lập-trình-javascript-nâng-cao-1', 1),
(20, 'Node & ExpressJS', 3, '20.png', 2, 0, NULL, NULL, NULL, 0, '<p>Học Back-end với Node &amp; ExpressJS framework, hiểu c&aacute;c kh&aacute;i niệm khi l&agrave;m&', '<p>Nắm chắc l&yacute; thuyết chung trong việc x&acirc;y dựng web Biết c&aacute;ch l&agrave;m việc với Mongoose, MongoDB trong NodeJS X&acirc;y dựng web với Express bằng kiến thức thực tế Biết c&aacute;ch x&acirc;y dựng API theo chuẩn RESTful API Nắm chắc l&yacute; thuyết về API v&agrave; RESTful API Được chia sẻ lại kinh nghiệm l&agrave;m việc thực tế Nắm chắc kh&aacute;i niệm về giao thức HTTP Hiểu r&otilde; tư tưởng v&agrave; c&aacute;ch hoạt động của m&ocirc; h&igrave;nh MVC Học được c&aacute;ch tổ chức code trong thực tế Biết c&aacute;ch deploy (triển khai) website l&ecirc;n internet</p>', '<ol>\r\n<li>Bắt đầu</li>\r\n<li>Kiến thức cốt l&otilde;i&nbsp;</li>\r\n<li>X&acirc;y dựng website</li>\r\n</ol>', '2023-01-04 17:12:17', '2023-01-04 17:12:17', 'node--expressjs-2-1', 1),
(49, 'Kiến Thức Nhập Môn IT', 3, 'uploadCourseBannerInput_1673161373004.png', 2, 0, NULL, NULL, NULL, 0, '<p>Để c&oacute; c&aacute;i nh&igrave;n tổng quan về ng&agrave;nh IT - Lập tr&igrave;nh web c&aacute;', '<h2 class=\"CourseDetail_topicHeading__xbkxm\">Bạn sẽ học được g&igrave;?</h2>\r\n<section class=\"index-module_row__-AHgh\">\r\n<section class=\"index-module_col__2EQm9 index-module_c-12__u7UXF index-module_m-12__2CxUL index-module_l-12__340Ve\">\r\n<ul class=\"CourseDetail_list__pdfCp undefined\">\r\n<li>C&aacute;c kiến thức cơ bản, nền m&oacute;ng của ng&agrave;nh IT</li>\r\n<li>C&aacute;c m&ocirc; h&igrave;nh, kiến tr&uacute;c cơ bản khi triển khai ứng dụng</li>\r\n<li>C&aacute;c kh&aacute;i niệm, thuật ngữ cốt l&otilde;i khi triển khai ứng dụng</li>\r\n<li>Hiểu hơn về c&aacute;ch internet v&agrave; m&aacute;y vi t&iacute;nh hoạt động</li>\r\n</ul>\r\n</section>\r\n</section>', '<h2 class=\"CurriculumOfCourse_floatLeft__zxBeB\">Nội dung kh&oacute;a học</h2>\r\n<ol>\r\n<li>\r\n<h3>Kh&aacute;i niệm kĩ thuật cần biết</h3>\r\n<ol>\r\n<li>M&ocirc; h&igrave;nh Client - Server l&agrave; g&igrave;?</li>\r\n<li>Domain l&agrave; g&igrave;? T&ecirc;n miền l&agrave; g&igrave;?</li>\r\n</ol>\r\n</li>\r\n<li>\r\n<h3>M&ocirc;i trường, con người IT</h3>\r\n<ol>\r\n<li>Học IT cần tố chất g&igrave;? G&oacute;c nh&igrave;n kh&aacute;c từ chuy&ecirc;n gia định hướng gi&aacute;o dục.</li>\r\n<li>Sinh vi&ecirc;n IT đi thực tập tại doanh nghiệp cần biết những g&igrave;?</li>\r\n<li>Trải nghiệm thực tế sau 2 th&aacute;ng l&agrave;m việc tại doanh nghiệp của học vi&ecirc;n F8?</li>\r\n</ol>\r\n</li>\r\n<li>\r\n<h3>Phương ph&aacute;p, định hướng?</h3>\r\n<ol>\r\n<li>Phương ph&aacute;p học lập tr&igrave;nh của Admin F8?</li>\r\n<li>L&agrave;m sao để c&oacute; thu nhập cao v&agrave; đi xa hơn trong ng&agrave;nh IT?</li>\r\n<li>\r\n<div class=\"CurriculumOfCourse_lessonName__llwRr\">9. 8 lời khuy&ecirc;n gi&uacute;p học lập tr&igrave;nh tại F8 hiệu quả hơn!</div>\r\n</li>\r\n</ol>\r\n</li>\r\n<li>\r\n<h3>Ho&agrave;n th&agrave;nh kh&oacute;a học.</h3>\r\n</li>\r\n</ol>', '2023-01-08 14:02:53', '2023-01-08 14:02:53', 'kiến-thức-nhập-môn-it-1', 1),
(50, 'Xây Dựng Website với ReactJS', 3, 'uploadCourseBannerInput_1673163311037.png', 2, 0, NULL, NULL, NULL, 0, '<p>Kh&oacute;a học ReactJS từ cơ bản tới n&acirc;ng cao, kết quả của kh&oacute;a học n&agrave;y l&ag', '<h2 class=\"CourseDetail_topicHeading__xbkxm\">Bạn sẽ học được g&igrave;?</h2>\r\n<section class=\"index-module_row__-AHgh\">\r\n<section class=\"index-module_col__2EQm9 index-module_c-12__u7UXF index-module_m-12__2CxUL index-module_l-12__340Ve\">\r\n<ul class=\"CourseDetail_list__pdfCp undefined\">\r\n<li>Hiểu về kh&aacute;i niệm SPA/MPA</li>\r\n<li>Hiểu về kh&aacute;i niệm hooks</li>\r\n<li>Hiểu c&aacute;ch ReactJS hoạt động</li>\r\n<li>Hiểu về function/class component</li>\r\n<li>Biết c&aacute;ch tối ưu hiệu năng ứng dụng</li>\r\n<li>Th&agrave;nh thạo l&agrave;m việc với RESTful API</li>\r\n<li>Hiểu r&otilde; r&agrave;ng Redux workflow</li>\r\n<li>Th&agrave;nh thạo sử dụng Redux v&agrave;o dự &aacute;n</li>\r\n<li>Biết sử dụng redux-thunk middleware</li>\r\n<li>X&acirc;y dựng sản phẩm thực tế (clone Tiktok)</li>\r\n<li>Triển khai dự &aacute;n React ra Internet</li>\r\n<li>Đủ h&agrave;nh trang tự tin apply đi xin việc</li>\r\n<li>Biết c&aacute;ch Deploy l&ecirc;n Github/Gitlab page</li>\r\n<li>Nhận chứng chỉ kh&oacute;a học do F8 cấp</li>\r\n</ul>\r\n</section>\r\n</section>', '<h2 class=\"CurriculumOfCourse_floatLeft__zxBeB\">Nội dung kh&oacute;a học</h2>\r\n<ol>\r\n<li>\r\n<h3>Giới thiệu</h3>\r\n<ol>\r\n<li>ReactJS l&agrave; g&igrave;? Tại sao n&ecirc;n học ReactJS?</li>\r\n<li>SPA/MPA l&agrave; g&igrave;?</li>\r\n<li>Ưu điểm của SPA</li>\r\n</ol>\r\n</li>\r\n<li>\r\n<h3>&Ocirc;n lại ES6+</h3>\r\n</li>\r\n</ol>', '2023-01-08 14:35:11', '2023-01-08 14:35:11', 'xây-dựng-website-với-reactjs-1', 1),
(51, 'Learn Python: The Complete Python Automation Course!', 4, 'uploadCourseBannerInput_1673326006365.jpg', 10, 1699000, NULL, NULL, NULL, 0, '<p>Learn all about Python Automation from Web Scraping and Browser Automation to Excel, Word and GUI', '<h2 class=\"ud-heading-xl what-you-will-learn--title--2ztwE\">What you\'ll learn</h2>\r\n<div class=\"what-you-will-learn--content-spacing--3n5NU\">\r\n<ul class=\"ud-unstyled-list ud-block-list what-you-will-learn--objectives-list--eiLce what-you-will-learn--objectives-list-two-column-layout--rZLJy\">\r\n<li>\r\n<div class=\"ud-block-list-item ud-block-list-item-small ud-block-list-item-tight ud-block-list-item-neutral ud-text-sm\" data-purpose=\"objective\">\r\n<div class=\"ud-block-list-item-content\"><span class=\"what-you-will-learn--objective-item--3b4zX\">Gain a complete understanding of Python 3</span></div>\r\n</div>\r\n</li>\r\n<li>\r\n<div class=\"ud-block-list-item ud-block-list-item-small ud-block-list-item-tight ud-block-list-item-neutral ud-text-sm\" data-purpose=\"objective\">\r\n<div class=\"ud-block-list-item-content\"><span class=\"what-you-will-learn--objective-item--3b4zX\">Write programs that can recognize patterns of text through \"regular expressions\"</span></div>\r\n</div>\r\n</li>\r\n<li>\r\n<div class=\"ud-block-list-item ud-block-list-item-small ud-block-list-item-tight ud-block-list-item-neutral ud-text-sm\" data-purpose=\"objective\">\r\n<div class=\"ud-block-list-item-content\"><span class=\"what-you-will-learn--objective-item--3b4zX\">Create, Read and Write to Files on their System</span></div>\r\n</div>\r\n</li>\r\n<li>\r\n<div class=\"ud-block-list-item ud-block-list-item-small ud-block-list-item-tight ud-block-list-item-neutral ud-text-sm\" data-purpose=\"objective\">\r\n<div class=\"ud-block-list-item-content\"><span class=\"what-you-will-learn--objective-item--3b4zX\">Completely understand how to debug their Python code utilizing assertions and logging</span></div>\r\n</div>\r\n</li>\r\n<li>\r\n<div class=\"ud-block-list-item ud-block-list-item-small ud-block-list-item-tight ud-block-list-item-neutral ud-text-sm\" data-purpose=\"objective\">\r\n<div class=\"ud-block-list-item-content\"><span class=\"what-you-will-learn--objective-item--3b4zX\">Crawl websites for data and pull information through BeautifulSoup</span></div>\r\n</', '<ol>\r\n<li>Welcome</li>\r\n<li>Introduction to Python Programming</li>\r\n</ol>', '2023-01-10 11:46:46', '2023-01-10 11:46:46', 'learn-python-the-complete-python-automation-course-1', 1),
(52, 'The Complete Python Programming Bootcamp', 4, 'uploadCourseBannerInput_1673326679371.jpg', 10, 1699000, NULL, NULL, NULL, 0, '<p>Learn everything about Python from the Basics to File and Browser Automation, Python GUI, Data An', '<h2 class=\"ud-heading-xl what-you-will-learn--title--2ztwE\">What you\'ll learn</h2>\r\n<div class=\"what-you-will-learn--content-spacing--3n5NU\">\r\n<ul class=\"ud-unstyled-list ud-block-list what-you-will-learn--objectives-list--eiLce what-you-will-learn--objectives-list-two-column-layout--rZLJy\">\r\n<li>\r\n<div class=\"ud-block-list-item ud-block-list-item-small ud-block-list-item-tight ud-block-list-item-neutral ud-text-sm\" data-purpose=\"objective\">\r\n<div class=\"ud-block-list-item-content\"><span class=\"what-you-will-learn--objective-item--3b4zX\">Gain a complete understanding of Python 3</span></div>\r\n</div>\r\n</li>\r\n<li>\r\n<div class=\"ud-block-list-item ud-block-list-item-small ud-block-list-item-tight ud-block-list-item-neutral ud-text-sm\" data-purpose=\"objective\">\r\n<div class=\"ud-block-list-item-content\"><span class=\"what-you-will-learn--objective-item--3b4zX\">Write programs that can recognize patterns of text through \"regular expressions\"</span></div>\r\n</div>\r\n</li>\r\n<li>\r\n<div class=\"ud-block-list-item ud-block-list-item-small ud-block-list-item-tight ud-block-list-item-neutral ud-text-sm\" data-purpose=\"objective\">\r\n<div class=\"ud-block-list-item-content\"><span class=\"what-you-will-learn--objective-item--3b4zX\">Create, Read and Write to Files on their System</span></div>\r\n</div>\r\n</li>\r\n<li>\r\n<div class=\"ud-block-list-item ud-block-list-item-small ud-block-list-item-tight ud-block-list-item-neutral ud-text-sm\" data-purpose=\"objective\">\r\n<div class=\"ud-block-list-item-content\"><span class=\"what-you-will-learn--objective-item--3b4zX\">Crawl websites for data and pull information through BeautifulSoup</span></div>\r\n</div>\r\n</li>\r\n<li>\r\n<div class=\"ud-block-list-item ud-block-list-item-small ud-block-list-item-tight ud-block-list-item-neutral ud-text-sm\" data-purpose=\"objective\">\r\n<div class=\"ud-block-list-item-content\"><span class=\"what-you-will-learn--objective-item--3b4zX\">Automate their web browsers with Selenium and run their own scripts</span></div>\r\n</div>\r\n</li>\r\n<li>\r', '<ol>\r\n<li>Welcome to the course</li>\r\n<li>Introduction to python programming</li>\r\n</ol>', '2023-01-10 11:57:59', '2023-01-10 11:57:59', 'the-complete-python-programming-bootcamp-1', 1),
(53, 'The Complete iOS 11 Development Course: Swift 4 and Xcode 9', 4, 'uploadCourseBannerInput_1673327413226.jpg', 9, 1999000, NULL, NULL, NULL, 0, '<p>Learn A-Z everything about iOS Development and Swift 4 by making 7 complete applications from scr', '<h2 class=\"ud-heading-xl what-you-will-learn--title--2ztwE\">What you\'ll learn</h2>\r\n<div class=\"what-you-will-learn--content-spacing--3n5NU\">\r\n<ul class=\"ud-unstyled-list ud-block-list what-you-will-learn--objectives-list--eiLce what-you-will-learn--objectives-list-two-column-layout--rZLJy\">\r\n<li>\r\n<div class=\"ud-block-list-item ud-block-list-item-small ud-block-list-item-tight ud-block-list-item-neutral ud-text-sm\" data-purpose=\"objective\">\r\n<div class=\"ud-block-list-item-content\"><span class=\"what-you-will-learn--objective-item--3b4zX\">Write their own swift programs</span></div>\r\n</div>\r\n</li>\r\n</ul>\r\n</div>', '<ol>\r\n<li>Introduction</li>\r\n<li>Swift 4 Bootcamp</li>\r\n</ol>', '2023-01-10 12:10:13', '2023-01-10 12:10:13', 'the-complete-ios-11-development-course-swift-4-and-xcode-9-1', 1),
(54, 'Simple And Easy: Wordpress For Beginners', 4, 'uploadCourseBannerInput_1673327644568.jpg', 2, 0, NULL, NULL, NULL, 0, '<p>Learn Wordpress 101 by creating a Fantastic Wordpress Website with no Coding Experience required!', '<h2 class=\"ud-heading-xl styles--description__header--2Z7Vb\" data-purpose=\"description-title\">Description</h2>\r\n<div class=\"show-more--container--1bpj2\">\r\n<div class=\"show-more--content--3WBXb show-more--with-gradient--qNzPb\">\r\n<div tabindex=\"0\">\r\n<div data-purpose=\"safely-set-inner-html:description:description\">\r\n<p><strong>Do you want to create a Website? Confused on online programming tutorials, and want a simple and easy way to do so?</strong></p>\r\n<p>Well then, you\'re in the right place :)</p>\r\n<p>Simple And Easy: Wordpress 101 will take you from a complete beginners of Wordpress to you creating your own Wordpress Websites. We\'ll cover everything from domains and web hosting, to downloading and installing our Wordpress theme.</p>\r\n<p>After that, we\'ll go through how to use the theme, and create our responsive website. Sections such as Testimonials, Team, Clients, Blog, etc. will be added and it will be a complete Website. I\'ll even show you how to add a Contact Form, Integrate the site with MailChimp for sign ups, and more!</p>\r\n<p>If you want a quick and easy way to create a Website, then this course is for you!</p>\r\n<p>Why are you still reading this summary? Go buy the course now, and dive into the World of Wordpress! :)</p>\r\n</div>\r\n<div class=\"styles--audience--2xuzW\" data-purpose=\"target-audience\">\r\n<h2 class=\"ud-heading-xl styles--audience__title--1qhlO\">Who this course is for:</h2>\r\n<ul class=\"styles--audience__list--16EaN\">\r\n<li>Meant for Wordpress Beginners with no prior experience</li>\r\n<li>Anyone looking to create a website with no programming experience.</li>\r\n</ul>\r\n</div>\r\n</div>\r\n</div>\r\n</div>', '<ol>\r\n<li>Getting started</li>\r\n<li>Getting into themes</li>\r\n</ol>', '2023-01-10 12:14:04', '2023-01-10 12:14:04', 'simple-and-easy-wordpress-for-beginners-1-2', 1),
(55, 'A Beginners Guide to Django!', 4, 'uploadCourseBannerInput_1673327861510.jpg', 10, 0, NULL, NULL, NULL, 0, '<p>Learn all the basics of Django through a step-by-step process by creating your very own Polls App', '<h2 class=\"ud-heading-xl styles--description__header--2Z7Vb\" data-purpose=\"description-title\">Description</h2>\r\n<div class=\"show-more--container--1bpj2\">\r\n<div class=\"show-more--content--3WBXb show-more--with-gradient--qNzPb\">\r\n<div tabindex=\"0\">\r\n<div data-purpose=\"safely-set-inner-html:description:description\">\r\n<p>Have you ever wanted to create an app like Instagram? Maybe even Pinterest? Did you know that they were created through Django? I thought so :)</p>\r\n<p>If you want to learn Django, you\'re in the right place! We\'ll cover everything there is in Django, from our directory and apps, to creating and populating our database. You\'ll learn how to use URL\'s, templates, and add CSS + Bootstrap to your app!</p>\r\n<p>The best part? It\'s absolutely free!</p>\r\n<p>So what are you waiting for? Whip out your laptop, take a seat, and start developing Django today!</p>\r\n</div>\r\n<div class=\"styles--audience--2xuzW\" data-purpose=\"target-audience\">\r\n<h2 class=\"ud-heading-xl styles--audience__title--1qhlO\">Who this course is for:</h2>\r\n<ul class=\"styles--audience__list--16EaN\">\r\n<li>Anyone who\'s interested in learning Django!</li>\r\n</ul>\r\n</div>\r\n</div>\r\n</div>\r\n</div>', '<ol>\r\n<li>Welcome</li>\r\n<li>Getting started</li>\r\n<li>Forming our datbase</li>\r\n</ol>', '2023-01-10 12:17:41', '2023-01-10 12:17:41', 'a-beginners-guide-to-django-1', 1),
(56, 'The Secrets to Drawing', 18, 'uploadCourseBannerInput_1673328536850.jpg', 5, 1699000, NULL, NULL, NULL, 0, '<p>A comprehensive video and ebook course designed for people wanting to learn the core concepts of&', '<h2 class=\"ud-heading-xl styles--description__header--2Z7Vb\" data-purpose=\"description-title\">Description</h2>\r\n<div class=\"show-more--container--1bpj2\">\r\n<div class=\"show-more--content--3WBXb show-more--with-gradient--qNzPb\">\r\n<div tabindex=\"0\">\r\n<div data-purpose=\"safely-set-inner-html:description:description\">\r\n<p>Drawing is a skill that is learned and developed and this video course is designed to give you the knowledge that you need to draw better almost immediately! Anyone can learn how to draw. Each aspect of drawing is broken down into &ldquo;easy to follow\" and &ldquo;easy to understand\" segments complete with drawing demonstrations and commentary. All lessons are presented in High Definition! There are a total of 28 HD videos with over 500 minutes of drawing instruction. The course also includes 26 ebooks that combine for 178 pages with 498 color illustrations.</p>\r\n<h2 class=\"ud-heading-xl styles--audience__title--1qhlO\">Who this course is for:</h2>\r\n<ul class=\"styles--audience__list--16EaN\">\r\n<li>This course is designed for anyone looking to improve their drawing skills</li>\r\n</ul>\r\n</div>\r\n</div>\r\n</div>\r\n</div>', '<ul>\r\n<li><strong>Video 1</strong>&nbsp;&ndash; &ldquo;Introduction\"- An introduction to &ldquo;The Secrets to Drawing\" video series.</li>\r\n</ul>\r\n<ul>\r\n<li><strong>Video 2</strong>&nbsp;&ndash; &ldquo;Line\" &ndash; A look at the element of art, line and its relationship to drawing. Concepts covered include contour, blind contour, line quality, and cross contour lines.</li>\r\n</ul>\r\n<ul>\r\n<li><strong>Video 3</strong>&nbsp;&ndash; &ldquo;Shape\" &ndash; A look at how shapes can be used to draw anything. Concepts covered include geometric and organic shapes, using shapes to draw objects.</li>\r\n</ul>\r\n<ul>\r\n<li><strong>Video 4</strong>&nbsp;&ndash; &ldquo;Form\" &ndash; A look at how to create the illusion of form on a 2-Dimensional surface. Concepts covered include turning shapes into forms, using shadow to further the illusion.</li>\r\n</ul>\r\n<ul>\r\n<li><strong>Video 5</strong>&nbsp;&ndash; &ldquo;Value\" &ndash; This video takes a look at the element of art, value and its relationship with drawing. Concepts explored include tints, shades, highlights and shadows, and creating the illusion of a light source.</li>\r\n</ul>\r\n<ul>\r\n<li><strong>Video 6</strong>&nbsp;&ndash; &ldquo;Space\" &ndash; This video takes a look at how to create the illusion of space on a 2-Dimensional surface. Concepts covered include overlapping, size, value/color, detail, placement on the paper, and linear perspective.</li>\r\n</ul>\r\n<ul>\r\n<li><strong>Video 7</strong>&nbsp;&ndash; &ldquo;One Point Perspective\" &ndash; Space is explored further in this video through one point perspective. Concepts covered include horizon line, vanishing point, one point perspective.</li>\r\n</ul>\r\n<ul>\r\n<li><strong>Video 8</strong>&nbsp;&ndash; &ldquo;Two Point Perspective\" &ndash; A look at how to use two point perspective to create the illusion of space in a drawing. Concepts covered include horizon line, vanishing points, two point perspective.</li>\r\n</ul>\r\n<ul>\r\n<li><strong>Video 9</strong>&nbsp;&ndash; &ldquo;Three Point Perspective\" &ndash; A look at creating the illusion of space through three point perspective. Concepts covered include vanishing points, horizon line, steps to three point perspective.</li>\r\n</ul>\r\n<ul>\r\n<li><strong>Video 10</strong>&nbsp;&ndash; &ldquo;Drawing Techniques\" &ndash; A look at basic drawing techniques and suggested media. Concepts covered include medium, hatching, cross hatching, blending, rendering, random lines, and stippling.</li>\r\n</ul>\r\n<ul>\r\n<li><strong>Video 11</strong>&nbsp;&ndash; &ldquo;Drawing from Life\" &ndash; Tips on drawing from life. Concepts covered include still life lighting, using a view finder, and sighting techniques.</li>\r\n</ul>\r\n<ul>\r\n<li><strong>Video 12</strong>&nbsp;&ndash; &ldquo;Drawing from Photos\" &ndash; How to draw realistic drawings from photographs. Concepts covered include cropping photos, editing photos, creating a grid, drawing with the aid of the the grid.</li>\r\n</ul>\r\n<ul>\r\n<li><strong>Video 13</strong>&nbsp;&ndash; &ldquo;Composition\" &ndash; How to create successful compositions in drawings. Concepts covered include sketching thumbnails, positive and negative space, Plato\'s Rule, The Rule of Thirds, The Golden Mean, eye movement, and how to create focal points.</li>\r\n</ul>\r\n<ul>\r\n<li><strong>Video 14</strong>&nbsp;&ndash; &ldquo;Graphite\" &ndash; A description and characteristics of the drawing medium, graphite. Concepts explored include graphite grades, characteristics, forms, and techniques.</li>\r\n</ul>\r\n<ul>\r\n<li><strong>Video 15</strong>&nbsp;&ndash; &ldquo;Charcoal\" &ndash; A look at the drawing medium, charcoal. Concepts covered include charcoal forms and applications.</li>\r\n</ul>\r\n<ul>\r\n<li><strong>Video 16</strong>&nbsp;&ndash; &ldquo;Drawing with Ink\" &ndash; An exploration of the drawing medium of ink. Concepts covered include ink wash, choosing the right ink, pen and ink applications with a nib pen.</li>\r\n</ul>\r\n<ul>\r\n<li><strong>Video 17</strong>&nbsp;&ndash; &ldquo;Color\" &ndash; A look at the three parts of color theory and how it influences color choices in our drawings. Concepts covered include: the color wheel, primary, secondary, tertiary, color values, color intensity, psychological effects of color, color schemes, monochromatic, complementary, color triads, color tetrads, analogous, warm, cool, split complementary.</li>\r\n</ul>\r\n<ul>\r\n<li><strong>Video 18</strong>&nbsp;&ndash; &ldquo;Colored Pencils\" &ndash; How to use colored pencils. Concepts covered include layering, mixing, building up colors, burnishing, and adding details.</li>\r\n</ul>\r\n<ul>\r\n<li><strong>Video 19</strong>&nbsp;&ndash; &ldquo;Oil Pastels\" &ndash; An exploration into the drawing medium of oil pastels. Concepts covered include layering, mixing, and landscape drawing with oil pastels.</li>\r\n</ul>\r\n<ul>\r\n<li><strong>Video 20</strong>&nbsp;&ndash; &ldquo;Soft Pastels\" &ndash; An in-depth look at the use of soft pastels in the creation of a seascape. Concepts covered include proper use of soft pastels incl', '2023-01-10 12:28:56', '2023-01-10 12:28:56', 'the-secrets-to-drawing-3-1', 1),
(57, 'The Colored Pencil Drawing Course', 18, 'uploadCourseBannerInput_1673329260980.jpg', 14, 1899000, NULL, NULL, NULL, 0, '<p>Draw Like a Pro With Colored Pencils</p>', '<h2 class=\"ud-heading-xl styles--description__header--2Z7Vb\" data-purpose=\"description-title\">Description</h2>\r\n<div class=\"show-more--container--1bpj2\">\r\n<div class=\"show-more--content--3WBXb show-more--with-gradient--qNzPb\">\r\n<div tabindex=\"0\">\r\n<div data-purpose=\"safely-set-inner-html:description:description\">\r\n<p>The Colored Pencil Course is a comprehensive learning experience designed to guide absolute beginners and intermediate artists to a level of producing professional quality colored pencil drawings through concise and &ldquo;easy to digest&rdquo; modules that include HD videos and Ebooks. This course is for anyone wanting to improve their drawing skills, particularly with colored pencils. This course is designed to maximize learning by including ebooks with each module. Each ebook corresponds with the video from the module ensuring that all learning styles are addressed. A total of over 5 hours of video instruction, 21 downloadable ebooks, and photo references are all included.</p>\r\n</div>\r\n<div class=\"styles--audience--2xuzW\" data-purpose=\"target-audience\">\r\n<h2 class=\"ud-heading-xl styles--audience__title--1qhlO\">Who this course is for:</h2>\r\n<ul class=\"styles--audience__list--16EaN\">\r\n<li>This course is designed for students wishing to learn professional colored pencil techniques and applications through concise modules that include videos and ebooks. A variety of subjects including animals, landscapes, still life, and portraiture are all covered as well as various colored pencil forms including wax-based, oil-based, and watercolor pencils.</li>\r\n</ul>\r\n</div>\r\n</div>\r\n</div>\r\n</div>', '<ol>\r\n<li>Colored Pencil Basics</li>\r\n<li>Creating Texture</li>\r\n</ol>', '2023-01-10 12:41:00', '2023-01-10 12:41:00', 'the-colored-pencil-drawing-course-2-1', 1),
(58, 'Realistic Pencil Drawing', 18, 'uploadCourseBannerInput_1673329347025.jpg', 5, 479000, NULL, NULL, NULL, 0, '<p>Create Realistic Drawings with Pencil</p>', '<h2 class=\"ud-heading-xl styles--description__header--2Z7Vb\" data-purpose=\"description-title\">Description</h2>\r\n<div class=\"show-more--container--1bpj2\">\r\n<div class=\"show-more--content--3WBXb show-more--with-gradient--qNzPb\">\r\n<div tabindex=\"0\">\r\n<div data-purpose=\"safely-set-inner-html:description:description\">\r\n<p>In this drawing course, we explore the foundations and techniques for creating wonderful realistic drawings with pencil. Each module is presented in logically sequenced video series. Each lesson builds on the last, easing you gently into more complex concepts.</p>\r\n<p>Learn how to use various grades of graphite, blending stumps, and erasers to create realistic drawings while using accuracy techniques such as the grid technique, sighting, and mapping. Apply the techniques used by professional artists to your own pencil drawings. Different forms of graphite pencil are used and demonstrated including traditional wooden pencils, powdered graphite and lead holders. Apply the techniques learned in this course to any drawing you wish to create. Once the foundations of realistic drawing are in place, no subject is too difficult.</p>\r\n<p>Designed for artists of all skill levels, no prior knowledge or experience is required. We begin with simple observational concepts before gradually progressing to more complex subjects and drawing concepts.</p>\r\n<p>Step by step illustrated ebooks that correspond with the videos are included as well as photo references. Review the ebooks as you work through each lesson or use them as reference for future works. Work at your own pace and start creating realistic, accurate drawings with graphite pencil.</p>\r\n</div>\r\n<div class=\"styles--audience--2xuzW\" data-purpose=\"target-audience\">\r\n<h2 class=\"ud-heading-xl styles--audience__title--1qhlO\">Who this course is for:</h2>\r\n<ul class=\"styles--audience__list--16EaN\">\r\n<li>This course is designed for artists at all levels wishing to enhance observational drawing skills, learn systems fo', '<h2 class=\"ud-heading-xl what-you-will-learn--title--2ztwE\">What you\'ll learn</h2>\r\n<div class=\"what-you-will-learn--content-spacing--3n5NU show-more--container--1bpj2\">\r\n<div class=\"show-more--content--3WBXb show-more--with-gradient--qNzPb\">\r\n<div tabindex=\"0\">\r\n<ul class=\"ud-unstyled-list ud-block-list what-you-will-learn--objectives-list--eiLce what-you-will-learn--objectives-list-two-column-layout--rZLJy\">\r\n<li>\r\n<div class=\"ud-block-list-item ud-block-list-item-small ud-block-list-item-tight ud-block-list-item-neutral ud-text-sm\" data-purpose=\"objective\">\r\n<div class=\"ud-block-list-item-content\">The basic materials, tools, and surfaces for creating realistic drawings with pencil.</div>\r\n</div>\r\n</li>\r\n<li>\r\n<div class=\"ud-block-list-item ud-block-list-item-small ud-block-list-item-tight ud-block-list-item-neutral ud-text-sm\" data-purpose=\"objective\">\r\n<div class=\"ud-block-list-item-content\">Why the element of art, value is so important to your success and how to use it in your drawings.</div>\r\n</div>\r\n</li>\r\n<li>\r\n<div class=\"ud-block-list-item ud-block-list-item-small ud-block-list-item-tight ud-block-list-item-neutral ud-text-sm\" data-purpose=\"objective\">\r\n<div class=\"ud-block-list-item-content\">How to create the illusion of a variety of textures with pencil</div>\r\n</div>\r\n</li>\r\n<li>\r\n<div class=\"ud-block-list-item ud-block-list-item-small ud-block-list-item-tight ud-block-list-item-neutral ud-text-sm\" data-purpose=\"objective\">\r\n<div class=\"ud-block-list-item-content\">Blending and shading techniques for pencil drawing.</div>\r\n</div>\r\n</li>\r\n<li>\r\n<div class=\"ud-block-list-item ud-block-list-item-small ud-block-list-item-tight ud-block-list-item-neutral ud-text-sm\" data-purpose=\"objective\">\r\n<div class=\"ud-block-list-item-content\">How to use a variety of forms of graphite including traditional pencils, specialty pencils, powdered graphite, and lead holders.</div>\r\n</div>\r\n</li>\r\n<li>\r\n<div class=\"ud-block-list-item ud-block-list-item-small ud-block-list-item-tight ud-block-list-item-neutral ud-text-sm\" data-purpose=\"objective\">\r\n<div class=\"ud-block-list-item-content\">How to ensure accuracy in your drawings by using the grid technique.</div>\r\n</div>\r\n</li>\r\n<li>\r\n<div class=\"ud-block-list-item ud-block-list-item-small ud-block-list-item-tight ud-block-list-item-neutral ud-text-sm\" data-purpose=\"objective\">\r\n<div class=\"ud-block-list-item-content\">How to ensure accuracy through sighting and measuring.</div>\r\n</div>\r\n</li>\r\n<li>\r\n<div class=\"ud-block-list-item ud-block-list-item-small ud-block-list-item-tight ud-block-list-item-neutral ud-text-sm\" data-purpose=\"objective\">\r\n<div class=\"ud-block-list-item-content\">The importance of observation and how to see the abstract shapes that make up a subject.</div>\r\n</div>\r\n</li>\r\n<li>\r\n<div class=\"ud-block-list-item ud-block-list-item-small ud-block-list-item-tight ud-block-list-item-neutral ud-text-sm\" data-purpose=\"objective\">\r\n<div class=\"ud-block-list-item-content\">How to use the eraser as a mark-making tool.</div>\r\n</div>\r\n</li>\r\n<li>\r\n<div class=\"ud-block-list-item ud-block-list-item-small ud-block-list-item-tight ud-block-list-item-neutral ud-text-sm\" data-purpose=\"objective\">\r\n<div class=\"ud-block-list-item-content\">How to draw challenging subjects such as flowing water, reflections, and transparency.</div>\r\n</div>\r\n</li>\r\n<li>\r\n<div class=\"ud-block-list-item ud-block-list-item-small ud-block-list-item-tight ud-block-list-item-neutral ud-text-sm\" data-purpose=\"objective\">\r\n<div class=\"ud-block-list-item-content\">How to apply the concepts learned to any subject that you wish.</div>\r\n</div>\r\n</li>\r\n</ul>\r\n</div>\r\n</div>\r\n</div>', '2023-01-10 12:42:27', '2023-01-10 12:42:27', 'realistic-pencil-drawing-1', 1);

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
(7, 2, 'LEARNING', NULL, 2, '2023-01-04 00:00:00'),
(17, 2, 'LEARNING', NULL, NULL, '2023-01-11 21:03:45'),
(17, 3, 'LEARNING', NULL, NULL, '2023-01-12 02:19:13'),
(17, 20, 'LEARNING', NULL, NULL, '2023-01-12 02:21:40'),
(17, 54, 'LEARNING', NULL, NULL, '2023-01-12 00:15:57'),
(17, 57, 'LEARNING', NULL, NULL, '2023-01-12 02:19:26');

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
(3, 'Sơn', 'Đặng', '<p>He is good guy</p>', 'uploadProfileAvatarInput_1673270841719.jpg'),
(4, 'Avinash', 'Jain', '<p>CEO of TheCodex.me - Teaching 500,000+ Students how to code</p>', 'uploadProfileAvatarInput_1673447099355.jpg'),
(5, 'Mark', 'Lassoff', '<h2 class=\"ud-heading-md instructor-profile--instructor-title--1L6bi\">Programming Instructor with over 500,000 students worldwide.</h2>', 'uploadProfileAvatarInput_1673447011111.jpg'),
(6, 'Stone River', 'elearning', '<p>At Stone River eLearning, technology is all we teach. If you\'re interested in IT, programming, development or design - we have it covered.&nbsp;</p>\r\n<p>Check out our huge catalog of courses and join the over 1.3M students currently taking Stone River eLearning courses. We currently offer 1000+&nbsp;different technology training courses on our Stone River eLearning website and are adding&nbsp;new courses on hot and trending topics every&nbsp;month. A subscription option is available for those with a real passion for learning.</p>', 'uploadProfileAvatarInput_1673447251138.jpg'),
(8, 'John', 'Purcell', '<p>&nbsp;After working as a software developer and contractor for over 14 years for a whole bunch of companies including CSC, Proquest, SPSS and AT&amp;T in the UK and Netherlands, I decided to work full-time as a private software trainer. After spending four years in the beautiful city of&nbsp;Budapest, Hungary and a year in Berlin, I&nbsp;now live in my home town of Derby, UK.</p>', 'uploadProfileAvatarInput_1673447314600.jpg'),
(18, 'Matthew', 'Fussell', '<h2 class=\"ud-heading-lg instructor-profile--about-me--3D60O\">About me</h2>\r\n<div class=\"show-more--container--1bpj2\">\r\n<div class=\"show-more--content--3WBXb\">\r\n<div tabindex=\"-1\">\r\n<div data-purpose=\"instructor-description\">\r\n<p>&nbsp; &nbsp; &nbsp; &nbsp;Hi, I am an illustrator and educator.&nbsp; As the founder and instructor at TheVirtualInstructor (website), I am able to help thousands of people all over the world realize their dreams of creating quality art.&nbsp; My illustrations have been featured in numerous publications and my work can be found in many private collections.&nbsp; Although I am an illustrator, my true passion in life is teaching.&nbsp; I have been teaching for over ten years and I am lucky to have helped so many people achieve their goals of creating art.&nbsp;</p>\r\n</div>\r\n</div>\r\n</div>\r\n</div>', 'uploadProfileAvatarInput_1673328457797.jpg');

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

--
-- Dumping data for table `lessons`
--

INSERT INTO `lessons` (`id`, `chapter_id`, `title`, `description`, `video_filename`) VALUES
(9, 9, '1. lời khuyên trước khóa học', '<p>Lời khuy&ecirc;n trước kh&oacute;a học</p>', 'uploadLessonVideo_1673274246897.mp4'),
(10, 9, '2. Cài đặt môi trường', '<p>C&agrave;i đặt m&ocirc;i trường</p>', 'uploadLessonVideo_1673274273811.mp4'),
(11, 10, 'lời khuyên trước khóa học', '<p>Lời khuy&ecirc;n trước kh&oacute;a học</p>', 'uploadLessonVideo_1673463665899.mp4'),
(12, 10, 'install node', '<p>Install node</p>', 'uploadLessonVideo_1673463708680.mp4'),
(13, 11, 'get method', '<p>GET method</p>', 'uploadLessonVideo_1673463788830.mp4'),
(14, 12, 'Mô hình mvc', '<p>M&ocirc; h&igrave;nh MVC</p>', 'uploadLessonVideo_1673463841421.mp4'),
(15, 13, 'Lesson 1', '<p><strong>lesson 1</strong></p>', 'uploadLessonVideo_1673463920089.mp4'),
(16, 13, 'Lesson 2', '<p><strong>Lesson 2</strong></p>', 'uploadLessonVideo_1673463949350.mp4'),
(17, 14, 'Lesson 1', '<p>lesson 1</p>', 'uploadLessonVideo_1673464043084.mp4'),
(18, 18, 'lesson 1', '<p>Lesson 1</p>', 'uploadLessonVideo_1673464655246.mp4');

-- --------------------------------------------------------

--
-- Table structure for table `otps`
--

CREATE TABLE `otps` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `code` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `used` tinyint(4) DEFAULT 0,
  `created_at` datetime DEFAULT NULL,
  `expired_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `otps`
--

INSERT INTO `otps` (`id`, `user_id`, `code`, `type`, `used`, `created_at`, `expired_at`) VALUES
(1, 11, 'HEUY9x', 'verify-email', 1, '2023-01-08 17:02:49', '2023-01-08 18:02:52'),
(2, 11, 'wtXRiH', 'recovery-password', 1, '2023-01-08 17:07:05', '2023-01-08 18:07:05'),
(3, 12, 'FZZBl4', 'verify-email', 1, '2023-01-08 18:16:37', '2023-01-08 19:16:40'),
(4, 17, 'dQpa7L', 'verify-email', 1, '2023-01-08 18:36:47', '2023-01-08 19:36:50'),
(5, 18, 'Wx29v2', 'verify-email', 0, '2023-01-10 12:21:49', '2023-01-10 13:21:53'),
(6, 19, 'DmcoAS', 'verify-email', 1, '2023-01-10 12:23:43', '2023-01-10 13:23:46');

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

CREATE TABLE `sales` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `discount_percent` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sales`
--

INSERT INTO `sales` (`id`, `name`, `discount_percent`) VALUES
(1, 'NEW YEAR SALE', 90),
(2, 'BLACK FRIDAY 2022', 50);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `sid` varchar(255) NOT NULL,
  `sess` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`sess`)),
  `expired` datetime NOT NULL
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
(7, 'Kiệt', 'Trần'),
(17, 'Shin', 'Coder');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `identity` varchar(100) NOT NULL,
  `authority` enum('STUDENT','LECTURER','ADMIN') NOT NULL,
  `is_verified` tinyint(1) NOT NULL DEFAULT 0,
  `is_activated` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `identity`, `authority`, `is_verified`, `is_activated`) VALUES
(1, 'admin1', 'admin1@gmail.com', '$2a$10$qX5nC.N9O8nhlK6zaeJAh.aj6kqDL2TkbXha/tSUakUdnI.tX41BC', 'ADMIN', 1, 1),
(2, 'student1', 'student1@gmail.com', '$2a$10$GflWaMQ7N9M7srFllbJMvuCPFEEIHVCOoN7TWirN9YM', 'STUDENT', 0, 1),
(3, 'lecturer1', 'lecturer1@gmail.com', '$2a$10$qX5nC.N9O8nhlK6zaeJAh.aj6kqDL2TkbXha/tSUakUdnI.tX41BC', 'LECTURER', 1, 1),
(4, 'Avinash_Jain', 'avinashjain@gmail.com', '$2a$10$qX5nC.N9O8nhlK6zaeJAh.aj6kqDL2TkbXha/tSUakUdnI.tX41BC', 'LECTURER', 1, 1),
(5, 'Mark_Lassoff', 'marklassoff@gmail.com', '$2a$10$qX5nC.N9O8nhlK6zaeJAh.aj6kqDL2TkbXha/tSUakUdnI.tX41BC', 'LECTURER', 1, 1),
(6, 'Stone_River_eLearning', 'stoneriverelearning@gmail.com', '$2a$10$qX5nC.N9O8nhlK6zaeJAh.aj6kqDL2TkbXha/tSUakUdnI.tX41BC', 'LECTURER', 1, 1),
(7, 'student2', 'student2@gmail.com', '$2a$10$bkcbwGXh5wWt6P2APPJlC.DCDKekvwzLnRjg02pbHHP', 'STUDENT', 0, 1),
(8, 'John_Purcell', 'johnpurcell@gmail.com', '$2a$10$qX5nC.N9O8nhlK6zaeJAh.aj6kqDL2TkbXha/tSUakUdnI.tX41BC', 'LECTURER', 1, 1),
(17, 'Shin Coder', 'shincoder.learning@gmail.com', '$2a$10$qX5nC.N9O8nhlK6zaeJAh.aj6kqDL2TkbXha/tSUakUdnI.tX41BC', 'STUDENT', 1, 1),
(18, 'matthewfussell@gmail.com', 'matthewfussell@gmail.com', '$2a$10$zVhYyNX8ttk/QLPTTMCo4.GJkVQeZJDTB1mMDn0l.seXHlSerz/Fi', 'LECTURER', 1, 1),
(19, 'shincoder.forwork@gmail.com', 'shincoder.forwork@gmail.com', '$2a$10$ATgRPbmCCWHYH3pAA3j0UeIEGGU.jlkGcwZ4pgwu8kflTuiSEXjoe', 'LECTURER', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `watchlist`
--

CREATE TABLE `watchlist` (
  `student_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `watchlist`
--

INSERT INTO `watchlist` (`student_id`, `course_id`) VALUES
(17, 2),
(17, 3);

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
-- Indexes for table `otps`
--
ALTER TABLE `otps`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`sid`),
  ADD KEY `sessions_expired_index` (`expired`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `chapters`
--
ALTER TABLE `chapters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `lessons`
--
ALTER TABLE `lessons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `otps`
--
ALTER TABLE `otps`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

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
  ADD CONSTRAINT `FK_STUDENTS_USERS` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

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
