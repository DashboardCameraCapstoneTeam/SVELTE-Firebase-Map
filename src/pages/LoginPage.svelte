<script>
  import { auth, googleProvider } from 'config/firebase';
  const login = () =>{
    try{
        auth.signInWithPopup(googleProvider);
    }
    catch (err){
        console.log(err);
    }
  
  }


</script>




<section class="grid grid-cols-1  md:grid-cols-12 grid-rows-6  gap-4 py-4 px-4 h-fit">
	<div class="col-span-1 md:col-span-3 row-span-1">
		<section class="h-full rounded-lg shadow-xl p-4 text-sm">
			<button class="card-btn card-btn-blue rounded-lg block w-full" on:click={login}> Signin with Google </button>
		</section>
	</div>
</section>


<style>
</style>