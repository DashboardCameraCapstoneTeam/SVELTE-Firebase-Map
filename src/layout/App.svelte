<script>
  import 'tw-elements';
  import { loggedIn$ } from 'auth';
  import HomePage from 'pages/HomePage.svelte';
  import LoginPage from 'pages/LoginPage.svelte';
  const user = loggedIn$;
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
