import express from "express";
import controller from "./controller.js";

const route = new express.Router();

route.get("/", controller.showData);

export { route };
