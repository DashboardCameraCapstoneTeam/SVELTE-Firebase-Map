<script>
	import "tw-elements";
	import HomePage from "pages/HomePage.svelte";
	import { auth } from "config/firebase";
	import { googleSignIn } from "service/google-sign-in";
	import { authState } from "rxfire/auth";
	import { onDestroy } from "svelte";
	import { accessToken } from 'store/access-token-store.js';
	import LoginPage from "../pages/LoginPage.svelte";

	let user;
	let unsubscribe = authState(auth).subscribe((u) => (user = u));
	const login = async () => {
		const accessTokenRaw = await googleSignIn();
		accessToken.set(accessTokenRaw);
	};

	const signOut = () => {
		auth.signOut();
	};

	onDestroy(unsubscribe);
</script>

{#if user}
	<HomePage {user} {signOut} />
{:else}
	<LoginPage {login} />
{/if}

<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
