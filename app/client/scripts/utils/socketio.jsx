// Connection to socket.io
import io from "socket.io-client";
const socket = io("http://localhost:8080");
socket.on("news", (data) => {
    console.log(data);
    socket.emit("frontend call", {frontend: "call backend"});
});

export default socket;
