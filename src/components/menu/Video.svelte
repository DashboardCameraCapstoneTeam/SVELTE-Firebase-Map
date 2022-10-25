<script>
	export let selectedVideoFile = null;
</script>

<section class="card {selectedVideoFile == null ? 'h-fit' : 'h-96'} scale-in-center">
	{#if selectedVideoFile == null}
		<div class="p-4">
			<p class="font-bold my-1">Video Player:</p>
			<div class="alert alert-red my-1" role="alert">No Video selected.</div>
		</div>
	{:else}
		<iframe
			class="h-96 w-full overflow-hidden rounded-lg"
			allowfullscreen
			frameborder="0"
			height="100%"
			width="100%"
			title={`${selectedVideoFile.name}`}
			src={`${selectedVideoFile.webViewLink.replace("view", "preview")}`}
			allow="autoplay"
		/>
	{/if}
</section>
