import express from "express";
import { route } from "./routes.js";

const app = express();

app.use(express.json());
app.use(route);

app.listen(3000, () => {
  console.info("App starting on port 3000");
});
