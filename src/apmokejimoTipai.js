import { default as express } from "express";
import { deleteRecord, getList, getOne, save } from "./db/apmokejimoTipai.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.type("text/html");
  try {
    const apmokejimoTipai = await getList();
    res.render("apmokejimoTipai", { apmokejimoTipai });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/naujas", async (req, res) => {
  res.type("text/html");
  try {
    res.render("apmokejimoTipas", {});
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/:id", async (req, res) => {
  res.type("text/html");
  try {
    const apmokejimoTipas = await getOne(req.params.id);
    if (apmokejimoTipas.length > 0) {
      res.render("apmokejimoTipas", apmokejimoTipas[0]);
    } else {
      res.redirect("/apmokejimoTipai");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.post("/save", async (req, res) => {
  res.type("text/html");
  if (
    typeof req.body.pavadinimas !== "string" ||
    req.body.pavadinimas.trim() === ""
  ) {
    res.redirect("/apmokejimoTipai");
    return;
  }
  try {
    await save(
      req.body.id,
      req.body.pavadinimas,
    );
    res.redirect("/apmokejimoTipai");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/:id/delete", async (req, res) => {
  res.type("text/html");
  try {
    await deleteRecord(req.params.id);
    res.redirect("/apmokejimoTipai");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export { router };
