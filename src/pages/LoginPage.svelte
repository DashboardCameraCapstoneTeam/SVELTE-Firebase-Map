<script>
	export let login;
</script>

<section class="py-4 px-4 flex h-full items-center justify-center">
	<section class="h-fit card rounded-lg shadow-xl p-4 text-sm w-96 text-center">
		<p class="text-bold text-2xl">Sign In</p>
		<p class="text-center my-2">Use your Google Account</p>
		<button class="card-btn card-btn-blue my-4" on:click={login}> Signin with Google </button>

		<div class="items-center justify-center mt-4">
			<button class="text-center hover:underline">Don't have an Account Yet?</button>
		</div>
	</section>
</section>
