<script>
	export let getDriveFiles;
</script>


<section class="shadow-xl">
	<div class="flex flex-row ">
		<button class={`navbar-btn navbar-btn-blue`} on:click={getDriveFiles}><i class="fa-brands fa-google-drive" /> Fetch Google Drive Data </button>
	</div>
</section>
