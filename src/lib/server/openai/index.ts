import OpenAI from 'openai';
import { OPENROUTER_API_KEY } from '$env/static/private';

export const openai = new OpenAI({
	baseURL: 'https://openrouter.ai/api/v1',
	apiKey: OPENROUTER_API_KEY
});

export function parseFinalMessage(content: string): string {
	const finalMessageMatch = content.match(/<\|channel\|>final<\|message\|>(.+)$/s);
	return finalMessageMatch ? finalMessageMatch[1].trim() : content;
}
