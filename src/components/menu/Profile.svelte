<script>
	export let user;
	export let signOut;
</script>
<section class="card h-fit scale-in-center">
	<div class="p-4">
		<img class="w-16 h-16 rounded-lg" src={`${user.photoURL}`} alt="Default avatar">
		<p class="font-bold my-1">Name:</p>
		<p>{user.displayName}</p>
		<p class="font-bold my-1">Email:</p>
		<p>{user.email}</p>
		<p class="font-bold my-1">Email Verified:</p>
		<p>{user.emailVerified}</p>


		<hr class="solid my-4" />
		<button class="card-btn card-btn-red-outline my-1" on:click={signOut}><i class="fa-solid fa-right-from-bracket" /> Sign Out </button>
	</div>
</section>
