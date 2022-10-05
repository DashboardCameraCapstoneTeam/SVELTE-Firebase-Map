<script>
	import MapHeader from "components/map/MapHeader.svelte";
	import Footer from "components/Footer.svelte";
	import Map from "components/map/Map.svelte";
	import SearchDetails from "components/SearchDetails.svelte";
	import DateTime from "components/menu/DateTime.svelte";
	import Layers from "components/map/Layers.svelte";
	import MapStyleSelector from "components/map/MapStyleSelector.svelte";
	import Filters from "components/menu/Filters.svelte";
	import StreetView from "components/menu/StreetView.svelte";
	import ChartView from "components/menu/Chart.svelte";
	import { fetchPotholeDataFromFirebase } from "service/fetch-firestore";
	import { gpsJsonToGeojson } from "utils/geojson-utils.js";
	import { getDashcamVideos, deleteDashcamVideo } from "service/google-drive";
	import { googleSignIn } from "service/google-sign-in";
	import { accessToken } from 'store/access-token-store.js';
	import Card from "components/files/Card.svelte";
	import RecordingsHeader from "components/files/RecordingsHeader.svelte";
	import AlertCard from "components/widget/AlertCard.svelte";
  import Profile from "../components/menu/Profile.svelte";

	export let user = null;
	let accessTokenValue;
	accessToken.subscribe(value => {
		accessTokenValue = value;
	});
	export let signOut;
	let isReadyForStyleSwitching = false;
	let pointOfInterest = null;
	let layerList = [];

	let dateTimeDictionary = {
		startDateTime: "2015-06-23T00:00",
		endDateTime: "2022-12-23T00:00",
	};

	let mapStyle = "dark-v10";
	let cityDetails = {
		id: 0,
		center: [-79.906, 43.332],
		zoom: 12,
		pitch: 45,
		bearing: -17.6,
	};

	let menuComponents = [
		{ id: 0, title: "Date Time", icon: "fa-calendar-days" },
		{ id: 1, title: "Street View", icon: "fa-road" },
		{ id: 2, title: "Filter View", icon: "fa-filter" },
		{ id: 3, title: "Chart View", icon: "fa-chart-simple" },
		{ id: 4, title: "Profile", icon: "fa-user" }
	];
	let selectedMenu = menuComponents[0].id;

	let gpsData = null;
	let isLoading = false;
	let isError = false;
	const fetchData = async () => {
		isLoading = true;
		isError = false;
		const gpsRawData = await fetchPotholeDataFromFirebase(user, dateTimeDictionary);
		if (gpsRawData === null) {
			isError = true;
		} else {
			gpsData = gpsRawData.length > 0 ? gpsJsonToGeojson(gpsRawData) : alert("No Data Found");
		}
		isLoading = false;
	};

	let gpsFilters = [{ id: "Count", name: "Pothole Count Filter", default: [0, 20], step: 1, suffix: "", selected: [0, 20] }];

	let files = null;
	

	const getDriveFiles = async () => {
		if (accessTokenValue === null) {
			accessTokenValue = await googleSignIn();
		}
		const results = await getDashcamVideos(accessTokenValue);

		if (results === null) {
			files = [];
		} else {
			files = results;
			console.log("App.js | files", results);
			accessToken.set(accessTokenValue)
		}
	};

	const deleteDriveFile = async (fileId) => {
		if (accessTokenValue === null) {
			accessTokenValue = await googleSignIn();
		}
		const results = await deleteDashcamVideo(accessTokenValue, fileId);
		if(results.status === 204){
			let tempList = files;
			tempList = tempList.filter(item => item.id !== fileId);
			files = tempList;
			accessToken.set(accessTokenValue)
		}
	}

	fetchData();
</script>

<MapHeader bind:selectedMenu bind:menuComponents />

<section class="grid grid-cols-1  md:grid-cols-12 grid-rows-6  gap-4 my-4 px-4 h-fit ">
	<div class="col-span-1 md:col-span-3 row-span-6 grid grid-cols-1 md:grid-cols-1 gap-4 h-fit">
		<div class="col-span-1 md:col-span-1 row-span-1">
			<Layers bind:layerList />
		</div>

		<div class={`col-span-1 md:col-span-1 row-span-1 ${selectedMenu === 0 ? "" : "hidden"}`}>
			<DateTime bind:dateTimeDictionary />
		</div>

		<div class={`col-span-1 md:col-span-1 row-span-1 ${selectedMenu === 1 ? "" : "hidden"}`}>
			<StreetView bind:pointOfInterest />
		</div>

		<div class={`col-span-1 md:col-span-1 row-span-1 ${selectedMenu === 2 ? "" : "hidden"}`}>
			<Filters bind:gpsFilters bind:gpsData />
		</div>

		<div class={`col-span-1 md:col-span-1 row-span-1 ${selectedMenu === 3 ? "" : "hidden"}`}>
			<ChartView bind:gpsData />
		</div>

		<div class={`col-span-1 md:col-span-1 row-span-1 ${selectedMenu === 4 ? "" : "hidden"}`}>
			<Profile bind:user {signOut} />
		</div>

		<div class="col-span-1 md:col-span-1 row-span-1">
			<SearchDetails bind:dateTimeDictionary {fetchData} />
		</div>

		
	</div>

	<div class="col-span-1 md:col-span-9  row-span-6 relative">
		<Map {cityDetails} bind:gpsFilters bind:gpsData bind:isReadyForStyleSwitching bind:layerList bind:mapStyle bind:pointOfInterest bind:selectedMenu />
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

<RecordingsHeader {getDriveFiles} />
<section class="grid grid-cols-1  md:grid-cols-12  gap-4 my-4 px-4 h-fit divide-x-1 divide-teal-600 ">
	{#if files === null}
		<div class="col-span-1 md:col-span-3">
			<AlertCard title="Recordings" message="Records have not been fetched." styleColor="red" />
		</div>
	{:else if files.length <= 0}
		<div class="col-span-1 md:col-span-3">
			<AlertCard title="Recordings" message="No Recordings found." styleColor="red" />
		</div>
	{:else}
		{#each files as file}
			{#if file.fileExtension === "MP4" || file.fileExtension === "jpg"}
				<div class="col-span-1 md:col-span-3">
					<Card bind:file {deleteDriveFile}/>
				</div>
			{/if}
		{/each}
	{/if}
</section>

<Footer />
