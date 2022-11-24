const { WebSocket } = require("ws");
const socket = new WebSocket("ws://localhost:9001");

const subscribeEvent = async (payload) => {
  socket.on("open", async () => {
    console.log("connected to ws");
    let payload = {
      jsonrpc: "2.0",
      id: 1,
      method: "sui_subscribeEvent",
      params: [
        { All: [{ Package: "0x26d943059b2c6420671bc7c66b3e72b8532f0e7f" }] },
      ],
    };
    let result = await socket.send(JSON.stringify(payload));
    console.log(`response rpc: ${result}`);

    socket.on("message", (res) => {
      console.log(`res ${res}`);
    });
  });
};

const rpcObject = {
  jsonrpc: "2.0",
  id: 1,
  method: "sui_subscribeEvent",
  params: [
    { All: [{ Package: "0x26d943059b2c6420671bc7c66b3e72b8532f0e7f" }] },
  ],
};

subscribeEvent(rpcObject);
