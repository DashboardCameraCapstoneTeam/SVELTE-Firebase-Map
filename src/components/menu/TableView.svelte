<script>
	import { returnLinkGivenIfStringContains } from "utils/devicon.js";

	export let selectedFirebaseGPSData;
	export let openModel;
	export let deleteFirebaseElement;

	const PROGRAMMING_TOOLS = ["firebase-plain"];
</script>

<section class="card h-fit scale-in-center">
	<div class="p-4">
		<p class="font-bold my-1">GPS Table View:</p>
		{#if selectedFirebaseGPSData.length >= 1}
			<table class="table w-full rounded-lg">
				<thead>
					<tr>
						<th>Data Name</th>
						<th>Date Time</th>
						<th>Saved On</th>
						<th>Options</th>
					</tr>
				</thead>
				<tbody>
					{#each selectedFirebaseGPSData as gpsElement}
						<tr>
							<td>{gpsElement.dataName}</td>
							<td>{gpsElement.dateTime}</td>
							<td>
								<div class="flex flex-wrap justify-center  ">
									{#each PROGRAMMING_TOOLS as tool}
										<img height="100" width="auto" title={tool} key={tool} class={`img-icon w-8 mx-2 py-2`} alt="" src={returnLinkGivenIfStringContains(tool)} loading="lazy" />
									{/each}
								</div>
							</td>
							<td
								><button
									on:click={() => openModel("Delete Firebase Element", "Do you want to delete the Firebase GPS Data?", "Delete GPS Data", deleteFirebaseElement, gpsElement.dataId)}
									class={`card-btn btn-error-outline  `}><i class="fa-solid fa-trash " /> Delete</button
								></td
							>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<div class="alert alert-red my-1" role="alert">No Firebase GPS Data Selected.</div>
		{/if}
	</div>
</section>
