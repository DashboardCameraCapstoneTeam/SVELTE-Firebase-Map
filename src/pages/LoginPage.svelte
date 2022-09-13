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




<section>
    <button on:click={login} >Login With Google</button>

</section>


<style>
</style>