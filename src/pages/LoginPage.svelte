<script>
  import { auth, googleProvider } from 'config/firebase';
  const login = () =>{
    try{
        let res = auth.signInWithPopup(googleProvider);
    console.log(res)
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