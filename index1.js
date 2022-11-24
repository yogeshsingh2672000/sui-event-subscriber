const { WebSocket } = require("ws");
const payload = {
  jsonrpc: "2.0",
  id: 1,
  method: "sui_subscribeEvent",
  params: [
    { All: [{ Package: "0x26d943059b2c6420671bc7c66b3e72b8532f0e7f" }] },
  ],
};
const socket = new WebSocket("ws://localhost:9001", payload);

const main = async () => {
  socket.on("connect", async () => {
    console.log("connected to ws");
  });
};

main();
