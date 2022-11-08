<script>
	import "tw-elements";
	import HomePage from "pages/HomePage.svelte";
	import { auth } from "config/firebase";
	import { googleSignIn } from "service/google-sign-in";
	import { authState } from "rxfire/auth";
	import { onDestroy } from "svelte";
	import LoginPage from "./pages/LoginPage.svelte";
	import { filter } from "rxjs/operators";
	import { onMount } from "svelte";
	//* Create the user and set the subscribers
	let user = null;
	let unsubscribeUser;
	const loggedIn$ = authState(auth).pipe(filter((user) => !!user));
	function setSessionStorageWithExpiry(key, value){
		const now = new Date();
		const item = {
			value: value,
			expiry: now.getTime() + 3600000,
		};
		localStorage.setItem(key, JSON.stringify(item));
	}

	function getSessionStorageWithExpiry(key) {
		const itemStr = localStorage.getItem(key);
		if (!itemStr) {
			return null;
		}
		const item = JSON.parse(itemStr);
		const now = new Date();
		if (now.getTime() > item.expiry) {
			localStorage.removeItem(key);
			return null;
		}
		return item.value;
	}
	let accessTokenValue = getSessionStorageWithExpiry('AccessToken');


	onMount(() => {
		if (loggedIn$) {
			unsubscribeUser = authState(auth).subscribe((u) => (user = u));
		}
	});
	const login = async () => {
		const tempAccessTokenValue = await googleSignIn();
		setSessionStorageWithExpiry("AccessToken", tempAccessTokenValue);
		accessTokenValue = tempAccessTokenValue;
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
{#if user && accessTokenValue}
	<HomePage {user} {signOut} />
{:else}
	<LoginPage {login} />
{/if}
<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
