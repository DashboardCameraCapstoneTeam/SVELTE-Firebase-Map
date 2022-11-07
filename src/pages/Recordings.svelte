<script>
	import { getDashcamVideos, deleteGoogleDriveFile } from "service/google-drive";
	import Card from "components/files/Card.svelte";
	import AlertCard from "components/AlertCard.svelte";
	import { processWithMachineLearning } from "service/custom-api";
	import PageHeader from "../components/PageHeader.svelte";
	import AttentionBar from "../components/AttentionBar.svelte";
	import { getGoogleDriveCoordFile } from "utils/filter-data.js";
	import { sortBySizeSmallToLarge, sortBySizeLargeToSmall, sortByTimeRecentToOldest, sortByTimeOldestToRecent } from "utils/sorting-video-assets";

	export let user;
	export let files;
	export let verifyAccessToken;
	export let accessTokenValue;
	export let selectedVideoFile;
	export let fetchGPSDataForFile;
	export let openModel;

	const getDriveFiles = async () => {
		await verifyAccessToken();
		const response = await getDashcamVideos(accessTokenValue);
		if (response.status === 200) {
			response.data.files.length >= 1 ? alert("Found Dashcam Files") : alert("No Dashcam Files found");
			files = response.data.files;
			console.log("App.js | files", response.data.files);
		} else {
			alert(response.message);
		}
	};

	const deleteDriveFile = async (videoFile) => {
		await verifyAccessToken();
		let tempList = files;
		const coordFile = getGoogleDriveCoordFile(videoFile, files);
		if (coordFile) {
			if (response.status === 204) {
				tempList = tempList.filter((item) => item.id !== coordFile.id);
				alert("Successfully Deleted Google Drive Coordinates File");
			} else {
				alert("Cannot delete Google Drive Coordinates File");
			}
		}

		const response = await deleteGoogleDriveFile(accessTokenValue, videoFile.id);
		if (videoFile) {
			if (response.status === 204) {
				tempList = tempList.filter((item) => item.id !== videoFile.id);
				//* Remove the selected videoFile if deleted

				if (selectedVideoFile) {
					if (selectedVideoFile.id == videoFile.id) {
						selectedVideoFile = null;
					}
				}

				alert("Successfully Deleted Google Drive Video File");
			} else {
				alert("Cannot delete Google Drive Video File");
			}
		}

		files = tempList;
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

<PageHeader title={"Recordings"} color="bg-dark" zHeight="z-10" />
<AttentionBar message="Load, view, and sort all Google Drive Recordings. Use Pagination to sort between videos." />


<section class="shadow-xl">
	<div class="flex flex-row ">
		{#each functionComponents as menuItem}
			<button class={` navbar-btn ${menuItem.id == 0 ? "navbar-btn-blue" : ""} `} on:click={() => menuItem.function()}><i class="{menuItem.icon} " /> {menuItem.title} </button>
		{/each}
	</div>
</section>

<section class="grid grid-cols-1  md:grid-cols-12  gap-4 my-4 px-4 h-fit divide-x-1 ">
	{#if files === null}
		<div class="col-span-1 md:col-span-3">
			<AlertCard title="Recordings" message="Records have not been fetched." styleColor="red" />
		</div>
	{:else if files.length <= 0}
		<div class="col-span-1 md:col-span-3">
			<AlertCard title="Recordings" message="No Recordings found." styleColor="red" />
		</div>
	{:else}
		{#each files as videoFile}
			{#if videoFile.fileExtension === "MP4" || videoFile.fileExtension === "mp4"}
				<div class="col-span-1 md:col-span-3">
					<Card {openModel} bind:videoFile {deleteDriveFile} {startMachineLearning} {fetchGPSDataForFile} />
				</div>
			{/if}
		{/each}
	{/if}
</section>
