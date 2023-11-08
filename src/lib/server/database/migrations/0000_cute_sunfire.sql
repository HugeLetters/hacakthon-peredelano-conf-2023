CREATE TABLE `user` (
	`id` text(15) PRIMARY KEY NOT NULL,
	`user_name` text(63) NOT NULL,
	`role` text DEFAULT 'basic' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `user_key` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`user_id` text(15) NOT NULL,
	`hashed_password` text(255),
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user_session` (
	`id` text(127) PRIMARY KEY NOT NULL,
	`user_id` text(15) NOT NULL,
	`active_expires` integer NOT NULL,
	`idle_expires` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `case` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`name` text(63) NOT NULL,
	`summary` text(65535),
	`status` text DEFAULT 'active' NOT NULL,
	`assigned_admin_id` text(15),
	FOREIGN KEY (`assigned_admin_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `case_todo` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`description` text(255) NOT NULL,
	`done` integer DEFAULT false NOT NULL,
	`case_id` text(36) NOT NULL,
	FOREIGN KEY (`case_id`) REFERENCES `case`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `thread` (
	`thread_id` text(63) NOT NULL,
	`case_id` text(36) NOT NULL,
	PRIMARY KEY(`case_id`, `thread_id`),
	FOREIGN KEY (`case_id`) REFERENCES `case`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `message` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`content` text(65535) NOT NULL,
	`created_at` integer DEFAULT current_timestamp NOT NULL,
	`report_id` text(36) NOT NULL,
	`author_id` text(15) NOT NULL,
	FOREIGN KEY (`report_id`) REFERENCES `report`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`author_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `report` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`author_name` text(63) NOT NULL,
	`content` text(65535) NOT NULL,
	`category` text(31) NOT NULL,
	`country` text(2),
	`organization` text(63),
	`created_at` integer DEFAULT current_timestamp NOT NULL,
	`creator_id` text(15) NOT NULL,
	`case_id` text(36) NOT NULL,
	FOREIGN KEY (`creator_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`case_id`) REFERENCES `case`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `user_role_index` ON `user` (`role`);--> statement-breakpoint
CREATE INDEX `user_key_user_id_index` ON `user_key` (`user_id`);--> statement-breakpoint
CREATE INDEX `user_session_user_id_index` ON `user_session` (`user_id`);--> statement-breakpoint
CREATE INDEX `case_status_index` ON `case` (`status`);--> statement-breakpoint
CREATE INDEX `case_assigned_admin_id_index` ON `case` (`assigned_admin_id`);--> statement-breakpoint
CREATE INDEX `case_todo_case_id_index` ON `case_todo` (`case_id`);--> statement-breakpoint
CREATE INDEX `message_created_at_index` ON `message` (`created_at`);--> statement-breakpoint
CREATE INDEX `message_report_id_index` ON `message` (`report_id`);--> statement-breakpoint
CREATE INDEX `report_category_index` ON `report` (`category`);--> statement-breakpoint
CREATE INDEX `report_country_index` ON `report` (`country`);--> statement-breakpoint
CREATE INDEX `report_organization_index` ON `report` (`organization`);--> statement-breakpoint
CREATE INDEX `report_created_at_index` ON `report` (`created_at`);--> statement-breakpoint
CREATE INDEX `report_creator_id_index` ON `report` (`creator_id`);--> statement-breakpoint
CREATE INDEX `report_case_id_index` ON `report` (`case_id`);