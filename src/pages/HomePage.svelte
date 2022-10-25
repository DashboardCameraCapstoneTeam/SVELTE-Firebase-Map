<script>
	import Footer from "components/Footer.svelte";
	import Map from "components/map/Map.svelte";
	import SearchDetails from "components/SearchDetails.svelte";
	import DateTime from "components/menu/DateTime.svelte";
	import Layers from "components/map/Layers.svelte";
	import MapStyleSelector from "components/map/MapStyleSelector.svelte";
	import Filters from "components/menu/Filters.svelte";
	import StreetView from "components/menu/StreetView.svelte";
	import { fetchDataFromFirebase } from "service/google-firestore";
	import { gpsJsonToGeojson } from "utils/geojson-utils.js";
	import { googleSignIn } from "service/google-sign-in";
	import { accessToken } from "store/access-token-store.js";
	import Profile from "../components/menu/Profile.svelte";
	import { getGoogleDriveCoordFile } from "utils/filter-data.js";
	import { processWithMachineLearning, fetchGPSDataFromGoogleDrive } from "service/custom-api";
	import PageHeader from "../components/PageHeader.svelte";
	import AttentionBar from "../components/AttentionBar.svelte";
	import ButtonFlex from "../components/ButtonFlex.svelte";
	import Recordings from "../layout/Recordings.svelte";
	import Video from "../components/menu/Video.svelte";
  import SpeedView from "../components/menu/SpeedView.svelte";

	export let user;
	export let signOut;
	let accessTokenValue;
	accessToken.subscribe((value) => {
		accessTokenValue = value;
	});

	let isReadyForStyleSwitching = false;
	let pointOfInterest = null;
	let layerList = [];

	let dateTimeDictionary = {
		startDateTime: "2015-06-23T00:00",
		endDateTime: "2022-12-23T00:00",
	};

	let mapStyle = "satellite-streets-v11";
	let cityDetails = {
		id: 0,
		center: [-122.4194, 37.773972],
		zoom: 11,
		pitch: 0,
		bearing: -17.6,
	};

	let menuComponents = [
		{ id: 0, title: "Date Time", icon: "fa-calendar-days" },
		{ id: 1, title: "Street View", icon: "fa-road" },
		{ id: 2, title: "Filter View", icon: "fa-filter" },
		{ id: 3, title: "Profile", icon: "fa-user" },
		{ id: 4, title: "Video Player", icon: "fa-video" },
		{ id: 5, title: "Speed Legend", icon: "fa-gauge" },
	];
	let selectedMenu = menuComponents[0].id;

	let gpsData = [];
	let isLoading = false;
	let isError = false;

	const fetchFirebaseData = async () => {
		isLoading = true;
		isError = false;
		const response = await fetchDataFromFirebase(user, dateTimeDictionary);
		if (response.status === 200) {
			if (response.data.length >= 1) {
				gpsData = gpsJsonToGeojson(response.data);
				alert("Successfully loaded Firebase Data");
			} else {
				alert("No GPS data found");
			}
		} else {
			alert(response.message);
			isError = true;
		}
		isLoading = false;
	};

	let gpsFilters = [{ id: "Count", name: "Item Count Filter", default: [0, 20], step: 1, suffix: "", selected: [0, 20] }];

	const verifyAccessToken = async () => {
		if (accessTokenValue === null) {
			accessTokenValue = await googleSignIn();
			accessToken.set(accessTokenValue);
		}
	};

	let files = [];
	if (localStorage.getItem("Files")) {
		files = JSON.parse(localStorage.getItem("Files"));
	}

	function goTop() {
		document.body.scrollIntoView();
	}

	const fetchGPSDataForFile = async () => {
		isLoading = true;
		isError = false;
	
		const coordFile = getGoogleDriveCoordFile(selectedVideoFile, files);
		if (coordFile) {
			const response = await fetchGPSDataFromGoogleDrive(user, coordFile);
			if (response.status === 200) {
				if (response.data) {
					gpsData = gpsJsonToGeojson([response.data]);
					cityDetails = {
					id: 0,
					center:  gpsData[0].features[0].geometry.coordinates,
					zoom: 15,
					pitch: 0,
					bearing: -17.6,
				};
					alert("Added Trip to the Map");
				} else {
					alert("No GPS data found");
				}
			} else {
				alert(response);
				isError = true;
			}
		} else {
			alert("Coordinates File does not exist, but you can still view the video");
		}

		selectedMenu = 4;
		isLoading = false;
		goTop();
	};

	let selectedVideoFile = null;
	$: selectedVideoFile && fetchGPSDataForFile();
</script>

<PageHeader title={"Dashboard Camera Viewer"} color="bg-dark" zHeight="z-10" />
<AttentionBar
	message="Dashcam Viewer shows all of your trips data. It displays your
car's driving metrics on the screen as your video plays."
/>

<ButtonFlex bind:selectedMenu bind:menuComponents />

<section class="grid grid-cols-1  md:grid-cols-12 grid-rows-6  gap-4 my-4 px-4 h-fit ">
	<div class="col-span-1 md:col-span-6 row-span-6 grid grid-cols-1 md:grid-cols-1 gap-4 h-fit">

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
			<Profile bind:user {signOut} />
		</div>

		<div class={`col-span-1 md:col-span-1 row-span-1 ${selectedMenu === 4 ? "" : "hidden"}`}>
			<Video bind:selectedVideoFile />
		</div>

		<div class={`col-span-1 md:col-span-1 row-span-1 ${selectedMenu === 5 ? "" : "hidden"}`}>
			<SpeedView  />
		</div>

		<div class="col-span-1 md:col-span-1 row-span-1">
			<SearchDetails bind:dateTimeDictionary {fetchFirebaseData} />
		</div>

		
	</div>

	<div class="col-span-1 md:col-span-6  row-span-6 relative">
		<Map bind:cityDetails bind:gpsFilters bind:gpsData bind:isReadyForStyleSwitching bind:layerList bind:mapStyle bind:pointOfInterest bind:selectedMenu />
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

<Recordings bind:user bind:accessTokenValue {verifyAccessToken} bind:files bind:selectedVideoFile />

<Footer />
