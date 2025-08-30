import { openai, parseFinalMessage } from '$lib/server/openai';
import { redirect } from '@sveltejs/kit';
import { toJsonSchema } from '@valibot/to-json-schema';
import { db } from '$lib/server/db/index.js';
import { blog } from '$lib/server/db/schema.js';
import { sql } from 'drizzle-orm';

import * as v from 'valibot';

const SlugSchema = v.object({
	slug: v.string()
});

const SlugSchemaStrict = v.pipe(
	SlugSchema,
	v.check((data) => /^\/[\w-]+/.test(data.slug))
);

export async function GET() {
	let url: string;
	try {
		const generated = await openai.chat.completions.create({
			model: 'openai/gpt-oss-20b:free',
			messages: [
				{
					role: 'user',
					content: `generates possible funny blog post slogs like \`/the-best-javascript-framework\` or \`/what-i-learned-by-navigating-the-sevens-seas\` that follows this regex /^\\/[\\w-]+/.`
				}
			],
			response_format: {
				type: 'json_schema',
				json_schema: {
					name: 'slug',
					description: 'a slug that conform to the schema that follows this regex /^\\/[\\w-]+/.',
					schema: toJsonSchema(SlugSchema) as Record<string, unknown>,
					strict: true
				}
			}
		});

		url = v.parse(SlugSchemaStrict, JSON.parse(parseFinalMessage(generated.choices[0].message.content ?? ''))).slug;
	} catch (e) {
		console.log(e);
		// Select a random article from the database
		try {
			const random_article = await db
				.select({ slug: blog.slug })
				.from(blog)
				.orderBy(sql`RANDOM()`)
				.limit(1)
				.get();

			if (random_article) {
				url = `/${random_article.slug}`;
			} else {
				url = '/some-random-article';
			}
		} catch (dbError) {
			console.log('Database error:', dbError);
			url = '/some-random-article';
		}
	}
	redirect(302, `/blog${url}`);
}
