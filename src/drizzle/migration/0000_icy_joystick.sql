CREATE TABLE `sessions` (
	`id` varchar(255) NOT NULL,
	`userId` int NOT NULL,
	`userAgent` varchar(512) NOT NULL,
	`ip` varchar(45) NOT NULL,
	`expiresAt` timestamp NOT NULL,
	`deletedAt` timestamp,
	`updatedAt` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
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
--> statement-breakpoint
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;