<script>
	export let file;
</script>

<section class="card h-fit scale-in-center">
	<p class="font-bold my-1">Video:</p>

	{#if file.webViewLink}
		<a href={file.webViewLink} target="_blank" class="text-white text-xl  "><img src={file.thumbnailLink} alt="Dashcam" class="h-64 w-auto object-cover " width="500" height="600" /></a>
	{/if}

	<p class="font-bold my-1">File Name:</p>
	<p class="truncate">{file.originalFilename}</p>

	<p class="font-bold my-1">Created Time:</p>
	<p>{file.createdTime}</p>
	<p class="font-bold my-1">Modified Time:</p>
	<p>{file.modifiedTime}</p>
	<p class="font-bold my-1">File Size:</p>
	<p>{file.size}</p>
	<p class="font-bold my-1">Owner:</p>
	<p>{file.owners[0].displayName}</p>
</section>
