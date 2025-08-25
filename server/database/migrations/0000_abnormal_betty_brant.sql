CREATE TABLE `feedback` (
	`id` text PRIMARY KEY NOT NULL,
	`rating` text NOT NULL,
	`feedback` text,
	`path` text NOT NULL,
	`title` text NOT NULL,
	`country` text NOT NULL,
	`fingerprint` text NOT NULL,
	`created_at` integer,
	`updated_at` integer
);
