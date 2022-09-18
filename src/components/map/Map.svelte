<script>
	import { onMount } from "svelte";
	import { onDestroy } from "svelte";
	import { getObjectsWhereKeyEqualsValue, removeObjectWhereValueEqualsString, checkIfElementExists } from "utils/filter-data.js";

	export let layerList;
	export let mapStyle;
	export let cityDetails;
	export let pointOfInterest;
	export let gpsData;
	export let gpsFilters;
	export let selectedMenu;
	export let isReadyForStyleSwitching;
	let map = null;
	let isInitialDataLoaded = false;
	const smallPopup = new mapboxgl.Popup();


	const createElement = (layerName, sourceName, type, isShown, faIcon, data) => {
		let tempList = layerList;

		//Remove the old layer and source data
		const hasElement = checkIfElementExists(tempList, "layerName", layerName);
		if (hasElement) {
			tempList = removeObjectWhereValueEqualsString(tempList, "layerName", layerName);
			if (map.getLayer(layerName)) {
				map.removeLayer(layerName);
				map.removeSource(sourceName);
			}
		}

		//Create the new element and change the layer list
		const element = { id: tempList.length, icon: faIcon, type: type, isShown: isShown, name: layerName, layerName: layerName, sourceName: sourceName, data: data };
		tempList.push(element);
		layerList = tempList;
		return element;
	};

	const fetchInitialMapData = async () => {
		try {
			createElement("3D-Buildings", "composite", "Polygon", true, "fa-building", null);	
		} catch (e) {
			console.error(e);
		}
	};

	const addMapSource = (layerListElement) => {
		try {
			map.addSource(layerListElement.sourceName, {
				type: "geojson",
				data: layerListElement.data,
			});
		} catch (e) {
			console.error(e);
		}
	};

	const addDataSources = () => {
		try {
			//Get the elements
			const BuildingsElement = getObjectsWhereKeyEqualsValue(layerList, "layerName", "3D-Buildings")[0];

			//Add the layer
			addTerrainLayer();
			addBuildingLayer(BuildingsElement);
			isInitialDataLoaded = true;
		} catch (e) {
			console.error(e);
		}
	};

	const addTerrainLayer = () => {
		map.addSource("mapbox-dem", {
			type: "raster-dem",
			url: "mapbox://mapbox.mapbox-terrain-dem-v1",
			tileSize: 512,
			maxzoom: 14,
		});
		map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });

		// add a sky layer that will show when the map is highly pitched
		map.addLayer({
			id: "sky",
			type: "sky",
			paint: {
				"sky-type": "atmosphere",
				"sky-atmosphere-sun": [0.0, 0.0],
				"sky-atmosphere-sun-intensity": 15,
			},
		});
	};

	const addBuildingLayer = (fillList, opacity = 1, color = "#dee7e7") => {
		map.addLayer({
			id: fillList.layerName,
			source: fillList.sourceName,
			"source-layer": "building",
			filter: ["==", "extrude", "true"],
			type: "fill-extrusion",
			minzoom: 15,
			paint: {
				"fill-extrusion-color": color,
				"fill-extrusion-height": ["interpolate", ["linear"], ["zoom"], 15, 0, 15.05, ["get", "height"]],
				"fill-extrusion-base": ["interpolate", ["linear"], ["zoom"], 15, 0, 15.05, ["get", "min_height"]],
				"fill-extrusion-opacity": opacity,
			},
		});
	};

	const addPolygonLayer = (fillList, opacity = 0.5, color = "red") => {
		map.addLayer({
			id: fillList.layerName,
			type: "fill",
			source: fillList.sourceName,
			paint: {
				"fill-color": color, // blue color fill
				"fill-opacity": opacity,
			},
		});
		map.setLayoutProperty(fillList.layerName, "visibility", "none");

		map.on("click", fillList.layerName, (e) => {
			let description = "";
			const sliced = Object.fromEntries(Object.entries(e.features[0].properties).slice(0, 4));
			for (const [key, value] of Object.entries(sliced)) {
				description += `<span class="block font-bold">${key}</span><span class="block">${value}</span>`;
			}
			smallPopup.setLngLat(e.lngLat).setHTML(description).addTo(map);
		});

		// Change the cursor to a pointer when the mouse is over the places layer.
		map.on("mouseenter", fillList.layerName, () => {
			map.getCanvas().style.cursor = "pointer";
		});

		// Change it back to a pointer when it leaves.
		map.on("mouseleave", fillList.layerName, () => {
			map.getCanvas().style.cursor = "";
		});
	};

	const addLineLayer = (fillList, lineWidth = 4, color = "red") => {
		map.addLayer({
			id: fillList.layerName,
			type: "line",
			source: fillList.sourceName,
			layout: {
				"line-join": "round",
				"line-cap": "round",
			},
			paint: {
				"line-color": color,
				"line-width": lineWidth,
			},
		});

		map.on("click", fillList.layerName, (e) => {
			let description = "";
			const sliced = Object.fromEntries(Object.entries(e.features[0].properties).slice(0, 4));
			for (const [key, value] of Object.entries(sliced)) {
				description += `<span class="block font-bold">${key}</span><span class="block">${value}</span>`;
			}
			smallPopup.setLngLat(e.lngLat).setHTML(description).addTo(map);
		});

		// Change the cursor to a pointer when the mouse is over the places layer.
		map.on("mouseenter", fillList.layerName, () => {
			map.getCanvas().style.cursor = "pointer";
		});

		// Change it back to a pointer when it leaves.
		map.on("mouseleave", fillList.layerName, () => {
			map.getCanvas().style.cursor = "";
		});
	};

	const addPointLayer = (fillList, pointSizeName, color = "blue") => {
		map.addLayer(
			{
				id: fillList.layerName,
				type: "circle",
				source: fillList.sourceName,
				minzoom: 12,

				paint: {
					"circle-radius": [
						"interpolate",
						["linear"],
						["zoom"],
						7,
						["interpolate", ["linear"], ["get", pointSizeName], 1, 2, 3, 4],
						16,
						["interpolate", ["linear"], ["get", pointSizeName], 3, 6, 9, 12],
					],

					"circle-color": color,
				},
			},
			"waterway-label"
		);
		map.setLayoutProperty(fillList.layerName, "visibility", "none");
		map.moveLayer(fillList.layerName);

		map.on("click", fillList.layerName, (e) => {
			let description = "";
			const sliced = Object.fromEntries(Object.entries(e.features[0].properties).slice(0, 8));
			for (const [key, value] of Object.entries(sliced)) {
				description += `<span class="block font-bold">${key}</span><span class="block">${value}</span>`;
			}

			smallPopup.setLngLat(e.lngLat).setHTML(description).addTo(map);
			pointOfInterest = { lat: e.lngLat.lat, lng: e.lngLat.lng };
		});

		// Change the cursor to a pointer when the mouse is over the places layer.
		map.on("mouseenter", fillList.layerName, () => {
			map.getCanvas().style.cursor = "pointer";
		});

		// Change it back to a pointer when it leaves.
		map.on("mouseleave", fillList.layerName, () => {
			map.getCanvas().style.cursor = "";
		});
	};



	const addExistingDynamicGPS = () => {
		if (map === null || gpsData === null) return;
		try {
			let gpsElement = getObjectsWhereKeyEqualsValue(layerList, "layerName", "Potholes")[0];
			addMapSource(gpsElement);
			addPointLayer(gpsElement, "Count", ["get", "Color"]);
		} catch (err) {
			console.log(err);
		}
	};

	const addNewDynamicGPS = () => {
		if (map === null || gpsData === null) return;
		try {
			let gpsElement = createElement("Potholes", "gpsSource", "Point", true, "fa-road", gpsData);
			addMapSource(gpsElement);
			addPointLayer(gpsElement, "Count", ["get", "Color"]);

		} catch (err) {
			console.log(err);
		}
	};

	//Switch the map style only if the map exists and the map is ready for switching styles
	const switchStyle = () => {
		if (map === null || isReadyForStyleSwitching === false) return;
		try {
			map.setStyle("mapbox://styles/mapbox/" + mapStyle);
		} catch (err) {
			console.log(err);
		}
	};

	const createFilterArray = () => {
		if (map === null || gpsData === false) return;
		let filterArray = ["all"];

		for (let i = 0; i < gpsFilters.length; i++) {
			let id = gpsFilters[i].id;
			let min = gpsFilters[i].selected[0];
			let max = gpsFilters[i].selected[1];

			let minArray = [">=", ["get", id], min];
			let maxArray = ["<=", ["get", id], max];
			filterArray.push(minArray);
			filterArray.push(maxArray);
		}

		return filterArray;
	};

	//GPS Filter shows and hides points on the map if the values change.
	//To add another filter use >, <, = and the value
	const addMapGPSFilters = () => {
		if (map === null || gpsData === null) return;
		let filterArray = createFilterArray();
		map.setFilter("Potholes", filterArray);
	};

	const addMapFilter = () => {
		// If map not loaded, abort
		if (map === null) return;
		try {
			// If any of the layers are not loaded, abort
			for (let i = 0; i < layerList.length; i += 1) {
				const tempLayerName = layerList[i].layerName;
				const tempLayerIsShown = layerList[i].isShown;

				if (!map.getLayer(tempLayerName)) {
					return;
				}

				if (tempLayerIsShown === true) {
					map.setLayoutProperty(tempLayerName, "visibility", "visible");
				} else {
					map.setLayoutProperty(tempLayerName, "visibility", "none");
				}
			}
		} catch (e) {}
	};


	const resizeMap = () =>{
		
		try{
			map.resize();
		}
		catch(err){
			console.log(err);
		}
		
	}

	$: map && selectedMenu !== null && resizeMap();
	$: map && mapStyle && isInitialDataLoaded && switchStyle();
	$: map && gpsData && isInitialDataLoaded && addNewDynamicGPS();

	onMount(async () => {
		mapboxgl.accessToken = "pk.eyJ1IjoiY2FuYWxlYWwiLCJhIjoiY2t6NmgzdGd0MTBhcTJ3bXprNjM1a3NsbiJ9.umUsk2Ky68kLBFUa6PeAxA";
		map = new mapboxgl.Map({
			center: cityDetails.center,
			zoom: cityDetails.zoom,
			pitch: cityDetails.pitch,
			bearing: cityDetails.bearing,
			container: "map",
			antialias: true,
			style: "mapbox://styles/mapbox/" + mapStyle,
		});

		// Get the initial Data
		await fetchInitialMapData();


		map.addControl(
			new MapboxGeocoder({
				accessToken: mapboxgl.accessToken,
				mapboxgl: mapboxgl,
			})
		);

		map.addControl(new mapboxgl.FullscreenControl(), "bottom-right");
		map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

		map.on("style.load", function () {
			addDataSources();
			if (gpsData !== null) addExistingDynamicGPS();
		});

		// Mapboxs normal way to show and hide layers. This calls the filter every second
		map.on("idle", () => {
			addMapFilter();
			if(gpsData != null ) addMapGPSFilters()
		
		});


		const interval = setInterval(function() {
			resizeMap();
		}, 2000);

		
	});

	onDestroy(() => {
		try {
			map.eachLayer(function (layer) {
				map.removeLayer(layer);
			});

			// Remove all the layers and data sources as they are cached and take up a lot of memory
			for (let i = 0; i < layerList.length; i++) {
				map.removeSource(layerList[i]["sourceName"]);
			}
			map = null;
		} catch (e) {}
	});
</script>

<div class="h-96 md:h-full scale-in-center"><div class="h-full rounded-lg" id="map" /></div>
