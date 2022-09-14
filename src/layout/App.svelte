<script>
	import "tw-elements";
	import HomePage from "pages/HomePage.svelte";
	import LoginPage from "pages/LoginPage.svelte";
	import { auth, googleProvider } from "config/firebase";
	import { authState } from "rxfire/auth";
  import { onDestroy } from "svelte";

	let user = {};
	let unsubscribe = authState(auth).subscribe((u) => (user = u));
  onDestroy(unsubscribe);
</script>

<section>
	{#if user}
		<HomePage {user} />
	{:else}
		<LoginPage />
	{/if}
</section>

<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
