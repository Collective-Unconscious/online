let player;
window.addEventListener("load", () => {
	const canvas = document.getElementById("canvas");
	const game_view = document.getElementById("game-view");

	new ResizeObserver((e) => {
		console.log(e[0].contentRect.width);
		if (e[0].contentRect.width === 640) {
			canvas.style.width = "580px";
			canvas.style.height = "435px";
		} else {
			canvas.style.width = "320px";
			canvas.style.height = "240px";
		}
	}).observe(game_view);

	window.addEventListener("keydown", (ev) => {
		if (ev.key.startsWith("Arrow"))
			ev.preventDefault();
	});

	createEasyRpgPlayer().then((p) => {
		player = p;
		player.initApi();
		player.api.sessionReady();
		canvas.focus();
	});
});

function onLoadMap(map_name) {
	console.log("stub on_load_map:", map_name);
}

function onPlayerSpriteUpdated(sprite, index, id) {
	console.log("stub on_player_sprite_updated:", sprite, index, id);
}

function onPlayerTeleported(map_id, x, y) {
	console.log("stub on_player_teleported:", map_id, x, y);
}

function onRequestFile(url) {
	console.log("stub on_request_file:", url);
}

function onUpdateConnectionStatus(status) {
	console.log("stub on_update_connection_status:", status);
}

function onUpdateSystemGraphic(name) {
	console.log("stub on_update_system_graphic:", name);
}

