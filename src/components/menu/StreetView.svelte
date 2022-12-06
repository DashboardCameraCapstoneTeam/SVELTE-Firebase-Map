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
</script>