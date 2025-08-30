import OpenAI from 'openai';
import { OPENROUTER_API_KEY } from '$env/static/private';

export const openai = new OpenAI({
	baseURL: 'https://openrouter.ai/api/v1',
	apiKey: OPENROUTER_API_KEY
});

export function parse_final_message(content: string): string {
	// Debug: Log first 500 chars to understand format without flooding logs
	console.log('=== RAW RESPONSE (first 500 chars) ===');
	console.log(content.substring(0, 500) + (content.length > 500 ? '...' : ''));
	console.log('=== END SAMPLE ===');
	
	// Common patterns found in reasoning models
	const patterns = [
		// Original channel-based pattern from issue description
		/<\|channel\|>final<\|message\|>(.+)$/s,
		
		// OpenAI o1-style reasoning (most likely for got-oss)
		/<\|thinking\|>[\s\S]*?<\|\/thinking\|>\s*(.+)$/s,
		
		// Alternative thinking formats
		/<thinking>[\s\S]*?<\/thinking>\s*(.+)$/s,
		/<reasoning>[\s\S]*?<\/reasoning>\s*(.+)$/s,
		
		// Common assistant/response markers
		/<\|start_header_id\|>assistant<\|end_header_id\|>\s*(.+)$/s,
		/<\|assistant\|>\s*(.+)$/s,
		
		// Explicit final answer markers
		/.*?(?:Final answer|Answer|Response|Output):\s*(.+)$/si,
		
		// Look for content after reasoning keywords
		/.*?(?:Let me think|I need to|First,|Now,|So,)[\s\S]*?\n\s*([^<\n][\s\S]*?)$/s,
		
		// Extract last substantial paragraph (fallback)
		/(?:.*?\n){2,}\s*([^<\n](?:[^\n]*\n?)*[^\s])$/s,
		
		// Another fallback - content after any XML-like closing tag
		/>[\s\S]*?([^<\n](?:[^\n]*\n?)*[^\s])$/s
	];
	
	for (let i = 0; i < patterns.length; i++) {
		const pattern = patterns[i];
		const match = content.match(pattern);
		
		if (match && match[1]) {
			const extracted = match[1].trim();
			// Ensure we have substantial content (not just whitespace or very short)
			if (extracted.length > 10 && !extracted.match(/^[\s<>|]+$/)) {
				console.log(`=== MATCHED PATTERN ${i + 1}: ${pattern.toString()} ===`);
				console.log(`Extracted: ${extracted.substring(0, 200)}${extracted.length > 200 ? '...' : ''}`);
				console.log('=== END MATCH ===');
				return extracted;
			}
		}
	}
	
	// Final fallback: if content seems to have reasoning, try to get the last meaningful part
	const lines = content.split('\n').map(line => line.trim()).filter(line => line.length > 0);
	
	if (lines.length > 1) {
		// Look for the last few substantial lines that don't look like metadata or tags
		for (let i = lines.length - 1; i >= Math.max(0, lines.length - 5); i--) {
			const line = lines[i];
			if (line.length > 20 && !line.match(/^<|>|\|/) && !line.includes('thinking') && !line.includes('reasoning')) {
				// Check if this and following lines make a good paragraph
				const candidateContent = lines.slice(i).join('\n');
				if (candidateContent.length > 50) {
					console.log('=== USING FALLBACK EXTRACTION ===');
					console.log(`Extracted: ${candidateContent.substring(0, 200)}${candidateContent.length > 200 ? '...' : ''}`);
					console.log('=== END FALLBACK ===');
					return candidateContent;
				}
			}
		}
	}
	
	console.log('=== NO PATTERN MATCHED, RETURNING ORIGINAL CONTENT ===');
	return content;
}
