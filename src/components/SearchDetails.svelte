<script >
	import area from '@turf/area'

	export let cityDetails;
	export let dateTimeDictionary;
	export let fetchData;
	export let selectedPolygon;

	let areaString = "0m";
	const calculateArea = () =>{
		try{
			const areaMeters = area(selectedPolygon);
			areaString = areaMeters < 1000000 ? (areaMeters).toFixed(2) + "m\xB2" : (areaMeters/1000000).toFixed(2) + "Km\xB2";
		}
		catch (err){
			areaString = "Error calculating area.";
		}	
	}
	$: selectedPolygon && calculateArea();
	
</script>

<section class="card h-fit scale-in-center">
	<p class="font-bold my-1">Selected Polygon:</p>

	{#if selectedPolygon === null}
		<div class="alert alert-red my-1" role="alert">Draw a polygon before searching.</div>
	{:else}
		<div class="alert alert-green my-1" role="alert">
			{areaString}
		</div>
	{/if}

	<p class="font-bold my-1">City:</p>
	<p>{cityDetails.displayName}</p>


	<p class="font-bold my-1">Search Polygon Vehicle Data:</p>

	{#if selectedPolygon === null || dateTimeDictionary.startDateTime === null || dateTimeDictionary.endDateTime === null }
		<div class="alert alert-red my-1" role="alert">Select a Date, Time, and Polygon before Searching.</div>
	{:else}
		<button class={`card-btn card-btn-green my-1`} on:click={fetchData}> Search Data </button>
	{/if}
</section>
