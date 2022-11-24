// const { WebSocket, createWebSocketStream } = require("ws");
const { WebSocket } = require("ws");
// const { JSONRPCClient } = require("json-rpc-2.0");
let socket = new WebSocket("ws://localhost:9001");
const payload = {
  jsonrpc: "2.0",
  id: 1,
  method: "sui_subscribeEvent",
  params: [
    { All: [{ Package: "0x26d943059b2c6420671bc7c66b3e72b8532f0e7f" }] },
  ],
};

// const main_1 = async () => {
//   socket.on("on", async () => {
//     console.log("connected to ws");
//     let res = await socket.emit("rpc", {
//       jsonrpc: "2.0",
//       id: 1,
//       method: "sui_subscribeEvent",
//       params: [
//         { All: [{ Package: "0x26d943059b2c6420671bc7c66b3e72b8532f0e7f" }] },
//       ],
//     });

//     console.log(res);
//   });
// };

// main_1();
console.log();
try {
  console.log("inside try");
  const main = async () => {
    console.log("inside main");
    socket.on("connect", (socket) => {
      console.log("inside connect");
      console.log("connected to the socket");
      // send a message to the client
      socket.send(JSON.stringify(payload));
      console.log("payload sent");

      // receive a message from the client
      socket.on("message", (data) => {
        const packet = JSON.parse(data);

        console.log(packet);
      });
    });
  };

  main();
} catch (error) {
  console.log(error);
}
