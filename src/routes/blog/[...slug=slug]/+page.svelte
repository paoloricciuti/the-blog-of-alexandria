<script lang="ts">
	import facts from './random-facts.json';
	let { data } = $props();
</script>

<svelte:head>
	{#await data.title}
		<title>The Blog of Alexandria</title>
	{:then title}
		<title>The Blog of Alexandria - {title}</title>
	{/await}
</svelte:head>

{#await data.content}
	<h1 class="title-main relative mb-12 text-center">Searching in our archive for your article</h1>
	<h2 class="title-section text-center">
		While you wait why don't you learn something about the Great Library of Alexandria?
	</h2>
	<div class="chapter-divider">
		<span class="ornament">❦</span>
	</div>
	<div class="facts">
		{#each facts as fact, i (fact.id)}
			<p style:--i={i} class="text-body text-muted mb-4">
				{fact.fact}
			</p>
		{/each}
	</div>
	<p class="hint text-body text-center">
		It's been a while, if we still didn't find your article, try to refresh the page.
	</p>
{:then content}
	<div class="blog-content relative">
		<div
			class="pointer-events-none absolute -top-7 -right-7 z-10 text-xs text-gray-600 italic opacity-50 select-none"
		>
			AI generated
		</div>
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html content}
	</div>
{:catch error}
	<p>Error loading blog post: {error.message}</p>
{/await}

<style>
	h1,
	h2 {
		text-wrap: balance;
	}
	.facts {
		display: grid;
		grid-template-areas: 1 / 1;
		& > * {
			grid-area: 1 / 1;
			opacity: 0;
			text-align: center;
			text-wrap: balance;
			animation: fade 150s infinite;
			animation-delay: calc(var(--i) * 10s);
		}
	}
	.hint {
		--wait: 25s;
		opacity: 1;
		visibility: visible;
		transition:
			opacity 150ms step-end var(--wait),
			visibility 150ms step-end var(--wait);
		@starting-style {
			opacity: 0;
			visibility: hidden;
		}
	}
	@keyframes fade {
		0% {
			opacity: 0;
		}
		1% {
			opacity: 1;
		}
		6% {
			opacity: 1;
		}
		6.25% {
			opacity: 0;
		}
		100% {
			opacity: 0;
		}
	}
</style>
