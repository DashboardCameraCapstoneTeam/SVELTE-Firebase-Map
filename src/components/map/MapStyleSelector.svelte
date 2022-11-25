<script>
	export let mapStyle;
	export let isReadyForStyleSwitching;
	let isLargeMenu = false;
	const mapStyleList = [
		{ name: "Streets", id: "streets-v11", img: "https://assets.website-files.com/5e83362767d71ffd59a0c8a9/5ea01b977fb48a501b898a93_ipad-map%20streets.png" },
		{ name: "Dark", id: "dark-v10", img: "https://assets.website-files.com/5e83362767d71ffd59a0c8a9/5ea01810f9a5b1c55841ee6f_ipad-map%20dark.png" },
		{ name: "Outdoors", id: "outdoors-v11", img: "https://assets.website-files.com/5e83362767d71ffd59a0c8a9/5ea01bd0779fa266f900ba3c_ipad-map%20outdoors.png" },
		{ name: "Satellite", id: "satellite-streets-v11", img: "https://assets.website-files.com/5e83362767d71ffd59a0c8a9/6025417270820571127804d8_ipad-map.png" },
		{ name: "Dark - Traffic", id: "navigation-night-v1", img: "https://assets.website-files.com/5e83362767d71ffd59a0c8a9/5ea01810f9a5b1c55841ee6f_ipad-map%20dark.png" },
	];
	const toggleStyle = (mapStyleItem) => {
		try {
			mapStyle = mapStyleItem;
			isReadyForStyleSwitching = true;
		} catch (e) {
			console.log("Unable to toggle Map Style");
		}
	};
	const toggleMenu = () => {
		isLargeMenu = !isLargeMenu;
	};
</script>

