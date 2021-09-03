import { default as express } from "express";
import { getList } from "./db/pardavejai.js";


const router = express.Router();

router.get("/", async (req, res) => {
    res.type("text/html");
    try {
        const pardavejai = await getList();
        res.render("pardavejai", { pardavejai });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})

export {
    router
};