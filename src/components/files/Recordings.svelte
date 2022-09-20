<script>
	import Card from "components/files/Card.svelte";
	import Header from "components/files/Header.svelte";

	export let getDriveFiles;
	export let files;
</script>

<Header {getDriveFiles} />
<section class="grid grid-cols-1  md:grid-cols-12  gap-4 my-4 px-4 h-fit">
	{#if files === null}
		<div class="col-span-1 md:col-span-3 row-span-1">
			<section class="card h-fit scale-in-center">
				<p class="font-bold my-1">Recordings:</p>

				<div class="alert alert-red my-1" role="alert">Recordings have not been loaded.</div>
			</section>
		</div>
	{:else}
		{#each files as file}
			<div class="col-span-1 md:col-span-3 row-span-1">
				<Card bind:file />
			</div>
		{/each}
	{/if}
</section>
