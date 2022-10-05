<script>
	import Card from "components/files/Card.svelte";
	import RecordingsHeader from "components/files/RecordingsHeader.svelte";
	import AlertCard from "components/widget/AlertCard.svelte";

	export let getDriveFiles;
	export let files;
</script>

<RecordingsHeader {getDriveFiles} />
<section class="grid grid-cols-1  md:grid-cols-12  gap-4 my-4 px-4 h-fit">
	{#if files === null}
		<div class="col-span-1 md:col-span-3 row-span-1">
			<AlertCard title="Recordings" message="Records have not been fetched." styleColor="red" />
		</div>
	{:else if files.length <= 0}
		<div class="col-span-1 md:col-span-3 row-span-1">
			<AlertCard title="Recordings" message="No Recordings found" styleColor="red" />
		</div>
	{:else}
		{#each files as file}
			{#if file.fileExtension === "MP4"}
				<div class="col-span-1 md:col-span-3 row-span-1">
					<Card bind:file />
				</div>
			{/if}
		{/each}
	{/if}
</section>
