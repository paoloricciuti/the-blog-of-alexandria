CREATE TABLE `__new_blog` (
	`slug` text PRIMARY KEY NOT NULL,
	`content` text NOT NULL,
	`title` text NOT NULL DEFAULT 'Untitled',
	`created_at` integer NOT NULL DEFAULT (unixepoch())
);
--> statement-breakpoint
INSERT INTO `__new_blog`("slug", "content", "title") SELECT "slug", "content", "title" FROM `blog`;
--> statement-breakpoint
DROP TABLE `blog`;
--> statement-breakpoint
ALTER TABLE `__new_blog` RENAME TO `blog`;