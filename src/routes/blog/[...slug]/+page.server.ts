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
					content: `Write a comprehensive, engaging blog post for the slug "${slug}". 

REQUIREMENTS:
- Start with a compelling title using # markdown heading (first line only)
- Write 800-1200 words of high-quality, informative content
- Use clear, conversational tone suitable for a general audience
- Structure with proper headings (##, ###) and logical flow
- Include practical examples, code snippets, or real-world applications where relevant
- Add engaging introduction that hooks the reader
- Conclude with actionable takeaways or thought-provoking questions

FORMATTING:
- Use markdown formatting throughout
- Include code blocks with proper syntax highlighting when applicable
- Use bullet points and numbered lists for clarity
- Bold important concepts and italicize emphasis

SEO & ENGAGEMENT:
- Write compelling subheadings that break up content
- Include relevant keywords naturally throughout
- Make content scannable with good structure
- Add value that readers can't find elsewhere

INTERNAL LINKING:
- When relevant to the topic, naturally reference and link to other articles that might exist on this blog
- Use descriptive anchor text for links
- Format internal links as relative paths like [link text](/blog/other-article-slug)
- Only suggest realistic links that would make sense for a blog covering similar topics

OUTPUT: Return only the blog post content in markdown format. No meta-commentary or explanations - just the article that will be directly rendered on the page.`
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
