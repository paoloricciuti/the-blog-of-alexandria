import { db } from '$lib/server/db/index.js';
import { blog } from '$lib/server/db/schema.js';
import { desc, count } from 'drizzle-orm';

const posts_per_page = 10;

export async function load({ url }) {
	const page_param = url.searchParams.get('page') || '1';
	const page = parseInt(page_param, 10);
	
	// Validate page number
	if (isNaN(page) || page < 1) {
		throw new Error('Invalid page number');
	}
	
	const offset = (page - 1) * posts_per_page;

	// Get total count for pagination
	const [{ total_count }] = await db.select({ total_count: count() }).from(blog);
	const total_pages = Math.ceil(total_count / posts_per_page);

	// Get paginated posts (ordered by slug for consistent ordering)
	const posts = await db
		.select({
			slug: blog.slug,
			title: blog.title,
			content: blog.content
		})
		.from(blog)
		.orderBy(desc(blog.slug))
		.limit(posts_per_page)
		.offset(offset)
		.all();

	// Create excerpts from content (strip HTML and truncate)
	const posts_with_excerpts = posts.map((post) => {
		// Strip HTML tags and get first ~200 characters
		const plain_text = post.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
		const excerpt = plain_text.length > 200 ? plain_text.substring(0, 200) + '...' : plain_text;
		
		return {
			slug: post.slug,
			title: post.title,
			excerpt
		};
	});

	return {
		posts: posts_with_excerpts,
		pagination: {
			current_page: page,
			total_pages,
			total_count,
			has_next_page: page < total_pages,
			has_prev_page: page > 1
		}
	};
}