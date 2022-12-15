<script>
	export let machineLearningVideoData;
    let blobUrl = ''

    const onVideoChange = () => {
        const blob = new Blob([machineLearningVideoData], { type: 'video/mp4' });
        console.log(blob)
        blobUrl = URL.createObjectURL(blob); 
    };
    $: machineLearningVideoData && onVideoChange();

</script>

<section class="card {machineLearningVideoData ? 'h-96' : 'h-fit'} scale-in-center">
	{#if machineLearningVideoData}
		<iframe
			class="h-96 w-full overflow-hidden rounded-lg"
			allowfullscreen
			frameborder="0"
			height="100%"
			width="100%"
			title={`machine learning video`}
			src={blobUrl}
			allow="autoplay"
		/>
	{:else}
		<div class="p-4">
			<p class="font-bold my-1">Video Player:</p>
			<div class="alert alert-red my-1" role="alert">No Video selected.</div>
		</div>
	{/if}
</section>
