<script>
	export let functionComponents;
</script>

<section class="shadow-xl">
	<div class="flex flex-row ">
		{#each functionComponents as menuItem}
			<button class={` navbar-btn ${menuItem.id == 0 ? "navbar-btn-blue" : ""} `} on:click={() => menuItem.function()}><i class="{menuItem.icon} " /> {menuItem.title} </button>
		{/each}
	</div>
</section>