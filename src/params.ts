import { defineParams } from '@sveltejs/kit/params';

function matchSlug(value: string) {
	return /^[\w-]+$/.test(value);
}

export const params = defineParams({
	slug: (param) => (matchSlug(param) ? param : undefined)
});
