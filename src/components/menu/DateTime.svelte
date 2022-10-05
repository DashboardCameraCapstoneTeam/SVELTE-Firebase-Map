<script>
	export let dateTimeDictionary;

	const clearDateTime = () => {
		Object.keys(dateTimeDictionary).forEach(dateTime => dateTimeDictionary[dateTime] = '')
	};

</script>

<section class="card h-fit scale-in-center">
	<p class="font-bold my-1">Date Time Selection:</p>


		<div class="datepicker form-floating my-1  w-full" data-mdb-toggle-button="false">
			<input
				type="datetime-local"
				class="form-control date-picker"
				placeholder="Select a date"
				data-mdb-toggle="datepicker"
				min="2010-01-01"
				max="2022-12-31"
				bind:value={dateTimeDictionary.startDateTime}
			/>
			<label for="floatingInput">Select Start date</label>
		</div>		
	

		<div class="datepicker form-floating my-1 w-full" data-mdb-toggle-button="false">
			<input
				type="datetime-local"
				class="form-control date-picker"
				placeholder="Select End Date Time"
				data-mdb-toggle="datepicker"
				min="2010-01-01"
				max="2022-12-31"
				bind:value={dateTimeDictionary.endDateTime}
			/>
			<label for="floatingInput">Select End date</label>
		
	</div>

	
	{#if dateTimeDictionary.startDateTime === '' || dateTimeDictionary.endDateTime === '' }
		<div class="alert alert-red my-1" role="alert">Select a Date and Time before Searching.</div>
	{:else}
		<div class="alert alert-green my-1" role="alert">
			{dateTimeDictionary.startDateTime} to {dateTimeDictionary.endDateTime}  <button class="float-right fa-lg" on:click={clearDateTime}><i class="fa-solid fa-xmark " /></button>
		</div>
	{/if}
</section>

<style>
</style>
