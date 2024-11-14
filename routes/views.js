import express from "express";
const router = express();
import path from "path";
import { fileURLToPath } from "url";

router.get("/chat", (req, res) =>
  res.sendFile(process.cwd() + "/client/index.html")
);
router.get("/admin", (req, res) =>
  res.sendFile(process.cwd() + "/client/admin.html")
);
router.get("/tickets", (req, res) =>
  res.sendFile(process.cwd() + "/client/tickets.html")
);
router.get("/users", (req, res) =>
  res.sendFile(process.cwd() + "/client/usuarios.html")
);
router.get("/newticket", (req, res) =>
  res.sendFile(process.cwd() + "/client/formclient.html")
);
router.get("/", (req, res) =>
  res.sendFile(process.cwd() + "/client/register.html")
);
router.get("/download", (req, res) =>
  res.sendFile(process.cwd() + "/client/download.html")
);
router.use(
  "/client/js",
  express.static(path.join(process.cwd(), "client/js"), {
    setHeaders: function (res, path) {
      if (path.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript");
      }
    },
  })
);

export default router;
