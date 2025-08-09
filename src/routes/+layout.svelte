<script lang="ts">
	import '../app.css';
	import '@fontsource/crimson-text';
	import '@fontsource/eb-garamond';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen">
	<!-- Ornamental border -->
	<div class="border-t-2 border-amber-900/20"></div>

	<header class="paper-texture mx-auto max-w-6xl px-6 py-8 shadow-sm">
		<div class="text-center">
			<h1 class="title-display mb-2">
				The Blog of Alexandria
			</h1>
			<div class="chapter-divider">
				<span class="ornament">❦</span>
			</div>

			<nav class="mt-6">
				<ul class="flex list-none justify-center space-x-8">
					<li>
						<a href="/" class="elegant-link text-lg font-medium transition-all hover:scale-105">
							Home
						</a>
					</li>
					<li>
						<a href="/blog" class="elegant-link text-lg font-medium transition-all hover:scale-105">
							Blog
						</a>
					</li>
					<li>
						<a
							href="/about"
							class="elegant-link text-lg font-medium transition-all hover:scale-105"
						>
							About
						</a>
					</li>
					<li>
						<a
							href="/contacts"
							class="elegant-link text-lg font-medium transition-all hover:scale-105"
						>
							Contacts
						</a>
					</li>
				</ul>
			</nav>
		</div>
	</header>

	<main class="mx-auto max-w-6xl px-6 py-8">
		<div class="paper-texture mx-auto prose prose-xl max-w-none rounded-lg px-10 py-8 shadow-sm">
			{@render children?.()}
		</div>
	</main>
</div>
