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