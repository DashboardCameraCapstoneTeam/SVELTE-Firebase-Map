<script>
	import { getCurrentDateTime } from "utils/fetch-time";
	export let selectedMenu;
	export let menuComponents;
</script>

<section class="sticky top-0 z-10">
	<div class="bg-blue py-1 px-5">
		<p class="text-white text-sm"><span class="font-bold">Last Update :</span> Fetch to API on {getCurrentDateTime()}</p>
	</div>
	<section class="bg-dark grid grid-cols-1 md:grid-cols-12 grid-rows-1 gap-4 px-5 h-fit ">
		<div class="col-span-1 md:col-span-3 row-span-1 flex items-center ">
			<a href="#/" class="text-white text-xl  ">USARS Mapping</a>
		</div>
		<div class="col-span-1 md:col-span-9 row-span-1 flex bg-smoke">
			{#each menuComponents as menuItem}
				<button class={`navbar-btn ${selectedMenu == menuItem.id ? "navbar-btn-blue" : ""} `} on:click={() => (selectedMenu = menuItem.id)}
					><i class="fa-solid {menuItem.icon} " /> {menuItem.title}
				</button>
			{/each}
		</div>
	</section>
</section>
