import express from "express";
import All_tickets from "../controllers/All_tickets.js";
import New_tickets from "../controllers/New_tickets.js";
import Del_tickets from "../controllers/Del_tickets.js";
const router = express();

router.get(
  "/tickets",
  async (req, res) =>
    await All_tickets()
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

router.post(
  "/newticket",
  async (req, res) =>
    await New_tickets(req.body)
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

router.get("/mytickets", async (req, res) => {
  var token = req.headers;
  await All_tickets(token)
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

router.delete("/delticket", async (req, res) => {
  var token = req.headers;
  var { uid } = req.body;
  await Del_tickets(uid, token)
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
