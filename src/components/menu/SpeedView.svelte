<script>
	export let selectedGPSData;
	let speedColors = ["#fa6e6e", "#fa9b45", "#fbf01c", "#88ed02", "#13c600", "#00ba73", "#00a9d1", "#0093ff", "#0071ff", "#1800ff"];
</script>

<section class="card h-full scale-in-center">
	<div class="p-4">
		<p class="font-bold my-1">Speed Legend (Km/h):</p>
		{#if selectedGPSData === null}
		<div class="alert alert-red my-1" role="alert">No GPS Data Selected.</div>
		{:else}
		<div class="overflow-auto h-full">
			{#each speedColors as speedColor, i}
				<p class="list-item my-2"><i class="dot" style={`--color:${speedColor}`} /> {i * 10} - {(i + 1) * 10 - 1}</p>
			{/each}
			<p class="list-item my-2"><i class="dot" style={`--color:${speedColors[speedColors.length-1]}`} /> 100+</p>
		</div>
		{/if}
	</div>
</section>
