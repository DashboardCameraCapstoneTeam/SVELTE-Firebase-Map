<script>
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
	import ChartView from "components/menu/Chart.svelte";
	import { collection, query, orderBy, doc, getDocs } from "firebase/firestore";
	import { db } from "config/firebase.js";
	import { gpsJsonToGeojson } from "utils/geojson-utils.js";

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
		displayName: "Waterdown",
		center: [-79.906, 43.332],
		zoom: 12,
		pitch: 45,
		bearing: -17.6,
	};

	let gpsData = null;
	let gpsFilters = [{ id: "Count", name: "Pothole Count Filter", default: [0, 20], step: 1, suffix: "", selected: [0, 20] }];

	const fetchInitialMapData = async () => {
		try {
			const docRef = doc(db, "users", user.uid);
			const colRef = query(collection(docRef, "potholes"), orderBy("date_time_analyzed", "desc"));
			let tempList = [];
			const querySnapshot = await getDocs(colRef);
			querySnapshot.forEach((doc) => {
				let tempDate = doc.data()["date_time_analyzed"];
				tempDate = convertDateTimeToString(tempDate);
				const potholeData = doc.data();

				tempList.push(potholeData);
			});

			return tempList;
		} catch (e) {
			console.log(e);
		}
	};

	let isLoading = false;
	let isError = false;

	let menuComponents = [
		{ id: 0, title: "Date Time", icon: "fa-calendar-days" },
		{ id: 1, title: "Street View", icon: "fa-road" },
		{ id: 2, title: "Filter View", icon: "fa-filter" },
		{ id: 3, title: "Chart View", icon: "fa-chart-simple" },
	];
	let selectedMenu = 0;

	const fetchData = async () => {
		isLoading = true;
		isError = false;

		const gpsRawData = await fetchInitialMapData();
		if (gpsRawData === null) {
			isError = true;
			isLoading = false;
			return;
		}

		if (gpsRawData.length > 0) {
			console.log( gpsJsonToGeojson(gpsRawData));
			gpsData = gpsJsonToGeojson(gpsRawData);
		} else {
			gpsData = null;
		}
		isError = false;
		isLoading = false;
	};

	import { convertDateTimeToString } from "utils/date-time-converter";
	import { auth, googleProvider } from "config/firebase";
	import { authState } from "rxfire/auth";
	import { onDestroy } from "svelte";

	let unsubscribe = authState(auth).subscribe((u) => (user = u));
	onDestroy(unsubscribe);

	const login = () => {
		try {
			auth.signInWithPopup(googleProvider);
		} catch (err) {
			console.log(err);
		}
	};

	const signOut = () => {
		auth.signOut();
	};
</script>

{#if user}
	<Navbar bind:selectedMenu bind:menuComponents />

	<section class="grid grid-cols-1  md:grid-cols-12 grid-rows-6  gap-4 my-4 px-4 h-fit">
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

			<div class="col-span-1 md:col-span-1 row-span-1">
				<SearchDetails bind:cityDetails bind:dateTimeDictionary bind:selectedPolygon {fetchData} />
			</div>

			<div class="col-span-1 md:col-span-1 row-span-1">
				<section class="card h-fit scale-in-center">
					<p class="font-bold my-1">Profile Selection:</p>
					<button class="card-btn card-btn-red my-2" on:click={signOut}> Sign Out </button>
				</section>
			</div>
		</div>

		<div class="col-span-1 md:col-span-9  row-span-6 relative">
			<Map {cityDetails} bind:gpsFilters bind:gpsData bind:layerList bind:mapStyle bind:isReadyForStyleSwitching bind:selectedPolygon bind:pointOfInterest bind:selectedMenu />
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
{:else}
	<section class="grid grid-cols-1  md:grid-cols-12 grid-rows-6  gap-4 py-4 px-4 h-fit">
		<div class="col-span-1 md:col-span-3 row-span-1">
			<section class="h-full rounded-lg shadow-xl p-4 text-sm">
				<button class="card-btn card-btn-blue rounded-lg block w-full" on:click={login}> Signin with Google </button>
			</section>
		</div>
	</section>
{/if}

<style>
</style>
