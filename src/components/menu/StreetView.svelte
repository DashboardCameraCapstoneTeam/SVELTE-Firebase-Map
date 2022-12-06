<script>
    import {onMount} from 'svelte/internal';
    import {onDestroy} from 'svelte';


    export let selectedPOI;

    let streetViewObject = null;
    let streetViewContainer = null;
    let errro = null;

    const initializeStreetView = () => {
        try{
            streetViewObject = new google.maps.StreetViewPanorama(streetViewContainer,{
                position: selectedPOI,
                pov:{
                    heading: 34,
                    pitch:10
                }
            });
        }catch (err) {
            error = err;
        }
    };

    onMount(() => {
        try{
            if(selectedPOI !==null){
                initializeStreetView();
            }
        } catch(err){
            error = err;
        }
    });

    //When the location changes, set the new latlong to the map
const onLocationChange =() => {
    try{
        streetViewObject === null
        ? initializeStreetView()
        : streetViewObject.setPosition(selectedPOI);

    }catch(err){
        error = err;
    }
};
$: selectedPOI && onLocationChange();
onDestroy(() => {
    try{
        streetViewObject = null;
        streetViewContainer = null;
    } catch (e){}
});

let showTerms = true;
const toggleTerms  = () => {
    showTerms = !showTerms;
};

</script>

<section class= "card h-fit scale-in-center w-[32rem]">
    {#if selectedPOI == null}
    <div class="p-4">
        <p class="font-bold my-1">Street View:</p>
        <div class="alert alert-red my-1" role="alert">Select a point on the map.</div>
    </div>
    {/if}
    <div
    bind:this={streetViewContainer}
class={`${selectedPOI == null ? 'h-0' : 'h-96'} w-full rounded-lg`}
    
    />
</section>