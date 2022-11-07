<script>
	import Footer from "components/Footer.svelte";
	import Map from "components/map/Map.svelte";
	import SearchDetails from "components/menu/SearchDetails.svelte";
	import DateTime from "components/menu/DateTime.svelte";
	import Layers from "components/map/Layers.svelte";
	import MapStyleSelector from "components/map/MapStyleSelector.svelte";
	import StreetView from "components/menu/StreetView.svelte";
	import { fetchDataFromFirebase, deleteDocumentFromFirebase } from "service/google-firestore";
	import { gpsJsonToGeojson } from "utils/geojson-utils.js";
	import { googleSignIn } from "service/google-sign-in";
	import { accessToken } from "store/access-token-store.js";
	import Profile from "../components/menu/Profile.svelte";
	import { getGoogleDriveCoordFile } from "utils/filter-data.js";
	import { processWithMachineLearning, fetchGPSDataFromGoogleDrive } from "service/custom-api";
	import PageHeader from "../components/Navbar.svelte";
	import AttentionBar from "../components/AttentionBar.svelte";
	import ButtonFlex from "../components/menu/ButtonFlex.svelte";
	import Recordings from "./Recordings.svelte";
	import Video from "../components/menu/Video.svelte";
	import SpeedView from "../components/menu/SpeedView.svelte";
	import SpeedChart from "../components/menu/SpeedChart.svelte";
	import TableView from "../components/menu/TableView.svelte";
	import ModalCard from "../components/ModalCard.svelte";
	import MapLoadingSpinner from "../components/map/MapLoadingSpinner.svelte";
	import MapError from "../components/map/MapError.svelte";

	export let user;
	export let signOut;
	let accessTokenValue;
	accessToken.subscribe((value) => {
		accessTokenValue = value;
	});

	let isModalOpen = false;
	let modalPayload = {
		title: "",
		message: "",
		successFunction: null,
		successBtnMessage: "",
		element: null,
		cancelBtnMessage: "",
		cancelFunction: null,
	};
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
		{ id: 0, title: "Firebase", icon: "fa-database" },
		{ id: 1, title: "Street View", icon: "fa-road" },
		{ id: 2, title: "Profile", icon: "fa-user" },
		{ id: 3, title: "Video Player", icon: "fa-video" },
	];
	let selectedMenu = menuComponents[0].id;

	let gpsData = [];
	let isLoading = false;
	let isError = false;
	let selectedFirebaseGPSData = [];
	const fetchFirebaseData = async () => {
		isLoading = true;
		isError = false;
		const response = await fetchDataFromFirebase(user, dateTimeDictionary);
		if (response.status === 200) {
			if (response.documentList.length >= 1) {
				gpsData = gpsJsonToGeojson(response.documentList);
				cityDetails = {
					id: 0,
					center: gpsData[0].features[0].geometry.coordinates,
					zoom: 15,
					pitch: 0,
					bearing: -17.6,
				};
				selectedFirebaseGPSData = gpsData;
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

	const closeModal = () => {
		modalPayload = {
			title: "",
			message: "",
			successFunction: null,
			successBtnMessage: "",
			element: null,
			cancelBtnMessage: "",
			cancelFunction: null,
		};
		isModalOpen = false;
	};

	const openModel = (title = "Title", message = "Message", successBtnMessage = "Okay", successFunction = null, element = null, cancelBtnMessage = "Cancel", cancelFunction = closeModal) => {
		modalPayload = {
			title,
			message,
			successBtnMessage,
			successFunction,
			element,
			cancelBtnMessage,
			cancelFunction,
		};
		isModalOpen = true;
	};

	const deleteFirebaseElement = async (documentId) => {
		const response = await deleteDocumentFromFirebase(user, documentId);
		if (response.status === 200) {
			let tempGPSData = selectedFirebaseGPSData;
			tempGPSData = tempGPSData.filter((obj) => obj.dataId !== documentId);
			gpsData = tempGPSData;
			cityDetails = {
				id: 0,
				center: gpsData[0].features[0].geometry.coordinates,
				zoom: 15,
				pitch: 0,
				bearing: -17.6,
			};
			selectedFirebaseGPSData = gpsData;
			alert("Successfully Deleted GPS Data");
		} else {
			console.log(response);
			alert(response);
			isError = true;
		}
	};

	const verifyAccessToken = async () => {
		if (accessTokenValue === null) {
			accessTokenValue = await googleSignIn();
			accessToken.set(accessTokenValue);
		}
	};

	let files = [];
	let selectedVideoFile = null;
	let selectedGPSData = null;

	function goTop() {
		document.body.scrollIntoView();
	}

	const fetchGPSDataForFile = async (videoFile) => {
		isLoading = true;
		isError = false;
		selectedVideoFile = videoFile;

		goTop();
		const coordFile = getGoogleDriveCoordFile(videoFile, files);
		if (coordFile) {
			const response = await fetchGPSDataFromGoogleDrive(user, coordFile);
			if (response.status === 200) {
				if (response.data) {
					gpsData = gpsJsonToGeojson([response.data]);
					cityDetails = {
						id: 0,
						center: gpsData[0].features[0].geometry.coordinates,
						zoom: 15,
						pitch: 0,
						bearing: -17.6,
					};
					selectedGPSData = gpsData[0];
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
			selectedGPSData = null;
			gpsData = [];
		}

		selectedMenu = 3;
		isLoading = false;
		
	};
</script>

{#if isModalOpen}
	<ModalCard bind:modalPayload />
{/if}

<PageHeader title={"Dashboard Camera Viewer"} color="bg-dark" zHeight="z-10" />
<AttentionBar
	message="Dashcam Viewer shows all of your trips data. It displays your
car's driving metrics on the screen as your video plays."
/>

<ButtonFlex bind:selectedMenu bind:menuComponents />

<main class="grid grid-cols-1 gap-4 lg:grid-cols-12 my-4 px-4">
	<div class="col-span-1 md:col-span-6 row-span-6 grid grid-cols-1 md:grid-cols-3 gap-4 h-fit">
		<div class="col-span-1 md:col-span-3 row-span-1">
			<Layers bind:layerList />
		</div>

		{#if selectedMenu === 0}
			<div class="col-span-1 md:col-span-3 row-span-1">
				<TableView bind:selectedFirebaseGPSData {openModel} {deleteFirebaseElement} />
			</div>

			<div class="col-span-1 md:col-span-3 row-span-1">
				<DateTime bind:dateTimeDictionary />
			</div>
			<div class="col-span-1 md:col-span-3 row-span-1">
				<SearchDetails bind:dateTimeDictionary {fetchFirebaseData} />
			</div>
		{/if}

		<div class={`col-span-1 md:col-span-3 row-span-1 ${selectedMenu === 1 ? "" : "hidden"}`}>
			<StreetView bind:pointOfInterest />
		</div>

		{#if selectedMenu === 2}
			<div class={`col-span-1 md:col-span-3 row-span-1 `}>
				<Profile bind:user {signOut} />
			</div>
		{/if}

		{#if selectedMenu === 3}
			<div class={`col-span-1 md:col-span-3 row-span-1 `}>
				<Video bind:selectedVideoFile />
			</div>

			<div class="col-span-1 md:col-span-2 row-span-1">
				<SpeedChart bind:selectedGPSData />
			</div>

			<div class={`col-span-1 md:col-span-1 row-span-1 `}>
				<SpeedView bind:selectedGPSData />
			</div>
		{/if}
	</div>

	<div class="col-span-1 md:col-span-6  row-span-6 relative">
		<Map bind:cityDetails bind:gpsData bind:isReadyForStyleSwitching bind:layerList bind:mapStyle bind:pointOfInterest bind:selectedMenu />

		<MapStyleSelector bind:mapStyle bind:isReadyForStyleSwitching />

		{#if isLoading === true}
			<MapLoadingSpinner />
		{/if}

		{#if isError === true}
			<MapError />
		{/if}
	</div>
</main>

<Recordings {openModel} bind:user bind:accessTokenValue {verifyAccessToken} bind:files bind:selectedVideoFile {fetchGPSDataForFile} />

<Footer />
