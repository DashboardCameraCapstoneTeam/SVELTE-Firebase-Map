<script>
	export let mapStyle;
	export let isReadyForStyleSwitching;
	const mapStyleList = [
		{ name: "Streets", id: "streets-v11" },
		{ name: "Dark", id: "dark-v10" },
		{ name: "Outdoors", id: "outdoors-v11" },
		{ name: "Satellite", id: "satellite-streets-v11" },
		{ name: "Dark - Traffic", id: "navigation-night-v1" },
	];

	const toggleStyle = (mapStyleItem) => {
		try {
			mapStyle = mapStyleItem;
			isReadyForStyleSwitching = true;
		} catch (e) {}
	};
</script>

<section class="card h-fit scale-in-center">
	<div class="p-4">
		<p class="font-bold my-1">Map Style:</p>

		{#each mapStyleList as mapStyleItem}
			<div key={mapStyleItem.id}>
				<input id={mapStyleItem.name} type="radio" value={mapStyleItem.id} checked={mapStyle === mapStyleItem.id} on:click={() => toggleStyle(mapStyleItem.id)} />
				<label class="ml-2" for={mapStyleItem.name}>{mapStyleItem.name}</label>
			</div>
		{/each}
	</div>

</section>
