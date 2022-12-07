<script>
	export let title = "";
	export let color = "";
	export let rounded = "";
	export let zHeight = "";
</script>

<div
	class={`${color} ${rounded}  px-4 py-4 text-white sticky top-0 ${zHeight}
flex justify-between`}
>
	<div><h1 class="text-2xl">{title}</h1></div>
	<div><a class="hover:underline" href="https://geojson.io/#map=7.28/43.535/-79.377" target="_blank" rel="noreferrer"><h1 class="text-xl">Create GEOJSON</h1> </a></div>

	
</div>
