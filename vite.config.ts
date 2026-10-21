import adapter from '@sveltejs/adapter-node';
import tailwindcss from '@tailwindcss/vite';
import devtoolsJson from 'vite-plugin-devtools-json';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { svelte_component_to_image } from 'svelte-component-to-image/vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({ adapter: adapter(), prerender: { crawl: false } }),
		devtoolsJson(),
		svelte_component_to_image()
	]
});
