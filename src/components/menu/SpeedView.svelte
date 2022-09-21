<script>
	import { speedColorSplit, speedColors } from "constants";
	import AlertCard from "components/widget/AlertCard.svelte";
</script>

{#if speedColors === null}
	<AlertCard title="Vehicle Speed Legend" message="Unable to load the legend, please try again." styleColor="red" />
{:else}
	<section class="card h-fit scale-in-center">
		<p class="font-bold my-1">Vehicle Speed Legend (Km/h):</p>
		<div class="overflow-auto h-64">
			{#each speedColors as speedColor, i}
				<p class="list-item my-1"><i class="dot" style={`--color:${speedColor}`} /> {i * speedColorSplit} - {(i + 1) * speedColorSplit - 1}</p>
			{/each}
		</div>
	</section>
{/if}
