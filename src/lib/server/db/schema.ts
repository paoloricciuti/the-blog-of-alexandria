import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const blog = sqliteTable('blog', {
	slug: text('slug').primaryKey(),
	content: text('content').notNull(),
	title: text('title').notNull().default('Untitled')
});
