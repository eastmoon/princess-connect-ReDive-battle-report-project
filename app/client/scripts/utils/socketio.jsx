// Connection to socket.io
import io from "socket.io-client";
const socket = io(window.location.href);
socket.on("news", (data) => {
    console.log(data);
    socket.emit("frontend call", {frontend: "call backend"});
});

export default socket;
