const { WebSocket, createWebSocketStream } = require("ws");
const { JSONRPCClient } = require("json-rpc-2.0");
// let socket = new WebSocket("ws://localhost:9001");

// socket.onopen = function(e) {
//   console.log("[open] Connection established");
//   console.log("Sending to server");
//   socket.send("My name is John");
// };

// socket.onmessage = function(event) {
//   console.log(`[message] Data received from server: ${event.data}`);
// };

// socket.onclose = function(event) {
//   if (event.wasClean) {
//     console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
//   } else {
//     // e.g. server process killed or network down
//     // event.code is usually 1006 in this case
//     console.log('[close] Connection died');
//   }
// };

// socket.onerror = function(error) {
//   console.log(`[error]`);
// };

// const main = async () => {

//     console.log("establishing connection...");
//     socket.send({"jsonrpc":"2.0", "id": 1, "method": "sui_subscribeEvent", "params": [{"All":[{"Package":"0x26d943059b2c6420671bc7c66b3e72b8532f0e7f"}]}]});

//

// const main = async () => {
//     socket.on("open", async () => {
//         console.log("connected to ws");
//         let res = await socket.emit('rpc', {"jsonrpc":"2.0", "id": 1, "method": "sui_subscribeEvent", "params": [{"All":[{"Package":"0x26d943059b2c6420671bc7c66b3e72b8532f0e7f"}]}]});
//         console.log(res);

//         socket.on("message", (res) => {
//             console.log(`res; ${res}`);
//         })
//     });

// }

// main()

var JSONRPC_TIMEOUT_MS = 1000;

var jsonrpc = function (url, onopen, onclose, onnotification) {
  var rpcid = 0,
    pending = {},
    ws = new WebSocket(url);
  if (!ws) return null;
  ws.onclose = onclose;
  ws.onmessage = function (ev) {
    const frame = JSON.parse(ev.data);
    console.log("rcvd", frame, "pending:", pending);
    if (frame.id !== undefined) {
      if (pending[frame.id] !== undefined) pending[frame.id](frame); // Resolve
      delete pending[frame.id];
    } else {
      if (onnotification) onnotification(frame);
    }
  };
  if (onopen) onopen();
  return {
    close: () => ws.close(),
    call: function (method, params) {
      const id = rpcid++,
        request = { id, method, params };
      ws.send(JSON.stringify(request));
      console.log("sent", request);
      return new Promise(function (resolve, reject) {
        setTimeout(JSONRPC_TIMEOUT_MS, function () {
          if (pending[id] === undefined) return;
          log("Timing out frame ", JSON.stringify(request));
          delete pending[id];
          reject();
        });
        pending[id] = (x) => resolve(x);
      });
    },
  };
};

jsonrpc(
  "ws://localhost:9001",
  () => {
    console.log("connected");
  },
  () => {
    console.log("disconnected");
  },
  (data) => {
    console.log(`data: ${data}`);
  }
);
