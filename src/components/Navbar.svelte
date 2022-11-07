<script>
	export let title = "";
	export let color = "";
	export let rounded = "";
	export let zHeight = "";
</script>

<div class={`${color} ${rounded}  py-5 text-center text-white sticky top-0 ${zHeight}`}>
	<h1 class="text-4xl  ">{title}</h1>
</div>
