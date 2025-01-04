import { WebSocket, WebSocketServer } from "ws";
import { UserManger } from "./UserManager";

const wss = new WebSocketServer({port: 3001});

wss.on("connection", (ws: WebSocket) => {
    UserManger.getInstance().addUser(ws);
})

