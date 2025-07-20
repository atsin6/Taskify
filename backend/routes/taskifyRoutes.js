import Router from "express";
const router = Router();

// Checker Route
router.get("/", (req, res) => {
  res.send(`It is working`);
});

export default router;
