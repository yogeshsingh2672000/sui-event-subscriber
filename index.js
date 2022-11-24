import fetch from "node-fetch";
import { JSONRPCClient } from "json-rpc-2.0";

// initializing the app

const main = async () => {
  const URL = "http://127.0.0.1:9001/json";
  const client = new JSONRPCClient((jsonRPCRequest) =>
    fetch(URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(jsonRPCRequest),
    }).then((response) => {
      if (response.status === 200) {
        // Use client.receive when you received a JSON-RPC response.
        return response
          .json()
          .then((jsonRPCResponse) => client.receive(jsonRPCResponse));
      } else if (jsonRPCRequest.id !== undefined) {
        return Promise.reject(new Error(response.statusText));
      }
    })
  );
  const payload = {
    jsonrpc: "2.0",
    id: 1,
    method: "sui_subscribeEvent",
    params: [
      { All: [{ Package: "0x7bd922a80fcb131a0d6a65485a7c41db28416dd3" }] },
    ],
  };
  client
    .request("echo", { text: "Hello, World!" })
    .then((result) => console.log(result));
};
main();
