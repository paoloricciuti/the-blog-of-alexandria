import { db } from '#lib/server/db/index.js';
import { blog } from '#lib/server/db/schema.js';
import { eq } from 'drizzle-orm';

export async function GET({ params: { slug } }) {
	const article = await db.select().from(blog).where(eq(blog.slug, slug)).get();
	return Response.json(article);
}
