CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`userName` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` text NOT NULL,
	`phoneNumber` varchar(255),
	`deletedAt` timestamp,
	`updatedAt` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_userName_unique` UNIQUE(`userName`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
