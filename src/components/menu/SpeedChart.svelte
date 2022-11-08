<script>
	import * as am5 from "@amcharts/amcharts5";
	import * as am5xy from "@amcharts/amcharts5/xy";
	import { onMount, onDestroy } from "svelte";
	export let selectedGPSData;

	let speedColors = ["#fa6e6e", "#fa9b45", "#fbf01c", "#88ed02", "#13c600", "#00ba73", "#00a9d1", "#0093ff", "#0071ff", "#1800ff"];

	let chartViewObject = null;
	let chartDiv;
	let xAxis;
	let series;
	const filterGPSData = () => {
		let data = [];
		if (selectedGPSData) {
			const coordinates = selectedGPSData.features;
			coordinates.forEach((element, index) => {
				const speed = element.properties.Speed ? element.properties.Speed : 0;
				const strokeSettings = {
					stroke: element.properties.Color,
				};
				const bulletSettings = { fill: element.properties.Color };
				const fillSettings = {
					fill: element.properties.Color,
				};

				data.push({ index: index, value: speed, strokeSettings, bulletSettings, fillSettings });
			});
		} else {
			data.push({ index: 0, value: 0 });
		}
		return data;
	};
	const updateChartView = () => {
		let chartData = filterGPSData();
		xAxis.data.setAll(chartData);
		series.data.setAll(chartData);
	};
	const initializeChartView = () => {
		let root = am5.Root.new(chartDiv);
		let chart = root.container.children.push(
			am5xy.XYChart.new(root, {
				panX: true,
				panY: true,
				wheelX: "panX",
				wheelY: "zoomX",
				pinchZoomX: true,
			})
		);
		// Add cursor
		// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
		var cursor = chart.set(
			"cursor",
			am5xy.XYCursor.new(root, {
				behavior: "none",
			})
		);
		cursor.lineY.set("visible", false);
		let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
		xRenderer.labels.template.setAll({
			rotation: -90,
			centerY: am5.p50,
			centerX: am5.p100,
			paddingRight: 15,
		});
		xAxis = chart.xAxes.push(
			am5xy.CategoryAxis.new(root, {
				categoryField: "index",
				renderer: xRenderer,
				tooltip: am5.Tooltip.new(root, {}),
			})
		);
		var yAxis = chart.yAxes.push(
			am5xy.ValueAxis.new(root, {
				renderer: am5xy.AxisRendererY.new(root, {}),
			})
		);
		// Add series
		// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
		series = chart.series.push(
			am5xy.LineSeries.new(root, {
				name: "Series",
				xAxis: xAxis,
				yAxis: yAxis,
				valueYField: "value",
				categoryXField: "index",
			})
		);
		var tooltip = series.set("tooltip", am5.Tooltip.new(root, {}));
		tooltip.label.set("text", "{valueY}");
		series = chart.series.push(
			am5xy.LineSeries.new(root, {
				name: "Series",
				xAxis: xAxis,
				yAxis: yAxis,
				valueYField: "value",
				sequencedInterpolation: true,
				categoryXField: "index",
				tooltip: am5.Tooltip.new(root, {
					labelText: "{valueY}",
				}),
			})
		);

		series.strokes.template.setAll({
			templateField: "strokeSettings",
			strokeWidth: 2,
		});

		series.bullets.push(function () {
			return am5.Bullet.new(root, {
				sprite: am5.Circle.new(root, {
					templateField: "bulletSettings",
					radius: 5,
				}),
			});
		});

		let chartData = filterGPSData();
		xAxis.data.setAll(chartData);
		series.data.setAll(chartData);
		chartViewObject = true;
		series.appear(1000);
		chart.appear(1000, 100);
	};
	onMount(() => {
		initializeChartView();
	});
	const onGPSDataChange = () => {
		if (selectedGPSData === null) return;
		try {
			if (chartViewObject) {
				updateChartView();
			} else {
				initializeChartView();
			}
		} catch (err) {
			alert(err);
		}
	};
	$: selectedGPSData && onGPSDataChange();
</script>

<div class="flex flex-row gap-4 h-full">
	<section class="card h-fit scale-in-center flex-1">
		<div class="p-4">
			<p class="font-bold my-1">Speed Chart (Km/h):</p>
			{#if selectedGPSData === null}
				<div class="alert alert-red my-1" role="alert">No GPS Data Selected.</div>
			{/if}

			<div bind:this={chartDiv} class={`h-96 w-full rounded-lg`} />
		</div>
	</section>

	<section class="card h-full scale-in-center flex-none">
		<div class="p-4">
			<p class="font-bold my-1">Speed Legend (Km/h):</p>
			{#if selectedGPSData === null}
				<div class="alert alert-red my-1" role="alert">No GPS Data Selected.</div>
			{/if}
			<div class="overflow-auto h-full">
				{#each speedColors as speedColor, i}
					<p class="list-item my-2"><i class="dot" style={`--color:${speedColor}`} /> {i * 10} - {(i + 1) * 10 - 1}</p>
				{/each}
				<p class="list-item my-2"><i class="dot" style={`--color:${speedColors[speedColors.length - 1]}`} /> 100+</p>
			</div>

			<hr class="my-2" />

			<p>Attention! Speed color is not indicative of speeding.</p>

		</div>
	</section>
</div>
