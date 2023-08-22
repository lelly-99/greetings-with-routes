import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import greet from "./factory-function/greetFunction.js";
import flash from "connect-flash";
import session from "express-session";
// import dotenv from 'dotenv';
import pgPromise from "pg-promise";
import query from "./service/query.js";

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

const database = pgp(connectionString);
const data = query(database);

// dotenv.config();
const greetFunction = greet();
const app = express();
app.use(
  session({
    secret: "greet",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.locals.messages = req.flash();
  next();
});

app.get("/", async function (req, res) {
  const countOne = await data.updateCount();
  const counter = countOne.count;
  res.render("index", {
    greeting: greetFunction.greetUser(),
    counter,
  });
});

app.post("/", async function (req, res) {
  const names = req.body.name;
  const name = names.toLowerCase();
  const language = req.body.language;

  if (!name.match(/^[A-Za-z]+$/) && !language) {
    req.flash("error", "Enter a valid name and select a language");
  } else if (!name.match(/^[A-Za-z]+$/)) {
    req.flash("error", "Enter a valid name");
  } else if (!language) {
    req.flash("error", "Select a language");
    // } else if (greetFunction.nameExists(name)) {
    //   req.flash("error", "Name already exists");
  } else {
    greetFunction.setLanguage(language);
    greetFunction.setName(name);
    await data.insert(name);
    greetFunction.addName(name);
  }
  res.redirect("/");
});
app.get("/greeted", async function (req, res) {
  const greetedData = await data.greeted();
  res.render("greeted", { greetedData });
});

app.get("/counter/:name", async function (req, res) {
  const name = req.params.name;
  const counter = await data.count(name);
  //how do we work with the null value on the object??
  // console.log(counter)
  if (counter !== null) {
    res.render("counter", {
      name,
      counter: counter.sum,
    });
  }
});

app.post("/reset", async function (req, res) {
  await data.reset();
  greetFunction.reset(), res.redirect("/");
});
const PORT = process.env.PORT || 3047;
app.listen(PORT, function () {
  console.log("App started at port:", PORT);
});
