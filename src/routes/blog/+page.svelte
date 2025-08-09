<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>The Blog of Alexandria - All Posts</title>
</svelte:head>

<div>
	<h1 class="text-center">All Blog Posts</h1>

	{#if data.posts.length === 0}
		<p>No blog posts found. Create some by visiting specific blog URLs!</p>
	{:else}
		{#each data.posts as post (post.slug)}
			<article class="not-prose mb-8 border-b pb-6 last:border-b-0">
				<h2 class="mb-3 text-3xl font-bold">
					<a href="/blog/{post.slug}" class="text-decoration-none">
						{post.title}
					</a>
				</h2>
				<p class="leading-relaxed text-gray-700">
					{post.excerpt}
				</p>
				<a href="/blog/{post.slug}" class="text-decoration-none"> Read more → </a>
			</article>
		{/each}

		<!-- Pagination -->
		{#if data.pagination.total_pages > 1}
			<div class="not-prose mt-8 text-center">
				{#if data.pagination.has_prev_page}
					<a href="/blog?page={data.pagination.current_page - 1}" class="text-decoration-none mr-4">
						← Previous
					</a>
				{/if}

				<span class="mx-4">
					Page {data.pagination.current_page} of {data.pagination.total_pages}
				</span>

				{#if data.pagination.has_next_page}
					<a href="/blog?page={data.pagination.current_page + 1}" class="text-decoration-none ml-4">
						Next →
					</a>
				{/if}

				<p class="mt-2 text-sm text-gray-500">
					Showing {data.posts.length} of {data.pagination.total_count} posts
				</p>
			</div>
		{/if}
	{/if}
</div>
