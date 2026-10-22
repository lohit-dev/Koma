CREATE TABLE `cards` (
	`id` text PRIMARY KEY NOT NULL,
	`kind` text NOT NULL,
	`due` integer NOT NULL,
	`stability` real NOT NULL,
	`difficulty` real NOT NULL,
	`elapsedDays` integer NOT NULL,
	`scheduledDays` integer NOT NULL,
	`learningSteps` integer NOT NULL,
	`reps` integer NOT NULL,
	`lapses` integer NOT NULL,
	`state` integer NOT NULL,
	`lastReview` integer
);
--> statement-breakpoint
CREATE TABLE `daily_activity` (
	`day` text PRIMARY KEY NOT NULL,
	`xp` integer DEFAULT 0 NOT NULL,
	`minutes` integer DEFAULT 0 NOT NULL,
	`correct` integer DEFAULT 0 NOT NULL,
	`answered` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `strip_progress` (
	`stripId` text PRIMARY KEY NOT NULL,
	`score` integer NOT NULL,
	`completedAt` integer NOT NULL
);
