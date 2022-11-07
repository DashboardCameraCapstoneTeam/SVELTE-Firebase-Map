<script>
	export let title = "No Title";
	export let message = "No Message";
	export let styleColor = "blue";
</script>

<section class="card h-fit scale-in-center">
	<div class="p-4">
		<p class="font-bold my-1">{title}:</p>
		<div class="alert alert-{styleColor} my-1" role="alert">{message}</div>
	</div>
</section>
