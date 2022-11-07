<script>
	export let mapStyle;
	export let isReadyForStyleSwitching;
	let isLargeMenu = false;
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
		} catch (e) {
			alert("Unable to toggle Map Style");
		}
	};
	const toggleMenu = () => {
		isLargeMenu = !isLargeMenu;
	};
</script>

<div class="absolute top-2 left-2">
	<section class="card h-fit scale-in-center p-4">
		<button class="card-btn  my-1  text-center" on:click={toggleMenu}> <i class={`fa-solid ${isLargeMenu ? "fa-minimize" : "fa-expand"}`} /> </button>
		<p class=" my-1">Map Style:</p>
		{#if isLargeMenu === true}
			<div class="flex flex-col">
				{#each mapStyleList as mapStyleItem}
					<button class={`map-style my-1 ${mapStyle === mapStyleItem.id ? "map-style-selected" : ""}`} on:click={() => toggleStyle(mapStyleItem.id)}
						><img class="mapstyle-img" src={mapStyleItem.img} height="100" width="100" alt="" /></button
					>
				{/each}
			</div>
		{:else}
			{#each mapStyleList as mapStyleItem}
				<div key={mapStyleItem.id}>
					<input id={mapStyleItem.name} type="radio" value={mapStyleItem.id} checked={mapStyle === mapStyleItem.id} on:click={() => toggleStyle(mapStyleItem.id)} />
					<label class="ml-2" for={mapStyleItem.name}>{mapStyleItem.name}</label>
				</div>
			{/each}
		{/if}
	</section>
</div>
