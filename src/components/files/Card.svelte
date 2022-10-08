<script>

	
	export let file;
	export let deleteDriveFile;
	export let startMachineLearning;

</script>

<section class="card h-fit scale-in-center">
	<p class="font-bold my-1">Video:</p>

	{#if file.webViewLink && file.thumbnailLink}
		<a href={file.webViewLink} target="_blank" class="text-white text-xl  "><img src={file.thumbnailLink} onerror="https://i.picsum.photos/id/870/200/300.jpg?blur=2&grayscale&hmac=ujRymp644uYVjdKJM7kyLDSsrqNSMVRPnGU99cKl6Vs" alt="Dashcam" class="h-64 w-auto object-cover " width="500" height="600" /></a>
	{/if}

	<p class="font-bold my-1">File Name:</p>
	<p class="truncate">{file.originalFilename}</p>

	<p class="font-bold my-1">Created Time:</p>
	<p>{file.createdTime}</p>
	<p class="font-bold my-1">File Size:</p>
	<p>{file.size}</p>
	<p class="font-bold my-1">Owner:</p>
	<p>{file.owners[0].displayName}</p>

	<div class="flex">
		<a a href={file.webViewLink} target="_blank" class={`card-btn card-btn-blue my-1 mr-1`}>
			<i class="fa-solid fa-eye" />
			Watch
		</a>

		<button class={`card-btn card-btn-red my-1 ml-1`} on:click={()=>deleteDriveFile(file.id)}>
			<i class="fa-solid fa-trash" />
			Delete
		</button>
	</div>

	<button class={`card-btn card-btn-green my-1`} on:click={()=>startMachineLearning(file)}>
		<i class="fa-solid fa-robot" />
		Machine Learning
	</button>
</section>
