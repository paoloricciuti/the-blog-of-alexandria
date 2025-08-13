import { db } from '$lib/server/db';
import { blog } from '$lib/server/db/schema';
import { json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function GET({ params: { slug } }) {
	const article = await db.select().from(blog).where(eq(blog.slug, slug)).get();
	return json(article);
}
