import { dev } from '$app/environment';
import { error } from '@sveltejs/kit';

import { image_from_component, type RenderOptions } from 'svelte-component-to-image';
import OGImage from './OgImage.svelte';

export async function GET({ url, setHeaders }) {
	// Extract data from URL parameters
	const title = url.searchParams.get('title') ?? 'The Blog of Alexandria';

	try {
		const options: RenderOptions = {
			width: 1200,
			height: 630,
			props: {
				title
			},
			fonts: [
				{
					name: 'Eb Garamond',
					url: `${url.origin}/eb-garamond.woff`,
					weight: 400,
					style: 'normal'
				},
				{
					name: 'Eb Garamond',
					url: `${url.origin}/eb-garamond-bold.woff`,
					weight: 800,
					style: 'bold'
				},
				{
					name: 'Eb Garamond',
					url: `${url.origin}/eb-garamond-italic.woff`,
					weight: 400,
					style: 'italic'
				}
			],
			debug: dev // Enable debug logs in development
		};

		const image = await image_from_component(OGImage, options);
		if (!image) error(500, 'Failed to generate image');

		setHeaders({
			'Content-Type': 'image/png',
			'Cache-Control': dev ? 'no-cache' : 's-maxage=31536000, stale-while-revalidate=31536000'
		});

		return new Response(image as never);
	} catch (e) {
		console.error('Error generating Open Graph image:', e);
		throw error(500, 'Failed to generate image');
	}
}
