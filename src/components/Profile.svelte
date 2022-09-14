<script>
	import { auth } from "config/firebase";
    export let user;
	const signOut = () => {
		auth.signOut();
	};
</script>

<section class="card h-fit scale-in-center">
	{#if user}
		<p class="font-bold my-1">Profile Selection:</p>
		<p>{user.displayName}</p>
		<button class="card-btn card-btn-blue rounded-lg block w-full" on:click={signOut}> Signout with Google </button>
	{:else}
		<div class="alert alert-red my-1" role="alert">Error getting User data.</div>
	{/if}
</section>

<style>
</style>
