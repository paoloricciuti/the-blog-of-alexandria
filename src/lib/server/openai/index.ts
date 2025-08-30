import OpenAI from 'openai';
import { OPENROUTER_API_KEY } from '$env/static/private';

export const openai = new OpenAI({
	baseURL: 'https://openrouter.ai/api/v1',
	apiKey: OPENROUTER_API_KEY
});

export function parse_final_message(content: string): string {
	const final_message_match = content.match(/assistantfinal(.+)$/s);
	return final_message_match ? final_message_match[1].trim() : content;
}
