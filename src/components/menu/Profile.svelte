<script>
	export let user;
	export let signOut;

</script>


<section class="card h-fit scale-in-center w-[32rem]">
	<div class="p-4">
		

		<p class="font-bold my-1">Name:</p>
		<p>{user.displayName}</p>
		<p class="font-bold my-1">Email:</p>
		<p>{user.email}</p>
		<p class="font-bold my-1">Email Verified:</p>
		<p>{user.emailVerified}</p>

		<hr class="solid my-2" />
		<button class="card-btn btn-error-outline my-1" on:click={signOut}><i class="fa-solid fa-right-from-bracket" /> Sign Out </button>

	</div>
</section>
