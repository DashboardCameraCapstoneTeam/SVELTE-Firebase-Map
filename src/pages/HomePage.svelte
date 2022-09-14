<script >
	import Navbar from "components/Navbar.svelte";
	import Footer from "components/Footer.svelte";
	import Map from "components/map/Map.svelte";
	import SearchDetails from "components/SearchDetails.svelte";
	import DateTime from "components/menu/DateTime.svelte";
	import Layers from "components/map/Layers.svelte";
	import MapStyleSelector from "components/map/MapStyleSelector.svelte";
	import Filters from "components/menu/Filters.svelte";
	import StreetView from "components/menu/StreetView.svelte";
	import SpeedView from "components/menu/SpeedView.svelte";
	import ChartView from "components/menu/Chart.svelte"
	import ProfileView from "components/Profile.svelte";
	import { gpsJsonToGeojson } from "utils/geojson-utils.js";
	import { getDataWithAxios } from "utils/fetch-data.js";
	
	export let user;
	let pointOfInterest = null;
	let layerList = [];
	let selectedPolygon = null;

	let dateTimeDictionary = {
		startDateTime: "2015-06-23T00:00",
		endDateTime: "2022-12-23T00:00",
	};

	let mapStyle = "dark-v10";
	let isReadyForStyleSwitching = false;
	let cityDetails = {
		id: 0,
		photoURL: "https://www.meme-arsenal.com/memes/bd75c0339be8bbe24aeecd9c64764321.jpg",
		displayName: "Kingston",
		center: [ -76.500000, 44.233334],
		zoom: 15,
		pitch: 45,
		bearing: -17.6,
	};
	

	let gpsData = null;
	let gpsFilters = [
		{id:"gpsSpeed", name:"Speed Filter", default: [0,300], step: 10 , suffix: "Km/h", selected:[0,300]},
		{id:"gpsReason", name:"Reason Filter", default: [0,50], step : 5, suffix: "", selected:[0,50]},
		{id:"gpsValid", name:"Valid Filter", default: [0,1] , step : 1, suffix: "", selected:[0,1]},
		{id:"gpsIgnition", name:"Ignition Filter", default: [0,1], step : 1 , suffix: "", selected:[0,1]}
	]


	let isLoading = false;
	let isError = false;
	
	let menuComponents = [
		{id : 0, title: "Date Time", icon: "fa-calendar-days"},
		{id : 1, title: "Street View", icon: "fa-road"},
		{id : 2, title: "Filter View", icon: "fa-filter"},
		{id : 3, title: "Speed View", icon: "fa-gauge"},
		{id : 4, title: "Chart View", icon: "fa-chart-simple"},
		{id: 5, title: "Profile", icon: "fa-user"},
	]
	let selectedMenu = 0;

	const fetchData = async () => {
		isLoading = true;
		isError = false;
		
		let payload = {
			timeFrom: new Date(`${dateTimeDictionary.startDateTime}`),
			timeTo: new Date(`${dateTimeDictionary.endDateTime}`),
			polygon: JSON.stringify(selectedPolygon.geometry),
			deviceId: ['CK20520033']
		};

		const gpsRawData = await getDataWithAxios();
		if (gpsRawData === null) {
			isError = true;
			isLoading = false;
			return;
		}

		if (gpsRawData.length > 0) {
			alert("Data found!");	
			gpsData = gpsJsonToGeojson(gpsRawData);
		} else {
			alert("No data found!");
			gpsData = null;
		}
		isError = false;
		isLoading = false;
	};


</script>

<Navbar bind:selectedMenu bind:menuComponents />


<section class="grid grid-cols-1  md:grid-cols-12 grid-rows-6  gap-4 my-4 px-4 h-fit">
	<div class="col-span-1 md:col-span-3 row-span-6 grid grid-cols-1 md:grid-cols-1 gap-4 h-fit">
			<div class="col-span-1 md:col-span-1 row-span-1">
				<Layers bind:layerList />
			</div>

		
			<div class={`col-span-1 md:col-span-1 row-span-1 ${ selectedMenu === 0 ? '': 'hidden'}`}>
				<DateTime bind:dateTimeDictionary />
			</div>

			<div class={`col-span-1 md:col-span-1 row-span-1 ${ selectedMenu === 1 ? '': 'hidden'}`}>
				<StreetView bind:pointOfInterest />
			</div>

			<div class={`col-span-1 md:col-span-1 row-span-1 ${ selectedMenu === 2 ? '': 'hidden'}`}>
				<Filters bind:gpsFilters  bind:gpsData/>
			</div>

			<div class={`col-span-1 md:col-span-1 row-span-1 ${ selectedMenu === 3 ? '': 'hidden'}`}>
				<SpeedView />
			</div>

			<div class={`col-span-1 md:col-span-1 row-span-1 ${ selectedMenu === 4 ? '': 'hidden'}`}>
				<ChartView bind:gpsData />
			</div>

		
			<div class={`col-span-1 md:col-span-1 row-span-1 ${ selectedMenu === 5 ? '': 'hidden'}`}>
				<ProfileView user={user}/>
			</div>
		
			


		<div class="col-span-1 md:col-span-1 row-span-1">
			<SearchDetails bind:cityDetails bind:dateTimeDictionary bind:selectedPolygon {fetchData} />
		</div>
	</div>

	<div class="col-span-1 md:col-span-9  row-span-6 relative">
		<Map
			{cityDetails}
			bind:gpsFilters
			bind:gpsData
			bind:layerList
			bind:mapStyle
			bind:isReadyForStyleSwitching
			bind:selectedPolygon
			bind:pointOfInterest
			bind:selectedMenu
		/>
		<div class="absolute top-1 left-1 ">
			<MapStyleSelector bind:mapStyle bind:isReadyForStyleSwitching />
		</div>

		{#if isLoading === true}
			<div class="absolute top-0 z-100 map-loading rounded-lg">
				<p class="align-middle">Loading Data...</p>
			</div>
		{/if}

		{#if isError === true}
			<div class="absolute top-0 z-100 map-error rounded-lg">
				<p class="align-middle">Error, unable to Fetch Data</p>
			</div>
		{/if}
	</div>
</section>
<Footer />

<style>
</style>
