<script>
	import { ABOUT_LIST, APPLICATION_TOOLS_LIST, UTILITY_TOOLS, FRONTEND_TOOLS, API_TOOLS,  BACKEND_TOOLS} from "constants";
	import { returnLinkGivenIfStringContains } from "utils/devicon.js";
</script>

<hr />
<footer class="bg-smoke  py-8 px-4">
	<div class="grid grid-cols-1 md:grid-cols-3 py-2 mb-8">
		<div class="col-span-1 ">
			<p>About</p>

			{#each ABOUT_LIST as item}
				<div key={item.id} class="my-2">
					<a href={`${item.link}`} target="_blank" class="text-sm  hover:underline" rel="noreferrer">{item.name}</a>
				</div>
			{/each}
		</div>

		<div class="col-span-1">
			<p>Application Tools</p>
			{#each APPLICATION_TOOLS_LIST as item}
				<div key={item.id} class="my-2">
					<a href={`${item.link}`} target="_blank" rel="noreferrer" class="text-sm  hover:underline">{item.name}</a>
				</div>
			{/each}
		</div>

		<div class="col-span-1">

			<p>Front End Tools</p>
			<div class="flex flex-wrap ">
			
				{#each FRONTEND_TOOLS as tool}
				<img height="100" width="auto" title={tool} key={tool} class={`img-icon w-8 mx-2 py-2`} alt="" src={returnLinkGivenIfStringContains(tool)} loading="lazy" />
				{/each}
	
			</div>


			<p>API Tools</p>
			<div class="flex flex-wrap">
				
				{#each API_TOOLS as tool}
				<img height="100" width="auto" title={tool} key={tool} class={`img-icon w-8 mx-2 py-2`} alt="" src={returnLinkGivenIfStringContains(tool)} loading="lazy" />
				{/each}
	
			</div>


			<p>Back End Tools</p>
			<div class="flex flex-wrap ">
				
				{#each BACKEND_TOOLS as tool}
				<img height="100" width="auto" title={tool} key={tool} class={`img-icon w-8 mx-2 py-2`} alt="" src={returnLinkGivenIfStringContains(tool)} loading="lazy" />
				{/each}
	
			</div>

			<p>Utility Tools</p>
			<div class="flex flex-wrap">
				
				{#each UTILITY_TOOLS as tool}
				<img height="100" width="auto" title={tool} key={tool} class={`img-icon w-8 mx-2 py-2`} alt="" src={returnLinkGivenIfStringContains(tool)} loading="lazy" />
				{/each}
	
			</div>
		</div>
	</div>

	<hr />

	<div class="grid grid-cols-1 sm:grid-cols-3 mt-8">
		<div class="col-span-1">
			<p>© Capstone. All rights reserved.</p>
			<p class="text-xs my-2">Website Terms and Policies</p>

			<p class="text-xs my-2">
				The City promotes and fosters open government principles of participation, innovation, transparency and accountability. The data catalogue supports these principles and is the first step in
				making it easier to view, obtain and use the information the City has gathered.
			</p>
		</div>

		<div class="col-span-1 py-2 " />

		<div class="col-span-1">
			<p>License Terms</p>

			<p class="text-xs my-2">
				Application uses MAPBOX to display Geojson data. Interactive, thoroughly customizable maps in the browser, powered by vector tiles and WebGL. The application makes use of Geotab APIs, and a
				multitude of 3rd party APIs.
			</p>

		
		
		</div>

		
	</div>
</footer>
