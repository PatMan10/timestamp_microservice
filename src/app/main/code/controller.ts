import { Router } from "../../../deps/prod.ts";
import { Timestamp } from "./models.ts";
import { IndexPage } from "./ui.ts";
import { URLs } from "./utils.ts";

const controller = new Router();

controller.get(URLs.INDEX, (ctx) => {
  ctx.response.headers.set("content-type", "text/html");
  ctx.response.body = IndexPage();
});

controller.get(
  URLs.GET_TIMESTAMP,
  (ctx) => {
    const { date } = ctx.params;
    const timestamp = new Timestamp(date);
    ctx.response.body = timestamp;
  },
);

export default controller;
