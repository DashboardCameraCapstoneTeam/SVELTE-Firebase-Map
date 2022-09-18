<script>
	export let login;
    let showTerms = false;

    const toggleTerms = () =>{
        showTerms = !showTerms;
    }
</script>

<section class="py-4 px-4 flex h-full items-center justify-center">
	<section class="h-fit card rounded-lg shadow-xl p-4 text-sm w-96 text-center">
		<p class="text-bold text-2xl">Sign In</p>
		<p class="text-center my-2">Use your Google Account</p>
		<button class="card-btn card-btn-blue my-4" on:click={login}><i class="fa-brands fa-google"></i> Signin with Google </button>

		<div class="items-center justify-center mt-4">
			<button on:click={toggleTerms} class="text-center hover:underline">Why do I need a Google Account?</button>
           
           <div class={`${showTerms ? '' : 'hidden'}`}>
            <hr class="my-2">
            <p >The GPS vidoes collected through the dashcam are saved in each users Google Drive Account. Users who accept the machine learning terms and conditions are also allowed to process their videos and use the online dashcam managment tool.</p>
        </div>
         

	</section>
</section>
