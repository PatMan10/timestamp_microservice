import functions = require("firebase-functions");
import express = require("express");

const app = express();

app.get("/", (_req, res) => {
  res.send("Hello world, this is Patman10!");
});

app.get("/api/timestamp/:date_string?", (req, res) => {
  const date_string = req.params.date_string;
  let date_utc, date_unix;
  if (/^\d+$/.test(date_string)) date_unix = Number(date_string);
  else date_utc = date_string;

  let timestamp;
  if (date_unix) timestamp = new Date(date_unix);
  else if (date_utc) timestamp = new Date(date_utc);
  else timestamp = new Date();

  let jsonObj;
  if (timestamp.toUTCString() === "Invalid Date")
    jsonObj = { error: timestamp.toUTCString() };
  else jsonObj = { unix: timestamp.getTime(), utc: timestamp.toUTCString() };

  res.send(jsonObj);
});

export const App = functions.https.onRequest(app);
