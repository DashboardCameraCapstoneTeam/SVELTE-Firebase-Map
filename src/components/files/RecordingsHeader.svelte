<script>
	export let getDriveFiles;
</script>

<section class="sticky top-0 z-50 shadow-xl">
	<section class="bg-dark grid grid-cols-1 md:grid-cols-12 grid-rows-1 gap-4 px-5 h-fit ">
		<div class="col-span-1 md:col-span-3 row-span-1 flex items-center ">
			<a href="#/" class="text-white text-xl ">Recordings</a>
		</div>
		<div class="col-span-1 md:col-span-9 row-span-1 flex bg-smoke">
			<button class={`navbar-btn navbar-btn-blue`} on:click={getDriveFiles}><i class="fa-brands fa-google-drive" /> Fetch Google Drive Data </button>
		</div>
	</section>
</section>
