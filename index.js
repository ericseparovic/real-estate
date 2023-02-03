import express from "express";
import userRouters from "./routes/userRouters.js";

//Create app
const app = express();

//Routing
app.get("/", userRouters);

//Define port and start the app\
const port = 3000;
app.listen(port, () => {
  console.log("listen port", port);
});
