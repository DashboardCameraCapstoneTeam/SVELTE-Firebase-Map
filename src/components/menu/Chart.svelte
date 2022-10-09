<script>
	import * as am5 from "@amcharts/amcharts5";
	import * as am5xy from "@amcharts/amcharts5/xy";
	import { onMount, onDestroy } from "svelte";
	import { getYearData, getMonthData, getDayData } from "utils/chart-utils.js";
	import RangeSlider from "svelte-range-slider-pips";

	export let gpsData;
	let chartViewObject = null;
	let chartDiv;
	let chartButtons = [
		{ id: "y", title: "Year" },
		{ id: "m", title: "Month" },
		{ id: "d", title: "Day" },
	];
	let selectedChartButton = chartButtons[0].id; // year default
	let chartData = [];
	let xAxis;
	let series;

	let selectedYear = [2022];
	let selectedMonth = [1];
	let selectedDay = [1];

	const changeSelectedButton = (buttonType) => {
		selectedChartButton = buttonType;
		updateChartView();
	};

	const updateChartView = () => {
		chartData = [];
		switch (selectedChartButton) {
			case "y":
				chartData = getYearData(gpsData);
				break;
			case "m":
				chartData = getMonthData(gpsData, selectedYear[0]);
				break;
			case "d":
				chartData = getDayData(gpsData, selectedYear[0], selectedMonth[0]);
				break;
		}

		xAxis.data.setAll(chartData);
		series.data.setAll(chartData);
	};

	const initializeChartView = () => {
		try {
			let root = am5.Root.new(chartDiv);
			let chart = root.container.children.push(am5xy.XYChart.new(root, {
				panX: true,
				panY: true,
				wheelX: "panX",
				wheelY: "zoomX",
				pinchZoomX:true
			}));

			let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
			cursor.lineY.set("visible", false);


			let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
			xRenderer.labels.template.setAll({
			rotation: -90,
			centerY: am5.p50,
			centerX: am5.p100,
			paddingRight: 15
			});

			xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
			maxDeviation: 0.3,
			categoryField: "time",
			renderer: xRenderer,
			tooltip: am5.Tooltip.new(root, {})
			}));

			let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
			maxDeviation: 0.3,
			renderer: am5xy.AxisRendererY.new(root, {})
			}));

			series = chart.series.push(
				am5xy.ColumnSeries.new(root, {
					name: "Series 1",
					xAxis: xAxis,
					yAxis: yAxis,
					valueYField: "value",
					sequencedInterpolation: true,
					categoryXField: "time",
					tooltip: am5.Tooltip.new(root, {
						labelText: "{valueY}",
					}),
				})
			);

			series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5 });
			series.columns.template.adapters.add("fill", function (fill, target) {
				return chart.get("colors").getIndex(series.columns.indexOf(target));
			});

			series.columns.template.adapters.add("stroke", function (stroke, target) {
				return chart.get("colors").getIndex(series.columns.indexOf(target));
			});
			chartData = getYearData(gpsData);
			xAxis.data.setAll(chartData);
			series.data.setAll(chartData);

			chartViewObject = true;
		} catch (err) {
			console.log(err);
		}
	};

	onMount(() => {
		try {
			if ( gpsData.length > 0) {
				initializeChartView();
			}
		} catch (err) {
			console.log(err);
		}
	});

	// When the location changes, set the new lat long to the map
	const onGPSDataChange = () => {
		try {
			if (chartViewObject === null) {
				initializeChartView();
			} else {
				updateChartView();
			}
		} catch (err) {
			console.log(err);
		}
	};
	$:  gpsData && gpsData.length > 0 && onGPSDataChange();

	onDestroy(() => {
		try {
			chartViewObject = null;
		} catch (e) {}
	});
</script>

<section class="card h-fit scale-in-center">
	<p class="font-bold my-1">Average number of Potholes Detected in Frame:</p>

	<div bind:this={chartDiv} class={`${gpsData.length <= 0? "h-0" : "h-96"} w-full rounded-lg`} />
	{#if gpsData.length <= 0}
		<div class="alert alert-red my-1" role="alert">GPS Data has not been loaded.</div>
	{:else}
		<div class="flex">
			{#each chartButtons as chartButton}
				<button
					on:click={() => {
						changeSelectedButton(chartButton.id);
					}}
					class={`card-btn mx-1 text-center  my-1 ${selectedChartButton == chartButton.id ? "card-btn-blue" : ""}`}
				>
					{chartButton.title}
				</button>
			{/each}
		</div>

		{#if selectedChartButton == "m" || selectedChartButton == "d"}
		<p class="font-bold my-1">Year:</p>
			<div class="py-1">
				<RangeSlider bind:values={selectedYear} on:change={updateChartView} pips min={2010} max={2025} step={1} float first="label" last="label" />
			</div>
		{/if}
		{#if selectedChartButton == "d"}
		<p class="font-bold my-1">Month:</p>
			<div class="py-1">
				<RangeSlider bind:values={selectedMonth} on:change={updateChartView} pips min={1} max={12} step={1} float first="label" last="label" />
			</div>
			<!-- else content here -->
		{/if}
	{/if}
</section>
