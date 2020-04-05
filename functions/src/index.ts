import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";

const app = express();
app.use(cors({ optionsSuccessStatus: 200 }));

app.get("/api", (_req, res) => {
  res.send({ message: "Hello world, this is PatMan10!" });
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
  if (timestamp.toUTCString() === "Invalid Date") {
    jsonObj = { error: timestamp.toUTCString() };
    res.status(400).send(jsonObj);
  } else {
    jsonObj = { unix: timestamp.getTime(), utc: timestamp.toUTCString() };
    res.send(jsonObj);
  }
});

export const App = functions.https.onRequest(app);
