CREATE TABLE `Otps` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `code` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `used` tinyint DEFAULT 0,
  `created_at` datetime,
  `expired_at` datetime
);

CREATE TABLE `Users` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(255) UNIQUE NOT NULL,
  `first_name` varchar(255) DEFAULT "",
  `last_name` varchar(255) DEFAULT "",
  `password` longtext NOT NULL,
  `verified_at` datetime,
  `created_at` datetime,
  `updated_at` datetime,
  `deleted_at` datetime
);

CREATE TABLE `Watchlist` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `user_id` bigint,
  `course_id` bigint,
  `created_at` datetime,
  `updated_at` datetime,
  `deleted_at` datetime
);

CREATE TABLE `Courses` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT
);

CREATE TABLE `Course_Registration` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `user_id` bigint,
  `course_id` bigint,
  `created_at` datetime,
  `updated_at` datetime,
  `deleted_at` datetime
);

ALTER TABLE `Otps` ADD FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);

ALTER TABLE `Watchlist` ADD FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);

ALTER TABLE `Watchlist` ADD FOREIGN KEY (`course_id`) REFERENCES `Courses` (`id`);

ALTER TABLE `Course_Registration` ADD FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);

ALTER TABLE `Course_Registration` ADD FOREIGN KEY (`course_id`) REFERENCES `Courses` (`id`);
