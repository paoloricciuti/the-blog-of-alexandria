import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	OPENROUTER_API_KEY: { static: true },
	DATABASE_URL: { static: true }
});
