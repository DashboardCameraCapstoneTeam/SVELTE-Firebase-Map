<script >

	export let dateTimeDictionary;
	export let fetchData;
</script>

<section class="card h-fit scale-in-center">

	<p class="font-bold my-1">Fetch Firebase Data:</p>

	{#if dateTimeDictionary.startDateTime === null || dateTimeDictionary.endDateTime === null }
		<div class="alert alert-red my-1" role="alert">Select a Date, Time before Searching.</div>
	{:else}
		<button class={`card-btn card-btn-green my-1`} on:click={fetchData}><i class="fa-solid fa-magnifying-glass"></i> Search Data </button>
	{/if}
</section>
