<script>
	import "tw-elements";
	import HomePage from "pages/HomePage.svelte";
	
	import { auth, googleProvider } from "config/firebase";
	import { authState } from "rxfire/auth";
	import { onDestroy } from "svelte";
  import LoginPage from "../pages/LoginPage.svelte";

	let user;
	let unsubscribe = authState(auth).subscribe((u) => (user = u));
	const login = () => {
		try {
			auth.signInWithPopup(googleProvider);
		} catch (err) {
			console.log(err);
		}
	};

	const signOut = () => {
		auth.signOut();
	};

	onDestroy(unsubscribe);
</script>

{#if user}
<HomePage {user} {signOut}/>
{:else}
<LoginPage {login}/>
{/if}



<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
