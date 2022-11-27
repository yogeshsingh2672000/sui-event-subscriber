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
        { All: [{ Package: "0x3ab1ee8ba7022dc192a9e8df202552e7b6105127" }] },
      ],
    };
    await socket.send(JSON.stringify(payload));
    let response = {};
    socket.on("message", (res) => {
      console.log(`res ${res}`);
      response = res;
    });
    console.log(response.params);
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
