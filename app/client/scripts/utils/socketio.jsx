// Connection to socket.io
import io from "socket.io-client";
const socket = io(window.location.origin);
socket.on("initial connection", (data) => {
    console.log("> Socket Server version", data);
    socket.emit("initial connection", {userAgent: navigator.userAgent});
});

export default socket;
