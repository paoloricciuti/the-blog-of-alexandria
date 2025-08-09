import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const blog = sqliteTable('blog', {
	slug: text('slug').primaryKey(),
	content: text('content').notNull(),
	title: text('title').notNull().default('Untitled'),
	created_at: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`)
});
