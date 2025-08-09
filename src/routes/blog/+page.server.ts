import { db } from '$lib/server/db/index.js';
import { blog } from '$lib/server/db/schema.js';
import { desc } from 'drizzle-orm';

const POSTS_PER_PAGE = 10;

export async function load({ url }) {
	const page = parseInt(url.searchParams.get('page') || '1', 10);
	const offset = (page - 1) * POSTS_PER_PAGE;

	// Get total count for pagination
	const totalPosts = await db.select().from(blog).all();
	const totalCount = totalPosts.length;
	const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

	// Get paginated posts (ordered by slug for consistent ordering)
	const posts = await db
		.select({
			slug: blog.slug,
			title: blog.title,
			content: blog.content
		})
		.from(blog)
		.orderBy(desc(blog.slug))
		.limit(POSTS_PER_PAGE)
		.offset(offset)
		.all();

	// Create excerpts from content (strip HTML and truncate)
	const postsWithExcerpts = posts.map((post) => {
		// Strip HTML tags and get first ~200 characters
		const plainText = post.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
		const excerpt = plainText.length > 200 ? plainText.substring(0, 200) + '...' : plainText;
		
		return {
			slug: post.slug,
			title: post.title,
			excerpt
		};
	});

	return {
		posts: postsWithExcerpts,
		pagination: {
			currentPage: page,
			totalPages,
			totalCount,
			hasNextPage: page < totalPages,
			hasPrevPage: page > 1
		}
	};
}