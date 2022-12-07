<script>
	import { onMount } from "svelte";
	import { returnLinkGivenIfStringContains } from "utils/devicon.js";

	export let selectedFirebaseGPSData;
	export let openModel;
	export let deleteFirebaseElement;
	export let setGPSDataWithSelectedData;
	const PROGRAMMING_TOOLS = ["firebase-plain"];

	let firebaseDocuments = [];
	let paginatedDocuments = [];
	let paginationPage = 0;
	const numberOfItemsPerPageList = [5, 10, 20];
	let numberOfItemsPerPage = numberOfItemsPerPageList[0];
	let numberOfPages = 0;
	let paginationFrom = 0;
	let paginationTo = 0;

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
		firebaseDocuments = selectedFirebaseGPSData;
		numberOfPages = Math.ceil(firebaseDocuments.length / numberOfItemsPerPage);
		paginationFrom = paginationPage * numberOfItemsPerPage;
		paginationTo = Math.min((paginationPage + 1) * numberOfItemsPerPage, firebaseDocuments.length);
		paginatedDocuments = firebaseDocuments.slice(paginationPage * numberOfItemsPerPage, paginationPage * numberOfItemsPerPage + numberOfItemsPerPage);
	};

	$: selectedFirebaseGPSData && updatePaginationFiles();
</script>

<section class="card h-fit scale-in-center ">
	<div class="p-4">
		<p class="font-bold my-1">GPS Table View:</p>
		{#if selectedFirebaseGPSData.length}
	
		<div class="overflow-y-auto h-64">
			<table class="table-auto overflow-auto table w-full rounded-lg h-64">
				<thead >
					<tr class="sticky top-0">
						<th class="sticky">Data Name</th>

						<th class="sticky">Saved On</th>
						<th class="sticky">Options</th>
					</tr>
				</thead>
				<tbody>
					{#each paginatedDocuments as gpsElement}
						<tr>
							<td>{gpsElement.dataName}</td>
							
							<td>
								<div class="flex flex-wrap justify-center  ">
									{#each PROGRAMMING_TOOLS as tool}
										<img height="100" width="auto" title={tool} key={tool} class={`img-icon w-8 mx-2 py-2`} alt="" src={returnLinkGivenIfStringContains(tool)} loading="lazy" />
									{/each}
								</div>
							</td>
							<td>
								<div class="flex flex-row gap-4">
									<button class={`card-btn btn-primary my-1 w-fit`} on:click={() => setGPSDataWithSelectedData([gpsElement])}>
										<i class="fa-solid fa-eye" />
										
									</button>

									<button
										on:click={() => openModel("Delete Firebase Element", "Do you want to delete the Firebase GPS Data?", "Delete GPS Data", deleteFirebaseElement, gpsElement.dataId)}
										class={`card-btn btn-error-outline my-1 w-fit`}><i class="fa-solid fa-trash " /></button
									>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
			</div>


			<hr class="my-4" />
			<p>{`${paginationFrom + 1}-${paginationTo} of ${selectedFirebaseGPSData.length}`}</p>
			<div class="flex items-center space-x-2 mt-2">
				<button on:click={() => setPaginationPage(paginationPage - 1)} class="px-4 py-2  btn-pagination"> Previous </button>
				{#each Array(numberOfPages) as _, index (index)}
					<button on:click={() => setPaginationPage(index)} class={`px-4 py-2 ${paginationPage === index ? "btn-pagination-primary font-bold " : "btn-pagination"}`}>
						{index}
					</button>
				{/each}
				<button on:click={() => setPaginationPage(paginationPage + 1)} class="px-4 py-2  btn-pagination "> Next </button>
			</div>

			<hr class="my-4" />

			<button class={`card-btn btn-primary mx-1`} on:click={() => setGPSDataWithSelectedData(selectedFirebaseGPSData)}>
				<i class="fa-solid fa-refresh" />
				Refresh and only show All Firebase Data
			</button>
		{:else}
			<div class="alert alert-red my-1" role="alert">No Firebase GPS Data Selected.</div>
		{/if}
	</div>
</section>
