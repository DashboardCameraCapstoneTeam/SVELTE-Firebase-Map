<script>
	import { onMount } from "svelte/internal";
	import { onDestroy } from "svelte";
	export let pointOfInterest;

	let streetViewObject = null;
	let streetViewContainer = null;

	const initializeStreetView = () => {
		try {
			streetViewObject = new google.maps.StreetViewPanorama(streetViewContainer, {
				position: pointOfInterest,
				pov: {
					heading: 34,
					pitch: 10,
				},
			});
		
		} catch (err) {
			alert(err);
		}
	};

	onMount(() => {
		try {
			if (pointOfInterest !== null) {
				initializeStreetView();
			}
		} catch (err) {
			alert(err);
		}
	});

	// When the location changes, set the new lat long to the map
	const onLocationChange = () => {
		try {
			streetViewObject === null ? initializeStreetView() : streetViewObject.setPosition(pointOfInterest);
		} catch (err) {
			alert(err);
		}
	};
	$: pointOfInterest && onLocationChange();

	onDestroy(() => {
		try {
			streetViewObject = null;
			streetViewContainer = null;
		} catch (e) {}
	});
</script>

<section class="card h-fit scale-in-center">
	<p class="font-bold my-1">Street View:</p>
	{#if pointOfInterest == null}
		<div class="alert alert-red my-1" role="alert">Select a point on the map.</div>
	{/if}
	<div bind:this={streetViewContainer} class={`${pointOfInterest == null ? "h-0" : "h-96"} w-full rounded-lg`} />
</section>
