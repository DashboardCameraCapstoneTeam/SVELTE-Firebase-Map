<script>
	export let login;
	let showTerms = false;

	const toggleTerms = () => {
		showTerms = !showTerms;
	};
</script>

<section class=" h-screen p-16 m-auto items-center justify-center bg-smoke">
	<div class="card flex h-full shadow-xl rounded-lg">
		<div class="flex-1 bg-primary rounded-lg header flex items-center justify-center h-full">
		
			<div class="flex flex-col text-center gap-4">
				<h1 class="text-4xl">Advanced Mobile Dashcam</h1>
				<hr class="my-4" />
				<p class="text-sm">A machine learning based dashcam system</p>
			
			</div>
			
		
			
		</div>
		<div class="flex-1 bg-white p-16  flex items-center justify-center h-full">
			<div class="flex flex-col gap-4 items-center justify-center  text-center ">
				<h1 class="text-bold text-2xl ">Sign In</h1>
				
				<button class="card-btn btn-primary w-96" on:click={login}><i class="fa-brands fa-google" /> Signin with Google </button>

				<div class="items-center justify-center ">
					
					<button on:click={toggleTerms} class="text-center hover:underline">Why do I need a Google Account?</button>

					{#if showTerms}
					<div class="w-96">
						<hr class="my-4" />
						<p>
							The GPS videos collected through the dashcam are saved in each users Google Drive Account. Users who accept the machine learning terms and conditions are also allowed to process their
							videos and use the online dashcam management tool.
						</p>

					</div>
					
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>
