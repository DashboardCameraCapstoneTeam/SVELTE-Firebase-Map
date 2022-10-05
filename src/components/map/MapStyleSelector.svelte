<script>
	export let mapStyle;
	export let isReadyForStyleSwitching;
	const mapStyleList = [
		{ name: "Streets", id: "streets-v11", img: "https://assets.website-files.com/5e83362767d71ffd59a0c8a9/5ea01b977fb48a501b898a93_ipad-map%20streets.png" },
		{ name: "Dark", id: "dark-v10", img: "https://assets.website-files.com/5e83362767d71ffd59a0c8a9/5ea01810f9a5b1c55841ee6f_ipad-map%20dark.png" },
		{ name: "Outdoors", id: "outdoors-v11", img: "https://assets.website-files.com/5e83362767d71ffd59a0c8a9/5ea01bd0779fa266f900ba3c_ipad-map%20outdoors.png" },
		{ name: "Satellite", id: "satellite-streets-v11", img: "https://assets.website-files.com/5e83362767d71ffd59a0c8a9/6025417270820571127804d8_ipad-map.png" },
		{ name: "Dark - Traffic", id: "navigation-night-v1", img: "https://assets.website-files.com/5e83362767d71ffd59a0c8a9/5ea01810f9a5b1c55841ee6f_ipad-map%20dark.png" },
	];

	const toggleStyle = (mapStyleItem) => {
		try {
			mapStyle = mapStyleItem;
			isReadyForStyleSwitching = true;
		} catch (e) {}
	};
</script>

<section class="card h-fit scale-in-center">
	<p class="font-bold my-1">Map Style:</p>

	{#each mapStyleList as mapStyleItem}
		<div key={mapStyleItem.id}>
			<input id={mapStyleItem.name} type="radio" value={mapStyleItem.id} checked={mapStyle === mapStyleItem.id} on:click={() => toggleStyle(mapStyleItem.id)} />
			<label class="ml-2" for={mapStyleItem.name}>{mapStyleItem.name}</label>
		</div>
	{/each}
</section>
