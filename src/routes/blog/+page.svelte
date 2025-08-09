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
		{#each data.posts as post}
			<article class="not-prose mb-8 border-b pb-6 last:border-b-0">
				<h2>
					<a href="/blog/{post.slug}" class="text-decoration-none">
						{post.title}
					</a>
				</h2>
				<p class="text-gray-700 leading-relaxed">
					{post.excerpt}
				</p>
				<a href="/blog/{post.slug}" class="text-decoration-none">
					Read more →
				</a>
			</article>
		{/each}

		<!-- Pagination -->
		{#if data.pagination.totalPages > 1}
			<div class="not-prose text-center mt-8">
				{#if data.pagination.hasPrevPage}
					<a
						href="/blog?page={data.pagination.currentPage - 1}"
						class="text-decoration-none mr-4"
					>
						← Previous
					</a>
				{/if}

				<span class="mx-4">
					Page {data.pagination.currentPage} of {data.pagination.totalPages}
				</span>

				{#if data.pagination.hasNextPage}
					<a
						href="/blog?page={data.pagination.currentPage + 1}"
						class="text-decoration-none ml-4"
					>
						Next →
					</a>
				{/if}

				<p class="text-sm text-gray-500 mt-2">
					Showing {data.posts.length} of {data.pagination.totalCount} posts
				</p>
			</div>
		{/if}
	{/if}
</div>
