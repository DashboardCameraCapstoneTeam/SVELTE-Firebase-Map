<script>
	import Footer from "components/Footer.svelte";
	import Map from "components/map/Map.svelte";
	import SearchDetails from "components/menu/SearchDetails.svelte";
	import Layers from "components/map/Layers.svelte";
	import MapStyleSelector from "components/map/MapStyleSelector.svelte";
	import StreetView from "components/menu/StreetView.svelte";
	import { fetchDataFromFirebase, deleteDocumentFromFirebase } from "service/google-firestore";
	import { gpsJsonToGeojson } from "utils/geojson-utils.js";
	import { googleSignIn } from "service/google-sign-in";
	import Profile from "components/menu/Profile.svelte";
	import { getGoogleDriveCoordFile } from "utils/filter-data.js";
	import { processWithMachineLearning, fetchGPSDataFromGoogleDrive } from "service/custom-api";
	import PageHeader from "components/Navbar.svelte";
	import AttentionBar from "components/AttentionBar.svelte";
	import MenuBar from "components/menu/MenuBar.svelte";
	import Video from "components/menu/Video.svelte";
	import SpeedChart from "components/menu/SpeedChart.svelte";
	import TableView from "components/menu/TableView.svelte";
	import ModalCard from "components/ModalCard.svelte";
	import MapLoadingSpinner from "components/map/MapLoadingSpinner.svelte";
	import MapError from "components/map/MapError.svelte";
	import { getDashcamVideos, deleteGoogleDriveFile, verifyAndAddPermissions} from "service/google-drive";
	import RecordingsCard from "components/recordings/RecordingsCard.svelte";
	import { sortBySizeSmallToLarge, sortBySizeLargeToSmall, sortByTimeRecentToOldest, sortByTimeOldestToRecent } from "utils/sorting-video-assets";
	import RecordingsMenuBar from "components/recordings/RecordingsMenuBar.svelte";
	import RecordingsTable from "../components/recordings/RecordingsTable.svelte";

	export let user;
	export let signOut;
	

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
		{ id: 0, title: "Profile", icon: "fa-user" },
		{ id: 1, title: "Firebase", icon: "fa-database" },
		{ id: 2, title: "Street View", icon: "fa-road" },
		{ id: 3, title: "Video Player", icon: "fa-video" },
	];
	let selectedMenu = menuComponents[0].id;
	let isLoading = false;
	let isError = false;
	let selectedFirebaseGPSData = [];

	function setSessionStorageWithExpiry(key, value){
		const now = new Date();
		const item = {
			value: value,
			expiry: now.getTime() + 3600000,
		};
		localStorage.setItem(key, JSON.stringify(item));
	}

	function getSessionStorageWithExpiry(key) {
		const itemStr = localStorage.getItem(key);
		if (!itemStr) {
			return null;
		}
		const item = JSON.parse(itemStr);
		const now = new Date();
		if (now.getTime() > item.expiry) {
			localStorage.removeItem(key);
			return null;
		}
		return item.value;
	}

	function setLocalStorageWithExpiry(key, data) {
		const now = new Date();
		const item = {
			value: data,
			expiry: now.getTime() + 3600000,
		};
		localStorage.setItem(key, JSON.stringify(item));
	}

	function getLocalStorageWithExpiry(key) {
		const itemStr = localStorage.getItem(key);
		if (!itemStr) {
			return [];
		}
		const item = JSON.parse(itemStr);
		const now = new Date();
		if (now.getTime() > item.expiry) {
			localStorage.removeItem(key);
			return [];
		}
		return item.value;
	}
	let gpsData = [];
	let accessTokenValue = getSessionStorageWithExpiry('AccessToken');
	let files = getLocalStorageWithExpiry("GoogleFiles");
	let selectedVideoFile = null;
	let selectedGPSData = null;

	const updateMapCenter = (coordinates) => {
		cityDetails = {
			id: 0,
			center: coordinates,
			zoom: 15,
			pitch: 0,
			bearing: -17.6,
		};
	};

	const fetchFirebaseData = async () => {
		isLoading = true;
		isError = false;
		const response = await fetchDataFromFirebase(user, dateTimeDictionary);
		if (response.status === 200) {
			if (response.data.length) {
				gpsData = gpsJsonToGeojson(response.data);
				updateMapCenter(gpsData[0].features[0].geometry.coordinates);
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
			updateMapCenter(gpsData[0].features[0].geometry.coordinates);
			selectedFirebaseGPSData = gpsData;
			alert("Successfully Deleted GPS Data");
		} else {
			console.log(response);
			alert(response);
			isError = true;
		}
	};
	const verifyAccessToken = async () => {
		const tempAccessToken = getSessionStorageWithExpiry('AccessToken');
		if (tempAccessToken === null) {
			accessTokenValue = await googleSignIn();
			setSessionStorageWithExpiry("AccessToken", accessTokenValue);
		}
	};

	function goTop() {
		document.body.scrollIntoView();
	}
	const fetchGPSDataForFile = async (videoFile) => {
		isLoading = true;
		isError = false;
		selectedVideoFile = videoFile;
		selectedMenu = 3;
		goTop();

		const verifyResponse = await verifyAndAddPermissions(accessTokenValue, videoFile.id);
		console.log(verifyResponse)
		if (verifyResponse.status === 200) {
			const coordFile = getGoogleDriveCoordFile(videoFile, files);
			if (coordFile) {
				const response = await fetchGPSDataFromGoogleDrive(user, coordFile);
				if (response.status === 200) {
					if (response.data) {
						gpsData = gpsJsonToGeojson([response.data]);
						updateMapCenter(gpsData[0].features[0].geometry.coordinates);
						selectedGPSData = gpsData[0];
						alert("Added Trip to the Map");
					} else {
						alert("No GPS data found");
					}
				} else {
					isError = true;
					alert(response);
				}
			} else {
				selectedGPSData = null;
				gpsData = [];
				alert("Coordinates File does not exist, but you can still view the video");
			}
		}

		isLoading = false;
	};

	const getDriveFiles = async () => {
		await verifyAccessToken();
		const response = await getDashcamVideos(accessTokenValue);
		if (response.status === 200) {
			if (response.data.files.length) {
				files = response.data.files;
				setLocalStorageWithExpiry("GoogleFiles", response.data.files);
				alert("Found Dashcam Files");
			} else {
				alert("No Dashcam Files found");
			}
		} else {
			alert(response.message);
		}
	};

	const checkAndSetFiles = () =>{
		if(!files.length){
			files = getDriveFiles();
		}
	}
	checkAndSetFiles();


	const deleteDriveFile = async (videoFile) => {
		await verifyAccessToken();
		let tempList = files;
		const coordFile = getGoogleDriveCoordFile(videoFile, files);
		if (coordFile) {
			const response = await deleteGoogleDriveFile(accessTokenValue, coordFile.id);
			if (response.status === 204) {
				tempList = tempList.filter((item) => item.id !== coordFile.id);
				alert("Successfully Deleted Google Drive Coordinates File");
			} else {
				alert("Cannot delete Google Drive Coordinates File");
			}
		}
		const response = await deleteGoogleDriveFile(accessTokenValue, videoFile.id);
		if (response.status === 204) {
			tempList = tempList.filter((item) => item.id !== videoFile.id);
			files = tempList;
			setLocalStorageWithExpiry("GoogleFiles", tempList);
			if (selectedVideoFile) {
				if (selectedVideoFile.id == videoFile.id) {
					selectedVideoFile = null;
				}
			}
			alert("Successfully Deleted Google Drive Video File");
		} else {
			alert("Cannot delete Google Drive Video File");
		}
	};
	const startMachineLearning = async (videoFile) => {
		const coordFile = getGoogleDriveCoordFile(videoFile, files);
		if (coordFile) {
			alert("Processing Dashcam Video. This will take some time, please wait");
			const response = await processWithMachineLearning(user, videoFile, coordFile);
			if (response.status === 200) {
				alert("Succesfully Processed Video");
			} else {
				alert(response.message);
			}
		} else {
			alert("Coordinates File does not exist");
		}
	};
	//* Sort the videos and reset the initial video list
	const sortBySizeASC = () => {
		const tempList = files;
		const sortedArray = sortBySizeSmallToLarge(tempList);
		files = sortedArray;
	};
	//* Sort the videos and reset the initial video list
	const sortBySizeDSC = () => {
		const tempList = files;
		const sortedArray = sortBySizeLargeToSmall(tempList);
		files = sortedArray;
	};
	//* Sort the videos and reset the initial video list
	const sortByTimeASC = () => {
		const tempList = files;
		const sortedArray = sortByTimeOldestToRecent(tempList);
		files = sortedArray;
	};
	//* Sort the videos and reset the initial video list
	const sortByTimeDSC = () => {
		const tempList = files;
		const sortedArray = sortByTimeRecentToOldest(tempList);
		files = sortedArray;
	};
	//* To reset the video list, use the sortByTimeRecentToOldest function
	const resetVideoList = () => {
		const tempList = files;
		const sortedArray = sortByTimeRecentToOldest(tempList);
		files = sortedArray;
	};
	let functionComponents = [
		{ id: 0, title: "Fetch Google Drive Data", icon: "fa-brands fa-google-drive", function: getDriveFiles },
		{ id: 1, title: "Sort by Size ASC", icon: "fa-solid fa-filter", function: sortBySizeASC },
		{ id: 2, title: "Sort by Size DSC", icon: "fa-solid fa-filter", function: sortBySizeDSC },
		{ id: 3, title: "Sort by Time ASC", icon: "fa-solid fa-filter", function: sortByTimeASC },
		{ id: 4, title: "Sort by Time DSC", icon: "fa-solid fa-filter", function: sortByTimeDSC },
		{ id: 5, title: "Reset Video List", icon: "fa-solid fa-clock-rotate-left", function: resetVideoList },
	];
</script>

{#if isModalOpen}
	<ModalCard bind:modalPayload />
{/if}
<PageHeader title={"Dashboard Camera Viewer"} color="bg-dark" zHeight="z-10" />
<AttentionBar
	message="Dashcam Viewer shows all of your trips data. It displays your
car's driving metrics on the screen as your video plays."
/>
<MenuBar bind:selectedMenu bind:menuComponents />
<main class="grid grid-cols-1 gap-4 lg:grid-cols-12 my-4 px-4">
	<div class={`col-span-1 lg:col-span-6 flex flex-col gap-4`}>
		<Layers bind:layerList />
		{#if selectedMenu === 0}
			<Profile bind:user {signOut} />
		{:else if selectedMenu === 1}
			<TableView bind:selectedFirebaseGPSData {openModel} {deleteFirebaseElement} />
			<SearchDetails bind:dateTimeDictionary {fetchFirebaseData} />
		{:else if selectedMenu === 2}
			<StreetView bind:pointOfInterest />
		{:else if selectedMenu === 3}
			<Video bind:selectedVideoFile />
			<SpeedChart bind:selectedGPSData />
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
<PageHeader title={"Recordings"} color="bg-dark" zHeight="z-10" />
<AttentionBar message="Load, view, and sort all Google Drive Recordings. Use Pagination to sort between videos." />
<RecordingsMenuBar bind:functionComponents />

<section class="grid grid-cols-1 gap-4 lg:grid-cols-12 my-4 px-4">
	{#if files.length}
		<div class="col-span-1 md:col-span-12">
			<RecordingsTable bind:files {openModel} {deleteDriveFile} {startMachineLearning} {fetchGPSDataForFile} />
		</div>
	{:else}
		<div class="col-span-1 md:col-span-3">
			<section class="card h-fit scale-in-center">
				<div class="p-4">
					<p class="font-bold my-1">Recordings:</p>
					<div class="alert alert-red my-1" role="alert">No Recordings Found</div>
				</div>
			</section>
		</div>
	{/if}
</section>
<Footer />
