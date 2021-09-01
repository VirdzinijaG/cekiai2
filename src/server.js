import { default as express } from "express";
import exphbs from "express-handlebars";

const app = express();
const hbs = exphbs({
    helpers: {
        dateFormat(d) {
            if (d instanceof Date) {
                return d.toISOString().substring(0, 10);
            } else {
                return d;
            }
        }
    }
})
app.engine("handlebars", hbs);
app.set("view engine", "handlebars");

const port = 3000;

app.use(express.static("web"));
app.use(express.urlencoded({
    extended: true
}));





app.listen(port, () => { // narsykles port
    console.log(`Example app listening at http://localhost:${port}`);
});