<script>
	import AlertCard from "components/AlertCard.svelte";
	export let layerList = [];
	let showAllLayers = false;
	const toggleLayers = () => {
		try {
			//Change all the isShow values to true or false
			let tempCollection = layerList;
			tempCollection.map((layer) => {
				layer.isShown = showAllLayers;
				return layer;
			});
			layerList = tempCollection;
			showAllLayers = !showAllLayers;
		} catch (e) {
			alert('Unable to toggle Layers');
		}
	};
	const toggleLayer = (selectedLayer) => {
		try {
			// Get the object from the list and toggle the is shown
			let tempCollection = layerList;
			let index = tempCollection.findIndex((layer) => layer.name === selectedLayer.name);
			tempCollection[index].isShown = !tempCollection[index].isShown;
			layerList = tempCollection;
			if (checkIfAllLayersAreSame() === true) {
				showAllLayers = !tempCollection[index].isShown;
			}
		} catch (e) {
			alert('Unable to toggle Layer')
		}
	};
	const checkIfAllLayersAreSame = () => {
		let initialIsShown = layerList[0].isShown;
		return layerList.every((element) => element.isShown === initialIsShown);
	};
</script>
<section class="card h-fit scale-in-center">
	<div class="p-4">
		<p class="font-bold my-1">Layers:</p>
		<button on:click={toggleLayers} class={`card-btn   ${showAllLayers ? "card-btn-green" : " card-btn-red-outline"}  my-1 `}> {showAllLayers ? "Show All" : "Disable All"} </button>
		<div class="overflow-auto">
			{#each layerList as layer}
				<button key={layer.name} on:click={() => toggleLayer(layer)} class={`card-btn ${layer.isShown ? "card-btn-blue" : ""} my-1 `}>
					<i class="fa-solid {layer.icon} " />
					{layer.name}
				</button>
			{/each}
		</div>
	</div>
</section>