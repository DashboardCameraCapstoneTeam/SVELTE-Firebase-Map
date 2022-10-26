<script>
	export let selectedMenu;
	export let menuComponents;
</script>

<section class="shadow-xl">
	<div class="flex flex-row ">
		{#each menuComponents as menuItem}
			<button class={` navbar-btn ${selectedMenu == menuItem.id ? "navbar-btn-blue" : ""} `} on:click={() => (selectedMenu = menuItem.id)}
				><i class="fa-solid {menuItem.icon} " /> {menuItem.title}
			</button>
		{/each}
	</div>
</section>
