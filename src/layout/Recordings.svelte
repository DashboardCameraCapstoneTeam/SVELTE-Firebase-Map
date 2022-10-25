<script>
	import { getDashcamVideos, deleteGoogleDriveFile } from "service/google-drive";
	import Card from "components/files/Card.svelte";
	import RecordingsButtonFlex from "components/files/RecordingsButtonFlex.svelte";
	import AlertCard from "components/widget/AlertCard.svelte";
	import { getObjectsWhereKeyEqualsValue } from "utils/filter-data.js";
	import { processWithMachineLearning } from "service/custom-api";
	import PageHeader from "../components/PageHeader.svelte";
	import AttentionBar from "../components/AttentionBar.svelte";
	import { getGoogleDriveCoordFile } from "utils/filter-data.js";

	export let user;
	export let files;
	export let verifyAccessToken;
	export let accessTokenValue;
	export let selectedVideoFile;

	const saveFilesToLocalStorage = () => {
		if (files.length > 0 && localStorage.getItem("Files") !== JSON.stringify(files)) {
			localStorage.setItem("Files", JSON.stringify(files));
		}
	};

	const getDriveFiles = async () => {
		await verifyAccessToken();
		const response = await getDashcamVideos(accessTokenValue);
		if (response.status === 200) {
			response.data.files.length >= 1 ? alert("Found Dashcam Files") : alert("No Dashcam Files found");
			files = response.data.files;
			console.log("App.js | files", response.data.files);

			saveFilesToLocalStorage();
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
                alert('Successfully Deleted Google Drive Coordinates File')
			} else {
				alert("Cannot delete Google Drive Coordinates File");
			}
		}

		const response = await deleteGoogleDriveFile(accessTokenValue, videoFile.id);
		if (videoFile) {
			if (response.status === 204) {
				tempList = tempList.filter((item) => item.id !== videoFile.id);
				//* Remove the selected videoFile if deleted
				if (selectedVideoFile.id == videoFile.id) {
					selectedVideoFile = null;
				}
                alert('Successfully Deleted Google Drive Video File')
			} else {
				alert("Cannot delete Google Drive Video File");
			}
		}

		files = tempList;
		saveFilesToLocalStorage();
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
		}
        else{
            alert("Coordinates File does not exist");
        }
	};

	const selectVideoFile = (videoFile) => {
		selectedVideoFile = videoFile;
	};
</script>

<PageHeader title={"Recordings"} color="bg-dark" zHeight="z-10" />
<AttentionBar message="Load, view, and sort all Google Drive Recordings. Use Pagination to sort between videos." />

<RecordingsButtonFlex {getDriveFiles} />
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
		{#each files as videoFile}
			{#if videoFile.fileExtension === "MP4" || videoFile.fileExtension === "mp4"}
				<div class="col-span-1 md:col-span-3">
					<Card bind:videoFile {deleteDriveFile} {startMachineLearning} selectVideoFile={selectVideoFile} />
				</div>
			{/if}
		{/each}
	{/if}
</section>
