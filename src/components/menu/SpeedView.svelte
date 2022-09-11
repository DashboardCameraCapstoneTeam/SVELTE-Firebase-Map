<script>
    import { speedColorSplit, speedColors } from "constants"

</script>

<section class="card h-fit scale-in-center">
    <p class="font-bold my-1">Vehicle Speed Legend (Km/h):</p>
	{#if speedColors === null}
		
		<div class="alert alert-red my-1" role="alert">Unable to load the legend, please try again.</div>
	{:else}

    <div class="overflow-auto h-64">
        {#each speedColors as speedColor, i}
                <p class="list-item my-1"> <i class="dot" style={`--color:${speedColor}`}></i> {i * speedColorSplit } - { (i+1)* speedColorSplit - 1}</p>
            {/each}
            
       
    </div>
    {/if}
</section>