<script>
	export let modalPayload = {
		title: "",
		message: "",
		cancelBtnMessage: "",
		successBtnMessage: "",
		element: null,
		cancelFunction: null,
		successFunction: null,
	};
</script>
<div class="modal">
	<div class="p-4 modal-content">
		<p class="font-bold my-1">{modalPayload.title}</p>
		<p>{modalPayload.message}</p>
		<hr class="solid my-4" />
		<div class="flex">
			<button
				class="card-btn btn-primary mr-1"
				on:click={() => {
					modalPayload.successFunction(modalPayload.element);
					modalPayload.cancelFunction();
				}}>{modalPayload.successBtnMessage}</button
			>
			<button class="ml-1 card-btn btn-black-outline" on:click={() => modalPayload.cancelFunction()}>{modalPayload.cancelBtnMessage}</button>
		</div>
	</div>
</div>
