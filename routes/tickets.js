import express from "express";
import All_tickets from "../controllers/All_tickets.js";
const router = express();

router.get(
  "/tickets",
  async (req, res) =>
    await All_tickets()
      .then((result) => res.json(result))
      .catch((error) => res.json({ error: error.message }))
);

export default router;
