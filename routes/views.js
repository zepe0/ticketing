import express from "express";
const router = express();
import path from "path";
import { fileURLToPath } from "url";

router.get("/", (req, res) =>
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
router.get("/1", (req, res) =>
  res.sendFile(process.cwd() + "/client/register.html")
);
router.get("/download", (req, res) =>
  res.sendFile(process.cwd() + "/client/download.html")
);

router.use(
  "/client/css",
  express.static(path.join(process.cwd(), "client/css"), {
    setHeaders: function (res, path) {
      if (path.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css");
      }
    },
  })
);
router.use(
  "/img",
  express.static(path.join(process.cwd(), "/img"), {
    setHeaders: function (res, path) {
      if (path.endsWith(".jpg")) {
        res.setHeader("Content-Type", "image/jpeg");
      } else if (path.endsWith(".png")) {
        res.setHeader("Content-Type", "image/png");
      } else if (path.endsWith(".gif")) {
        res.setHeader("Content-Type", "image/gif");
      }
    },
  })
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
