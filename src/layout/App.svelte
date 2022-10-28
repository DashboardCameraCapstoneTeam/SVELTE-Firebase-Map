<script>
	import "tw-elements";
	import HomePage from "pages/HomePage.svelte";
	import { auth } from "config/firebase";
	import { googleSignIn } from "service/google-sign-in";
	import { authState } from "rxfire/auth";
	import { onDestroy } from "svelte";
	import { accessToken } from "store/access-token-store.js";
	import LoginPage from "../pages/LoginPage.svelte";
	import { filter } from "rxjs/operators";
	import { onMount } from "svelte";
	//* Create the user and set the subscribers
	let user = null;
	let accessTokenValue = null;
	let unsubscribeUser;
	const loggedIn$ = authState(auth).pipe(filter((user) => !!user));
	onMount(() => {
		if (loggedIn$) {
			unsubscribeUser = authState(auth).subscribe((u) => (user = u));
		}
	});
	const login = async () => {
		const accessTokenRaw = await googleSignIn();
		accessToken.set(accessTokenRaw);
	};
	const signOut = () => {
		auth.signOut();
		user = null;
	};
	onDestroy(() => {
		unsubscribeUser;
		unsubscribeAccessToken;
	});
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
