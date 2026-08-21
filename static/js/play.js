import createEasyRpgPlayer from "/bin/ynoengine-simd.js";

let player;
window.addEventListener("load", () => {
	const canvas = document.getElementById("canvas");

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

globalThis.onLoadMap = (map_name) => {
	console.log("stub on_load_map:", map_name);
}

globalThis.onPlayerSpriteUpdated = (sprite, index, id) => {
	console.log("stub on_player_sprite_updated:", sprite, index, id);
}

globalThis.onPlayerTeleported = (map_id, x, y) => {
	console.log("stub on_player_teleported:", map_id, x, y);
}

globalThis.onRequestFile = (url) => {
	console.log("stub on_request_file:", url);
}

globalThis.onUpdateConnectionStatus = (status) => {
	console.log("stub on_update_connection_status:", status);
}

globalThis.onUpdateSystemGraphic = (name) => {
	console.log("stub on_update_system_graphic:", name);
}

