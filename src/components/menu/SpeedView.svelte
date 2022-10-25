<script>
	let speedColors = ["#fa6e6e", "#fa9b45", "#fbf01c", "#88ed02", "#13c600", "#00ba73", "#00a9d1", "#0093ff", "#0071ff", "#1800ff"];
</script>

<section class="card h-fit scale-in-center">
	<div class="p-4">
		<p class="font-bold my-1">Vehicle Speed Legend (Km/h):</p>
		<div class="overflow-auto h-64">
			{#each speedColors as speedColor, i}
				<p class="list-item my-1"><i class="dot" style={`--color:${speedColor}`} /> {i * 10} - {(i + 1) * 10 - 1}</p>
			{/each}
			<p class="list-item my-1"><i class="dot" style={`--color:${speedColors[speedColors.length-1]}`} /> 100+</p>
		</div>
	</div>
</section>
