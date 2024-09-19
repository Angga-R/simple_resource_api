import express from "express";
import controller from "./controller.js";

const app = express();

app.use(express.json());
app.get("/", controller.showData);
app.post("/add-data", controller.addData);

app.listen(3000, () => {
  console.info("App starting on port 3000");
});
