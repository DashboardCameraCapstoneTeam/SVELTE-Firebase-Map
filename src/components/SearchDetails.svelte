<script>
	export let dateTimeDictionary;
	export let fetchData;

	let searchMessage = 'Search'
	const setSearchMessage = () =>{
		if(dateTimeDictionary.startDateTime === '' || dateTimeDictionary.endDateTime === ''){
			searchMessage = 'Search without Date Time'
		}
		else{
			searchMessage = 'Search with Date Time'
		}
	}
	$: dateTimeDictionary && setSearchMessage();
</script>


<section class="card h-fit scale-in-center">
	<p class="font-bold my-1">Fetch Firebase Data:</p>
	<button class={`card-btn card-btn-green my-1`} on:click={fetchData}><i class="fa-solid fa-magnifying-glass" /> {searchMessage} </button>
</section>