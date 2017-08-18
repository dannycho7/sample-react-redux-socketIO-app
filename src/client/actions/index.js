import socketIOClient from "socket.io-client";
import * as actionTypes from "../constants";

function updateHistory(message_info) {
	return {
		type: actionTypes.UPDATE_HISTORY,
		payload: message_info
	}
}

export const sendMessage = (message) => {
	return function(dispatch, getState) {
		const { socket, activeRoom, user } = getState().chat;
		const timestamp = new Date().toISOString().substr(11, 8); // Hour minute seconds format
		const message_info = Object.assign({}, { message }, { room: activeRoom, user, timestamp });

		socket.emit("message", message_info);
		dispatch(updateHistory(message_info));
	};
};

export const joinRoom = (roomName) => {
	return function(dispatch, getState) {
		const { socket } = getState().chat;

		socket.emit("room", roomName);

		dispatch({
			type: actionTypes.JOIN_ROOM,
			payload: roomName
		});
	};
};

export const initialConnect = (defaultRoom = "default") => {
	return function(dispatch, getState) {
		const { endpoint, activeRoom } = getState().chat;
		const socket = socketIOClient(endpoint);

		socket.on("connect", () => {
			dispatch({
				type: actionTypes.CONNECT_SUCCESS,
				user: "guest-" + socket.id,
				socket: socket
			});
			dispatch(joinRoom(defaultRoom));
		});

		socket.on("message", message_info => {
			console.log("Received message", message_info);
			dispatch(updateHistory(message_info));
		});
	};
};