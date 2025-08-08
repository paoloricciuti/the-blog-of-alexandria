<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header class="m-auto prose p-8 font-serif">
	<h1 class="text-center text-5xl">The Blog of Alexandria</h1>
	<nav>
		<ul class="mt-4 flex list-none justify-center space-x-4">
			<li><a href="/">Home</a></li>
			<li><a href="/blog">Blog</a></li>
			<li><a href="/about">About</a></li>
			<li><a href="/contacts">Contacts</a></li>
		</ul>
	</nav>
</header>

<main class="m-auto prose font-serif">
	{@render children?.()}
</main>
