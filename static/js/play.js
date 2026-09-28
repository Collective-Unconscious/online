// Loaded by Game.svelte before the engine

globalThis.onLoadMap = (map_name) => {
	console.log("stub on_load_map:", map_name);
};

globalThis.onPlayerSpriteUpdated = (sprite, index, id) => {
	console.log("stub on_player_sprite_updated:", sprite, index, id);
};

globalThis.onPlayerTeleported = (map_id, x, y) => {
	console.log("stub on_player_teleported:", map_id, x, y);
};

globalThis.onRequestFile = (url) => {};

globalThis.onUpdateConnectionStatus = (status) => {
	console.log("stub on_update_connection_status:", status);
};

globalThis.onUpdateSystemGraphic = (name) => {
	console.log("stub on_update_system_graphic:", name);
};

globalThis.syncPlayerData = (uuid, rank, account_bin, badge, id) => {
	console.log("stub sync_player_data:", uuid, rank, account_bin, badge, id);
};

globalThis.shouldConnectPlayer = (uuid) => {
	return true;
};

globalThis.onRoomSwitch = () => {};

globalThis.onPlayerConnectedOrUpdated = (system, name, id) => {
	console.log("stub on_player_connected_or_updated:", system, name, id);
};

globalThis.onPlayerDisconnected = (id) => {
	console.log("stub on_player_disconnected:", id);
};

globalThis.onReceiveInputFeedback = (type) => {};

globalThis.onNametagModeUpdated = (mode) => {};

globalThis.onBadgeUpdateRequested = () => {};

globalThis.showClientToastMessage = (msg, icon) => {
	console.log("stub show_client_toast_message:", msg, icon);
};
