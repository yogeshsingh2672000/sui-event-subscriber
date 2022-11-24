// const { WebSocket, createWebSocketStream } = require("ws");
const { WebSocket } = require("ws");
// const { JSONRPCClient } = require("json-rpc-2.0");
let socket = new WebSocket("ws://localhost:9001");

const main = async () => {
  socket.on("connect", async () => {
    console.log("connected to ws");
    let res = await socket.emit("rpc", {
      jsonrpc: "2.0",
      id: 1,
      method: "sui_subscribeEvent",
      params: [
        { All: [{ Package: "0x26d943059b2c6420671bc7c66b3e72b8532f0e7f" }] },
      ],
    });

    console.log(res);
  });
};

main();
