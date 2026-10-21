import { db } from '#lib/server/db/index.js';
import { blog } from '#lib/server/db/schema.js';

export async function GET() {
	const slugs = await db
		.select({
			slug: blog.slug
		})
		.from(blog)
		.all();
	return Response.json(slugs);
}
