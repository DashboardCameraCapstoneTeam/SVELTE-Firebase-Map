<script>
	import calculateFileSizeString from "utils/file-size.js";
	export let videoFile;
	export let deleteDriveFile;
	export let startMachineLearning;
	export let fetchGPSDataForFile;
	export let openModel;
</script>

<section class="card h-fit">
	<div class={`bg-dark rounded-lg py-5 text-center text-white sticky top-0 `}>
		<p>{videoFile.name}</p>
	</div>
	<div class="p-4">
		{#if videoFile.webViewLink && videoFile.thumbnailLink}
			<a href={videoFile.webViewLink} target="_blank" class="text-white text-xl  borderRounded"
				><img
					src={videoFile.thumbnailLink}
					onerror="https://i.picsum.photos/id/870/200/300.jpg?blur=2&grayscale&hmac=ujRymp644uYVjdKJM7kyLDSsrqNSMVRPnGU99cKl6Vs"
					alt="Dashcam"
					class="h-64 w-auto object-cover rounded-lg"
					width="500"
					height="600"
				/></a
			>
		{/if}
		<div class="my-4">
			<p class="font-bold my-1">videoFile Name:</p>
			<p class="truncate">{videoFile.name}</p>
			<p class="font-bold my-1">Created Time:</p>
			<p>{videoFile.createdTime}</p>
			<p class="font-bold my-1">Owner:</p>
			<p>{videoFile.owners[0].displayName}</p>
			<p class="font-bold my-1">videoFile Size:</p>
			<p>{calculateFileSizeString(videoFile.size)}</p>
		</div>
		<div class="flex">
			<a a href={videoFile.webViewLink} target="_blank" class={`card-btn btn-primary my-1 mr-1`}>
				<i class="fa-solid fa-eye" />
				Watch
			</a>
			<button class={`card-btn btn-primary my-1`} on:click={() => fetchGPSDataForFile(videoFile)}>
				<i class="fa-solid fa-share" />
				Add to Map
			</button>
		</div>
		<hr class="solid my-4" />
		<div class="flex">
			<button
				class={`card-btn btn-error-outline my-1`}
				on:click={() => openModel("Delete Google Drive Recording", "Do you want to delete the Google Drive Recording?", "Delete Recording", deleteDriveFile, videoFile)}
			>
				<i class="fa-solid fa-trash" />
				Delete
			</button>
		</div>
		<hr class="solid my-4" />
		<div class="flex">
			<button class={`card-btn btn-primary my-1`} on:click={() => startMachineLearning(videoFile)}>
				<i class="fa-solid fa-robot" />
				Machine Learning
			</button>
		</div>
	</div>
</section>
