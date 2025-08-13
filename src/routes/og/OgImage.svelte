<svelte:options css="injected" />

<script lang="ts">
	interface Props {
		title?: string;
	}

	let { title = 'The Blog of Alexandria' }: Props = $props();
</script>

<div class="og-container">
	<div class="og-internal">
		<div class="og-border"></div>
		<h2 class="blog-name">The Blog of Alexandria</h2>
		<h1 class="title">{title}</h1>
		<div class="max-w-1/2 text-center italic">
			Here, wisdom flows as freely as the Nile once did through Egypt. Each article emerges
			organically from the digital ether, curated by mysterious forces that somehow know exactly
			what you're looking for.
		</div>
	</div>
</div>

<style>
	.og-container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-basis: 100%;
		padding: 3%;
		background: linear-gradient(135deg, #f8f6f0 0%, #f5f3ed 100%);
	}
	.og-container > * {
		flex-basis: 100%;
	}
	.og-internal {
		border: currentColor 3px solid;
		border-radius: 1rem;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
		font-family: 'Eb Garamond', serif;
		color: #451a03;
		display: flex;
		padding: 1rem;
	}

	.og-border {
		display: flex;
		position: absolute;
		top: 0.5rem;
		left: 0.5rem;
		right: 0.5rem;
		bottom: 0.5rem;
		border: 1px solid #451a03;
		border-radius: 0.5rem;
	}

	.blog-name {
		font-family: 'Eb Garamond', serif;
		font-size: 24px;
		font-weight: 400;
		color: #451a03;
		margin-bottom: auto;
		line-height: 1;
		letter-spacing: 0.025em;
	}

	.title {
		font-family: 'Eb Garamond', serif;
		font-size: 64px;
		font-weight: bold;
		color: #451a03;
		line-height: 1.2;
		margin: 0;
		max-width: 1000px;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: auto;
		text-align: center;
	}
</style>
