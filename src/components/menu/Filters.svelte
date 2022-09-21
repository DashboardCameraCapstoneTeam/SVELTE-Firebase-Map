<script>
	import RangeSlider from "svelte-range-slider-pips";
	import AlertCard from "components/widget/AlertCard.svelte";
	export let gpsFilters;
	export let gpsData;

	const resetFilters = () => {
		let tempArray = gpsFilters;
		for (let i = 0; i < tempArray.length; i += 1) {
			tempArray[i].selected[0] = tempArray[i].default[0];
			tempArray[i].selected[1] = tempArray[i].default[1];
		}
		gpsFilters = tempArray;
	};
</script>

{#if gpsData === null}
	<AlertCard title="Filters" message="GPS Data has not been loaded." styleColor="red" />
{:else}
	<section class="card h-fit scale-in-center">
		<p class="font-bold my-1">Filters:</p>
		{#each gpsFilters as filterItem}
			<p class="font-bold my-1">{filterItem.name}:</p>

			<div class="py-1">
				<RangeSlider
					bind:values={filterItem.selected}
					pips
					min={filterItem.default[0]}
					max={filterItem.default[1]}
					step={filterItem.step}
					float
					suffix={filterItem.suffix}
					range
					first="label"
					last="label"
				/>
			</div>
		{/each}

		<button on:click={resetFilters} class={`card-btn card-btn-red  my-1 `}> Reset All Filters </button>
	</section>
{/if}
