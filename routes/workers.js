import express from "express";
import All_workers from "../controllers/All_workers.js";
import Asing_workers from "../controllers/Aing_workers.js";

const router = express();

router.get(
  "/users",
  async (req, res) =>
    await All_workers()
      .then((result) => {
        const data = result.rows.map((row) => {
          let rowData = {};
          result.columns.forEach((column, i) => {
            rowData[column] = row[i];
          });
          return rowData;
        });
        res.json(data);
      })

      .catch((error) => res.json({ error: error.message }))
);
router.put("/asing", async (req, res) => {
  const { uid, asignado } = req.body;
  await Asing_workers(uid, asignado)
    .then((result) => {
      const data = result.rows.map((row) => {
        let rowData = {};
        result.columns.forEach((column, i) => {
          rowData[column] = row[i];
        });
        return rowData;
      });
      res.json(data);
    })

    .catch((error) => res.json({ error: error.message }));
});
export default router;
