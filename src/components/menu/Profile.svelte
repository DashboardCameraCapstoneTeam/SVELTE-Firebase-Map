<script>
	export let user;
	export let signOut;

	let showTerms = false;

	const toggleTerms = () => {
		showTerms = !showTerms;
	};
</script>


<section class="card h-fit scale-in-center w-[32rem]">
	<div class="p-4">
		<div class="float-right">
			</div>
			<div class='flex flow-row justify-between my-1'>
				<div>
					<p> Account:</p>
				</div>

			
			<div>
			<button on:click={toggleTerms} class="text-center hover:underline">
				<i class="fa-solid fa-gear" />
				Manage Account</button>
		</div>
		</div>

		<p class="font-bold my-1">Name:</p>
		<p>{user.displayName}</p>
		<p class="font-bold my-1">Email:</p>
		<p>{user.email}</p>
		<p class="font-bold my-1">Email Verified:</p>
		<p>{user.emailVerified}</p>

		<hr class="solid my-2" />
		<button class="card-btn btn-error-outline my-1" on:click={signOut}><i class="fa-solid fa-right-from-bracket" /> Sign Out </button>

		{#if showTerms}
			<hr class="my-2" />

			<p>Attention! deleting your account will remove all the GPS Data on Firebase. Videos collected through the dashcam will not be deleted.</p>

			<div class="flex flex-row">
				<button class={`card-btn btn-error-outline my-1`}>
					<i class="fa-solid fa-trash" />
					Delete Account
				</button>
			</div>
		{/if}
	</div>
</section>
