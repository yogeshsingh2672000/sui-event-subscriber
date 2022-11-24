// const express = require("express");
import express from "express";
import fetch from "node-fetch";

// initializing the app
const URL = "http://127.0.0.1:9001/json";
const app = express();
const port = 5000;
const payload = {
  jsonrpc: "2.0",
  id: 1,
  method: "sui_subscribeEvent",
  params: [
    { All: [{ Package: "0x7bd922a80fcb131a0d6a65485a7c41db28416dd3" }] },
  ],
};

// used to access the payload
app.use(express.json());

app.get("/", (req, res) => {
  subscribeEvent();
  res.send("Hello World!");
});
const subscribeEvent = async () => {
  const response = await fetch(URL, payload);
  console.log(response);
};

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
