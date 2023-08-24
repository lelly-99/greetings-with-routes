import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import greet from "./factory-function/greetFunction.js";
import flash from "connect-flash";
import session from "express-session";
import pgPromise from "pg-promise";
import query from "./service/query.js";

//routes
import main from './routes/main.js'
import greetedNamesRoute from './routes/greeted.js'
import counterRoute from "./routes/counter.js";
import resetRoute from "./routes/reset.js";


const pgp = pgPromise();
// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
  useSSL = true;
}
// which db connection to use
const connectionString =
  process.env.DATABASE_URL ||
  "postgres://lelly:cHkFvXlgaIdPvAue4lxbMVEkSdRsuiLh@dpg-cjad3vue546c738aonpg-a.oregon-postgres.render.com/lelly_99_greetings_with_routes?ssl=true";

const database = pgp(connectionString)

//query instance
const data = query(database);

//greet factory function instance
const greetFunction = greet();

//route instance
const mainRoute = main(greetFunction, data)
const greetedRoute = greetedNamesRoute(data)
const counter = counterRoute(data)
const resets = resetRoute(greetFunction, data)


const app = express();

//session
app.use(
  session({
    secret: "greet",
    resave: false,
    saveUninitialized: true,
  })
);

//
app.use(flash());
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//enables error messages to appear on screen
app.use(function (req, res, next) {
  res.locals.messages = req.flash();
  next();
});

//routes
app.get('/', mainRoute.greet);
app.post('/', mainRoute.greeting);
app.get("/greeted", greetedRoute.namesGreeted);
app.get("/counter/:name", counter.count);
app.post("/reset", resets.reset);

const PORT = process.env.PORT || 3007;
app.listen(PORT, function () {
  console.log("App started at port:", PORT);
});
