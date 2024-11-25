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
router.post("/assing", async (req, res) => {
  debugger;
  const { id, assignee } = req.body;
  await Asing_workers(id, assignee)
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
