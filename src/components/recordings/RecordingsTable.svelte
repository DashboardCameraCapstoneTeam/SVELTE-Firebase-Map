<script>
	import calculateFileSizeString from "utils/file-size.js";
	export let files;
	export let deleteDriveFile;
	export let startMachineLearning;
	export let fetchGPSDataForFile;
	export let openModel;
</script>

<section class="card h-fit scale-in-center">
	<div class="p-4">
		<p class="font-bold my-1">GPS Table View:</p>
		{#if files.length}
			<table class="table w-full rounded-lg">
				<thead>
					<tr>
						<th>Video</th>
						<th>Video Name</th>
						<th>Created Time</th>
						<th>Owner</th>
						<th>Size</th>
						<th>Options</th>
			
					</tr>
				</thead>
				<tbody>
					{#each files as videoFile}
						{#if videoFile.fileExtension === "MP4" || videoFile.fileExtension === "mp4"}
							<tr>
								<td class="w-64">
									{#if videoFile.webViewLink && videoFile.thumbnailLink}
                                 
                                    <img
                                        src={videoFile.thumbnailLink}
                                        onerror="https://i.picsum.photos/id/870/200/300.jpg?blur=2&grayscale&hmac=ujRymp644uYVjdKJM7kyLDSsrqNSMVRPnGU99cKl6Vs"
                                        alt="Dashcam"
                                        class="h-full w-auto object-cover rounded-lg"
                                    />
									{/if}
								</td>
								<td>{videoFile.name}</td>
								<td>{videoFile.createdTime}</td>
								<td>{videoFile.owners[0].displayName}</td>
								<td>{calculateFileSizeString(videoFile.size)}</td>
								<td>

                                    <div class="flex flex-row">
                                        <a a href={videoFile.webViewLink} target="_blank" class={`card-btn btn-primary my-1`}>
                                            <i class="fa-solid fa-eye" />
                                            Watch
                                        </a>
                                        <button class={`card-btn btn-primary my-1 mx-1`} on:click={() => fetchGPSDataForFile(videoFile)}>
                                            <i class="fa-solid fa-share" />
                                            Add to Map
                                        </button>
    
                                        <button
                                            class={`card-btn btn-error-outline my-1`}
                                            on:click={() => openModel("Delete Google Drive Recording", "Do you want to delete the Google Drive Recording?", "Delete Recording", deleteDriveFile, videoFile)}>
                                            <i class="fa-solid fa-trash" />
                                            Delete
                                        </button>
                                    </div>
                                    
                                        

                                
								</td>

							</tr>
						{/if}
					{/each}
				</tbody>
			</table>
		{:else}
			<div class="alert alert-red my-1" role="alert">No Firebase GPS Data Selected.</div>
		{/if}
	</div>
</section>
