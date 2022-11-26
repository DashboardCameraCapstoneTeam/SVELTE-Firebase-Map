<script>
	export let title = "";
	export let color = "";
	export let rounded = "";
	export let zHeight = "";
</script>

<div class={`${color} ${rounded}  px-4 py-4 text-white sticky top-0 ${zHeight}
flex justify-between`}>
<div><p class ='text-xl'>{title}</p></div>

	<h1 class="text-4xl  ">{title}</h1>
</div>
