<script>
	import "tw-elements";
	import HomePage from "pages/HomePage.svelte";
	import { auth, googleProvider } from "config/firebase";
	import { googleSignIn } from "service/google-sign-in";
	import { authState } from "rxfire/auth";
	import { onDestroy } from "svelte";
	import LoginPage from "../pages/LoginPage.svelte";

	let user;
	let accessToken;
	let unsubscribe = authState(auth).subscribe((u) => (user = u));
	const login = async () => {
		accessToken = await googleSignIn();
		sessionStorage.setItem("accessToken", accessToken);
	};

	const signOut = () => {
		auth.signOut();
	};

	onDestroy(unsubscribe);
</script>

{#if user}
	<HomePage {user} {accessToken} {signOut} />
{:else}
	<LoginPage {login} />
{/if}

<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
