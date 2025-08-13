import { db } from '$lib/server/db';
import { blog } from '$lib/server/db/schema';
import { json } from '@sveltejs/kit';

export async function GET() {
	const slugs = await db
		.select({
			slug: blog.slug
		})
		.from(blog)
		.all();
	return json(slugs);
}
