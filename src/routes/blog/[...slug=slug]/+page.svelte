<script lang="ts">
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
	<p>Loading...</p>
{:then content}
	<div class="blog-content">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html content}
	</div>
{:catch error}
	<p>Error loading blog post: {error.message}</p>
{/await}
