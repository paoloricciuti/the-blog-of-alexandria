import { OPENROUTER_API_KEY } from '$env/static/private';
import { db } from '$lib/server/db/index.js';
import { blog } from '$lib/server/db/schema.js';
import Shiki from '@shikijs/markdown-it';
import { eq } from 'drizzle-orm';
import MarkdownIt from 'markdown-it';
import OpenAI from 'openai';

const md = MarkdownIt();

md.use(
	await Shiki({
		themes: {
			light: 'vitesse-light',
			dark: 'vitesse-dark'
		}
	})
);

const openai = new OpenAI({
	baseURL: 'https://openrouter.ai/api/v1',
	apiKey: OPENROUTER_API_KEY
});

export async function load({ params: { slug } }) {
	const existsting = await db.select().from(blog).where(eq(blog.slug, slug)).get();
	if (existsting) {
		return {
			content: existsting.content,
			title: existsting.title
		};
	}
	const { promise: content, resolve } = Promise.withResolvers();
	const { promise: title, resolve: resolve_title } = Promise.withResolvers();
	openai.chat.completions
		.create({
			model: 'openai/gpt-oss-20b:free',
			messages: [
				{
					role: 'user',
					content: `Please write a blog post that would fit the slug "${slug}". The post should be engaging, informative, and suitable for a general audience. It should cover the topic in depth and include relevant examples or anecdotes. Use markdown as output and only answer with the content of the blog post, no extra ceremonies. The content will be directly embedded into a page so it shouldn't look like a chat completion. The first line of the post should always be the title of the blog post and only that.`
				}
			]
		})
		.then((completion) => {
			if (completion.choices[0].message.content) {
				const content = completion.choices[0].message.content;

				const [, title] = content
					.split('\n')[0]
					.trim()
					.match(/# (.+)/) ?? ['', 'Untitled'];

				resolve_title(title);

				const rendered = md.render(content);

				db.insert(blog).values({ slug, title, content: rendered }).execute();

				resolve(rendered);
			}
		});
	return { content, title };
}
