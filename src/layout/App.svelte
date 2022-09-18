<script>
	import "tw-elements";
	import HomePage from "pages/HomePage.svelte";
	
	import { auth, googleProvider } from "config/firebase";
	import { authState } from "rxfire/auth";
	import { onDestroy } from "svelte";
  	import LoginPage from "../pages/LoginPage.svelte";

	let user;
	let accessToken;
	let unsubscribe = authState(auth).subscribe((u) => (user = u));
	const login = () => {
		try {
			auth.signInWithPopup(googleProvider).then((result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			console.log(result)
			const credential = result.credential;
			accessToken = credential.accessToken;
				// ...
			}).catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
		
			});
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
<HomePage {user} {accessToken} {signOut}/>
{:else}
<LoginPage {login}/>
{/if}



<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
