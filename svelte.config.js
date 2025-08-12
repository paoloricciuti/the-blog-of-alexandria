import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: { adapter: adapter(), prerender: { crawl: false } }
};

export default config;
