<script>
  import 'tw-elements';
  import HomePage from 'pages/HomePage.svelte';
  import LoginPage from 'pages/LoginPage.svelte';

  import { auth, googleProvider } from 'config/firebase';
  import { authState } from 'rxfire/auth';

    let user;

    const unsubscribe = authState(auth).subscribe(u => user = u);


</script> 

<section>
  {#if user}
      <HomePage/>

  {:else}
    <LoginPage />
  {/if}
  </section>



<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
