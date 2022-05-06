const express = require("express");
const app = express();
const { Kafka } = require("kafkajs");
const config = require("./src/config");
const messages = require("./input.json");

const client = new Kafka({
  brokers: config.kafka.BROKERS,
  clientId: config.kafka.CLIENTID,
});

const topic = config.kafka.TOPIC;

const producer = client.producer();

app.post("/", async (_req, res) => {
  console.log("calling sendmessage");
  await producer.connect();
  payloads = {
    topic: topic,
    messages: [
      { key: "coronavirus-alert", value: JSON.stringify(messages[0]) },
    ],
  };
  console.log("payloads=", payloads);
  producer.send(payloads);
  res.send("Hello Word");
});

app.get("/", (req, res) => {
  res.send("Hello Word");
});
app.listen(3000, () => {
  console.log("App is running");
});
