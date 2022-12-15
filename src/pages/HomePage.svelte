<script>
	import Footer from "components/Footer.svelte";
	import Map from "components/map/Map.svelte";
	import SearchDetails from "components/menu/SearchDetails.svelte";
	import Layers from "components/map/Layers.svelte";
	import MapStyleSelector from "components/map/MapStyleSelector.svelte";
	import { fetchDataFromFirebase, deleteDocumentFromFirebase, uploadDocumentToFirebase } from "service/google-firestore";
	import { gpsJsonToGeojson, rawGPSDataToGeojsonData, removeFeaturesUntilLessThan1MB } from "utils/geojson-utils.js";
	import { googleSignIn } from "service/google-sign-in";
	import Profile from "components/menu/Profile.svelte";
	import { getGoogleDriveCoordFile } from "utils/filter-data.js";
	import { processWithMachineLearning, fetchGPSDataFromGoogleDrive, fetchAndSaveGPSDataFromGoogleDrive } from "service/custom-api";
	import PageHeader from "components/Navbar.svelte";
	import AttentionBar from "components/AttentionBar.svelte";
	import MenuBar from "components/menu/MenuBar.svelte";
	import Video from "components/menu/Video.svelte";
	import SpeedChart from "components/menu/SpeedChart.svelte";
	import TableView from "components/menu/TableView.svelte";
	import ModalCard from "components/ModalCard.svelte";
	import MapLoadingSpinner from "components/map/MapLoadingSpinner.svelte";
	import MapError from "components/map/MapError.svelte";
	import { getDashcamVideos, deleteGoogleDriveFile, verifyAndAddPermissions, getGoogleDriveFile } from "service/google-drive";

	import { sortBySizeSmallToLarge, sortBySizeLargeToSmall, sortByTimeRecentToOldest, sortByTimeOldestToRecent } from "utils/sorting-video-assets";
	import RecordingsMenuBar from "components/recordings/RecordingsMenuBar.svelte";
	import RecordingsTable from "../components/recordings/RecordingsTable.svelte";
	import AddGeojson from "../components/menu/AddGeojson.svelte";
	import StreetView from "../components/menu/StreetView.svelte";
  import MachineLearning from "../components/menu/MachineLearning.svelte";

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
	let mapStyle = "outdoors-v11";
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
		{ id: 2, title: "Video Player", icon: "fa-video" },
		{ id: 3, title: "Street View", icon: "fa-map" },
		{ id: 4, title: "Add Geojson", icon: "fa-map" },
		{ id: 5, title: "Machine Learning Video", icon: "fa-robot" },
	];
	let selectedMenu = menuComponents[0].id;
	let isLoading = false;
	let isError = false;

	function setSessionStorageWithExpiry(key, value) {
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
	let accessTokenValue = getSessionStorageWithExpiry("AccessToken");
	let files = getLocalStorageWithExpiry("GoogleFiles");
	let selectedFirebaseGPSData = getLocalStorageWithExpiry("FirebaseData");

	let selectedVideoFile = getSessionStorageWithExpiry("VideoFile");
	let selectedGPSData = getLocalStorageWithExpiry("SelectedTrip");

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
				selectedFirebaseGPSData = gpsData;
				updateMapCenter(gpsData[0].features[0].geometry.coordinates);
				setLocalStorageWithExpiry("FirebaseData", selectedFirebaseGPSData);
				console.log("Successfully loaded Firebase Data");
			} else {
				console.log("No GPS data found");
			}
		} else {
			console.log(response.message);
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

	const addFirebaseElement = async (input, name = "Own Data", dataType = "Point", color = "Red") => {
		isLoading = true;
		isError = false;
		let GeoJSON = rawGPSDataToGeojsonData(input, name, dataType, color);
		GeoJSON = await removeFeaturesUntilLessThan1MB(GeoJSON);
		const response = await uploadDocumentToFirebase(user, name, GeoJSON);
		if (response.status === 200) {
			console.log("Successfully added Firebase Data");
		} else {
			console.log(response.message);
			isError = true;
		}
		isLoading = false;
	};

	const deleteFirebaseElement = async (documentId) => {
		const response = await deleteDocumentFromFirebase(user, documentId);
		if (response.status === 200) {
			let tempGPSData = selectedFirebaseGPSData;
			tempGPSData = tempGPSData.filter((obj) => obj.dataId !== documentId);
			gpsData = tempGPSData;
			selectedFirebaseGPSData = gpsData;
			updateMapCenter(gpsData[0].features[0].geometry.coordinates);
			console.log("Successfully Deleted GPS Data");
		} else {
			console.log(response);
			isError = true;
		}
	};
	const verifyAccessToken = async () => {
		const tempAccessToken = getSessionStorageWithExpiry("AccessToken");
		if (tempAccessToken === null) {
			accessTokenValue = await googleSignIn();
			setSessionStorageWithExpiry("AccessToken", accessTokenValue);
		}
	};

	function goTop() {
		document.body.scrollIntoView();
	}

	const getDriveFiles = async () => {
		try {
			const response = await getDashcamVideos(accessTokenValue);
			if (response.data.files.length) {
				files = response.data.files;
				setLocalStorageWithExpiry("GoogleFiles", response.data.files);
				console.log("Found Dashcam Files");
			} else {
				console.log("No Dashcam Files found");
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	const fetchGPSDataForFile = async (videoFile, saveToFirebase = false) => {
		try {
			isLoading = true;
			isError = false;

			goTop();

			// Check permissions
			const { coordHasPermissions, videoHasPermissions, coordFile } = await checkPermissions(accessTokenValue, videoFile, files);

			if (videoHasPermissions || coordHasPermissions) {
				if (coordFile) {
					const response = await fetchGPSDataFromGoogleDrive(user, coordFile);

					if (response.status === 200) {
						gpsData = gpsJsonToGeojson([response.data]);
						if (gpsData === null) return;
						updateMapCenter(gpsData[0].features[0].geometry.coordinates);
						selectedGPSData = [gpsData[0]];

						if (saveToFirebase) {
							GeoJSON = await removeFeaturesUntilLessThan1MB(gpsData[0]);
							const response = await uploadDocumentToFirebase(user, gpsData[0].dataName, GeoJSON);
							if (response.status === 200) {
								console.log("Successfully added Firebase Data");
							} else {
								console.log(response.message);
								isError = true;
							}
						}
					} else {
						isError = true;
					}
				} else {
					gpsData = [];
					selectedGPSData = [];
				}

				selectedVideoFile = videoFile;
				selectedMenu = 2;
				setSessionStorageWithExpiry("VideoFile", selectedVideoFile);
				setLocalStorageWithExpiry("SelectedTrip", selectedGPSData);
			}

			isLoading = false;
		} catch (err) {
			isLoading = false;
		}
	};

	const checkPermissions = async (accessTokenValue, videoFile, files) => {
		let fetchNewFiles = false;
		let coordHasPermissions = false;
		let videoHasPermissions = videoFile.permissionIds.includes("anyoneWithLink");

		const coordFile = getGoogleDriveCoordFile(videoFile, files);
		if (coordFile) {
			coordHasPermissions = coordFile.permissionIds.includes("anyoneWithLink");
			if (!coordHasPermissions) {
				const verifyResponse = await verifyAndAddPermissions(accessTokenValue, coordFile.id);
				if (verifyResponse.status === 200) {
					coordHasPermissions = true;
					fetchNewFiles = true;
				}
			}
		} else {
			console.log("Unable to set permissions for coordinates file");
		}

		if (!videoHasPermissions) {
			const verifyResponse = await verifyAndAddPermissions(accessTokenValue, videoFile.id);
			if (verifyResponse.status === 200) {
				videoHasPermissions = true;
				fetchNewFiles = true;
			}
		}

		if (fetchNewFiles) {
			await getDriveFiles();
		}

		return {
			coordHasPermissions,
			videoHasPermissions,
			coordFile,
		};
	};

	const checkAndSetFiles = () => {
		if (!files.length) {
			files = getDriveFiles();
		}
	};
	checkAndSetFiles();

	const setGPSDataWithSelectedData = (tempAllData) => {
		gpsData = tempAllData;
		updateMapCenter(tempAllData[0].features[0].geometry.coordinates);
	};

	const focusOnSelectedGPSData = (tempSelectedGPSData) => {
		updateMapCenter(tempSelectedGPSData.features[0].geometry.coordinates);
	};

	const deleteDriveFile = async (videoFile) => {
		await verifyAccessToken();
		let tempList = files;
		const coordFile = getGoogleDriveCoordFile(videoFile, files);
		if (coordFile) {
			const response = await deleteGoogleDriveFile(accessTokenValue, coordFile.id);
			if (response.status === 204) {
				tempList = tempList.filter((item) => item.id !== coordFile.id);
				console.log("Successfully Deleted Google Drive Coordinates File");
			} else {
				console.log("Cannot delete Google Drive Coordinates File");
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
			console.log("Successfully Deleted Google Drive Video File");
		} else {
			console.log("Cannot delete Google Drive Video File");
		}
	};

	let machineLearningVideoData = null;
	const startMachineLearning = async (videoFile) => {
		const response = await processWithMachineLearning(user, videoFile);
		if (response.status === 200) {
			machineLearningVideoData = response.data;
		} else {
			console.log(response.message);
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

	const addGeojsonData = (input, name = "Own Data", dataType = "Point", color = "Red") => {
		gpsData = [rawGPSDataToGeojsonData(input, name, dataType, color)];
		if (!gpsData.length) return;
		if (dataType === "Point") {
			updateMapCenter(gpsData[0].features[0].geometry.coordinates);
		} else {
			updateMapCenter(gpsData[0].features[0].geometry.coordinates[0][0]);
		}
	};
</script>

{#if isModalOpen}
	<ModalCard bind:modalPayload />
{/if}
<PageHeader title={"Dashboard Camera Viewer"} color="bg-dark" zHeight="z-10" />

<MenuBar bind:selectedMenu bind:menuComponents />
<main class="flex-1 grid-cols-1 gap-4 lg:grid-cols-12">
	<div class="col-span-1 md:col-span-12 row-span-6 relative">
		<Map bind:cityDetails bind:gpsData bind:isReadyForStyleSwitching bind:layerList bind:mapStyle bind:pointOfInterest bind:selectedMenu />

		<div class="absolute top-2 left-2 flex flex-row gap-4 z-100">
			<div class={`flex flex-col gap-4`}>
				<Layers bind:layerList />
				{#if selectedMenu === 0}
					<Profile bind:user {signOut} />
				{:else if selectedMenu === 1}
					<TableView bind:selectedFirebaseGPSData {openModel} {deleteFirebaseElement} {setGPSDataWithSelectedData} {focusOnSelectedGPSData} />
					<SearchDetails bind:dateTimeDictionary {fetchFirebaseData} />
				{:else if selectedMenu === 2}
					<Video bind:selectedVideoFile />
					<SpeedChart bind:selectedGPSData {setGPSDataWithSelectedData} />
				{:else if selectedMenu === 3}
					<StreetView bind:pointOfInterest />
				{:else if selectedMenu === 4}
					<AddGeojson {addGeojsonData} {addFirebaseElement} />
					
				{:else if selectedMenu === 5}
					<MachineLearning bind:machineLearningVideoData/>
				{/if}
			</div>
			<MapStyleSelector bind:mapStyle bind:isReadyForStyleSwitching />
		</div>

		{#if isLoading === true}
			<MapLoadingSpinner />
		{/if}
		{#if isError === true}
			<MapError />
		{/if}
	</div>
</main>

<PageHeader title={"Recordings"} color="bg-dark" zHeight="z-10" />
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
