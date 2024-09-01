CREATE TABLE `api` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`project_id` integer NOT NULL,
	`route` text NOT NULL,
	`definition` text NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `project` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`path` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `unique_route_for_project` ON `api` (`project_id`,`route`);--> statement-breakpoint
CREATE UNIQUE INDEX `project_name_unique` ON `project` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `project_path_unique` ON `project` (`path`);