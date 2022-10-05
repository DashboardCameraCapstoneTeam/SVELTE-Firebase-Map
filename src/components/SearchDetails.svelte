<script>
	import AlertCard from "components/widget/AlertCard.svelte";
	export let dateTimeDictionary;
	export let fetchData;
</script>

{#if dateTimeDictionary.startDateTime === null || dateTimeDictionary.endDateTime === null}
	<AlertCard title="Fetch Firebase Data" message="Select a Date, Time before Searching." styleColor="red" />
{:else}
	<section class="card h-fit scale-in-center">
		<p class="font-bold my-1">Fetch Firebase Data:</p>
		<button class={`card-btn card-btn-green my-1`} on:click={fetchData}><i class="fa-solid fa-magnifying-glass" /> Search Data </button>
	</section>
{/if}
