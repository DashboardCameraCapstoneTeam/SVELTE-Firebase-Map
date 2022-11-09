<script>
	import { onMount } from "svelte";
	import calculateFileSizeString from "utils/file-size.js";
	export let files;
	export let deleteDriveFile;
	export let startMachineLearning;
	export let fetchGPSDataForFile;
	export let openModel;

	const PROGRAMMING_TOOLS = ["google"];
	const returnLinkGivenIfStringContains = (toolString) => {
		if (toolString.includes("streamlit")) {
			return `icons/${toolString}-original.svg`;
		}

		if (toolString.includes("plain")) {
			const tempString = toolString.replace("-plain", "");
			return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tempString}/${tempString}-plain.svg`;
		}

		if (toolString.includes("wordmark")) {
			const tempString = toolString.replace("-wordmark", "");
			return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tempString}/${tempString}-wordmark.svg`;
		}

		return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${toolString}/${toolString}-original.svg`;
	};

	let videoFiles = files.filter((videoFile) => videoFile.fileExtension === "MP4" || videoFile.fileExtension === "mp4");

	let paginatedFiles = [];
	let paginationPage = 0;
	const numberOfItemsPerPageList = [10, 20, 30];
	let numberOfItemsPerPage = numberOfItemsPerPageList[0];
	let numberOfPages = Math.ceil(videoFiles.length / numberOfItemsPerPage);
	let paginationFrom = paginationPage * numberOfItemsPerPage;
	let paginationTo = Math.min((paginationPage + 1) * numberOfItemsPerPage, videoFiles.length);

	onMount(() => {
		updatePaginationFiles();
	});

	//* Update the current pagination page
	const setPaginationPage = (page) => {
		if (page < 0) {
			paginationPage = 0;
		} else if (page >= numberOfPages) {
			paginationPage = numberOfPages - 1;
		} else {
			paginationPage = page;
		}

		updatePaginationFiles();
	};

	const updatePaginationFiles = () => {
		paginatedFiles = videoFiles.slice(paginationPage * numberOfItemsPerPage, paginationPage * numberOfItemsPerPage + numberOfItemsPerPage);
	};
</script>

<section class="card h-fit scale-in-center">
	<div class="p-4">
		<p class="font-bold my-1">GPS Table View:</p>
		{#if paginatedFiles.length}
			<table class="table w-full rounded-lg">
				<thead>
					<tr>
						<th>Video</th>
						<th>Video Name</th>
						<th>Created Time</th>
						<th>Owner</th>
						<th>Saved On</th>
						<th>Size</th>
						<th>Options</th>
					</tr>
				</thead>
				<tbody>
					{#each paginatedFiles as videoFile}
						{#if videoFile.fileExtension === "MP4" || videoFile.fileExtension === "mp4"}
							<tr>
								<td class="w-64">
									{#if videoFile.webViewLink && videoFile.thumbnailLink}
										<a href={videoFile.webViewLink} target="_blank" class="text-white text-xl  borderRounded">
											<img
												src={videoFile.thumbnailLink}
												onerror="https://i.picsum.photos/id/870/200/300.jpg?blur=2&grayscale&hmac=ujRymp644uYVjdKJM7kyLDSsrqNSMVRPnGU99cKl6Vs"
												alt="Dashcam"
												class="h-full w-auto object-cover rounded-lg"
											/>
										</a>
									{/if}
								</td>
								<td>{videoFile.name}</td>
								<td>{videoFile.createdTime}</td>
								<td>{videoFile.owners[0].displayName}</td>
								<td>
									<div class="flex flex-wrap justify-center  ">
										{#each PROGRAMMING_TOOLS as tool}
											<img height="100" width="auto" title={tool} key={tool} class={`img-icon w-8 mx-2 py-2`} alt="" src={returnLinkGivenIfStringContains(tool)} loading="lazy" />
										{/each}
									</div>
								</td>
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
											on:click={() => openModel("Delete Google Drive Recording", "Do you want to delete the Google Drive Recording?", "Delete Recording", deleteDriveFile, videoFile)}
										>
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

			<hr class="my-4" />
			<p>{`${paginationFrom + 1}-${paginationTo} of ${videoFiles.length}`}</p>
			<div class="flex items-center space-x-2 mt-2">
				<button on:click={() => setPaginationPage(paginationPage - 1)} class="px-4 py-2  btn-pagination"> Previous </button>
				{#each Array(numberOfPages) as _, index (index)}
					<button on:click={() => setPaginationPage(index)} class={`px-4 py-2 ${paginationPage === index ? "btn-pagination-primary font-bold " : "btn-pagination"}`}>
						{index}
					</button>
				{/each}
				<button on:click={() => setPaginationPage(paginationPage + 1)} class="px-4 py-2  btn-pagination "> Next </button>
			</div>
		{:else}
			<div class="alert alert-red my-1" role="alert">No Google Drive Files Found.</div>
		{/if}
	</div>
</section>
