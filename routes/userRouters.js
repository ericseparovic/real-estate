import express from "express";

const router = express.Router();

//Routine
router.get("/", function (req, res) {
  res.send("Real Esate");
});

router.get("/nosotros", function (req, res) {
  res.send("Real Esate");
});

export default router;
