<script>
	export let addGeojsonData;
	let value = '';
	let name = '';
	let color = '#e66465';

	let geojsonButtons = [
		{
			id: 0,
			title: 'Points',
			value: 'Point'
		},
		{
			id: 1,
			title: 'Polygons',
			value: 'Polygon'
		}
	];
	let selectedGeojsonButton = geojsonButtons[0];


	let showTerms = true;
	const toggleTerms = () => {
		showTerms = !showTerms;
	};
</script>

<section class="card h-fit scale-in-center p-4 w-[32rem]">
	<div class="flex flow-row justify-between my-1">
		<div>
			<p>Add GEOJSON Data:</p>
		</div>

		<div>
			<button on:click={toggleTerms} class="toggle-btn text-center hover:underline">
				{#if showTerms}
					<i class="fa-solid fa-arrow-up" />
					<span>Hide</span>
				{:else}
					<i class="fa-solid fa-arrow-down" />
					<span>Show</span>
				{/if}
			</button>
		</div>
	</div>


    {#if showTerms}

	<div>
		<hr class="my-2" />
		<input class="border w-full my-1 rounded-lg p-2" placeholder="GEOJSON Name" bind:value={name} />
		<div>
			<p>Data Color:</p>
			<input class="my-1" type="color" id="head" name="head" bind:value={color} />
		</div>

		<textarea class="border my-1 p-2" placeholder="Add GEOJSON Data" bind:value />

		<hr class="my-2" />

		<div class="flex flex-row gap-4">
			{#each geojsonButtons as geojsonButton}
				<button
					class={`card-btn ${geojsonButton === selectedGeojsonButton ?  'btn-primary' : 'btn-black-outline'} my-1`}
					on:click={() => selectedGeojsonButton = geojsonButton}
					><i class="fa-solid fa-plus " /> {geojsonButton.title}
				</button>
			{/each}
		</div>

       {#if value !== '' && name !== '' && color !== '' && selectedGeojsonButton}
         <!-- content here -->
     
		<button
			class={`card-btn btn-primary my-1`}
			on:click={() => addGeojsonData(value, name, selectedGeojsonButton.value, color)}
			><i class="fa-solid fa-plus " /> Add Geojson Data
		</button>

        {:else}
		<div class="alert alert-red my-1" role="alert">Add a name, select a color, and add GEOJSON Data</div>
	{/if}
	</div>

    {/if}
</section>

<style>
	textarea {
		width: 100%;
		height: 200px;
	}
</style>
