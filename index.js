import express from "express";

//Create app
const app = express();

//Routine
app.get("/", function (req, res) {
  res.send("Real Esate");
});

//Define project and start the app

const port = 3000;
app.listen(port, () => {
  console.log("listen port", port);
});
