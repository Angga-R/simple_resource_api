import express from "express";
import muridController from "../controller/murid-controller.js";

const route = new express.Router();

route.get("/", muridController.showData);

export { route };
