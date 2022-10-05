<script>
	export let user;
	export let signOut;
</script>

<section class="card h-fit scale-in-center">
	<p class="font-bold my-1">Profile Selection:</p>
	<p class="font-bold my-1">Name:</p>
	<p>{user.displayName}</p>

	<p class="font-bold my-1">Email:</p>
	<p>{user.email}</p>

	<button class="card-btn card-btn-red my-1" on:click={signOut}><i class="fa-solid fa-right-from-bracket" /> Sign Out </button>
</section>
