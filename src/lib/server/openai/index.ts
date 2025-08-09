import OpenAI from 'openai';
import { OPENROUTER_API_KEY } from '$env/static/private';

export const openai = new OpenAI({
	baseURL: 'https://openrouter.ai/api/v1',
	apiKey: OPENROUTER_API_KEY
});
