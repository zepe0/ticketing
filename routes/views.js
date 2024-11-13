import express from "express";
const router = express();

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
router.get("/singup", (req, res) =>
  res.sendFile(process.cwd() + "/client/register.html")
);

export default router;
