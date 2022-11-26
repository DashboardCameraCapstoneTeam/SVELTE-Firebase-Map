<script>
	export let title = "";
	export let color = "";
	export let rounded = "";
	export let zHeight = "";
</script>

<div class={`${color} ${rounded}  px-4 py-4 text-white sticky top-0 ${zHeight}
flex justify-between`}>
<div><p class ='text-xl'>{title}</p></div>
<div><a class="hover:underline" href="https://geojson.io/#map=10.9/44.2456/-76.5014" target="_blank"
	rel='noreferrer'> Create GEOJSON</a></div>

	<h1 class="text-4xl  ">{title}</h1>
</div>
