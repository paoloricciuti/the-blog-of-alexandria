<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>The Blog of Alexandria - All Posts</title>
</svelte:head>

<div>
	<div class="chapter-divider mb-8">
		<span class="ornament">❦</span>
	</div>
	
	<h1 class="title-main mb-12 text-center">All Chronicles</h1>

	{#if data.posts.length === 0}
		<div class="elegant-quote mx-auto my-12 max-w-2xl text-center">
			<p class="text-body">
				The scrolls await your curiosity. Create new chronicles by visiting specific topics—
				the oracle will inscribe wisdom upon the digital papyrus.
			</p>
		</div>
	{:else}
		{#each data.posts as post (post.slug)}
			<article class="not-prose mb-12 border-b pb-8 last:border-b-0" style="border-color: var(--color-border);">
				<h2 class="title-section mb-4">
					<a href="/blog/{post.slug}" class="elegant-link transition-all">
						{post.title}
					</a>
				</h2>
				<p class="text-body text-muted mb-4">
					{post.excerpt}
				</p>
				<div class="flex items-center">
					<a href="/blog/{post.slug}" class="elegant-link font-medium">
						Continue Reading →
					</a>
				</div>
			</article>
		{/each}

		<!-- Pagination -->
		{#if data.pagination.total_pages > 1}
			<div class="not-prose mt-12 text-center">
				<div class="chapter-divider mb-6">
					<span class="ornament">⚜</span>
				</div>
				
				<div class="flex items-center justify-center space-x-6">
					{#if data.pagination.has_prev_page}
						<a 
							href="/blog?page={data.pagination.current_page - 1}" 
							class="button-accent elegant-link rounded-lg px-4 py-2 transition-all"
						>
							← Previous
						</a>
					{/if}

					<span class="text-body font-medium">
						Page {data.pagination.current_page} of {data.pagination.total_pages}
					</span>

					{#if data.pagination.has_next_page}
						<a 
							href="/blog?page={data.pagination.current_page + 1}" 
							class="button-accent elegant-link rounded-lg px-4 py-2 transition-all"
						>
							Next →
						</a>
					{/if}
				</div>

				<p class="mt-4 text-sm text-muted">
					Showing {data.posts.length} of {data.pagination.total_count} chronicles
				</p>
			</div>
		{/if}
	{/if}
</div>
