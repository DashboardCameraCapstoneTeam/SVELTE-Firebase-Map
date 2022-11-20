<script>
	export let selectedVideoFile;
</script>

<section class="card {selectedVideoFile ? 'h-96' : 'h-fit'} scale-in-center">
	{#if selectedVideoFile}
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
	{:else}
		<div class="p-4">
			<p class="font-bold my-1">Video Player:</p>
			<div class="alert alert-red my-1" role="alert">No Video selected.</div>
		</div>
	{/if}
</section>
