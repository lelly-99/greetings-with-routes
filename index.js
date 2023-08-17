import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import greet from "./factory-function/greetFunction.js";
import flash from "connect-flash";
import session from "express-session";
// import dotenv from 'dotenv';
import pgPromise from "pg-promise";

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
  'postgres://lelly:cHkFvXlgaIdPvAue4lxbMVEkSdRsuiLh@dpg-cjad3vue546c738aonpg-a/lelly_99_greetings_with_routes'

const db = pgp(connectionString);

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
// app.get("/counter/:name", function (req, res) {
//   const name = req.params.name;
//   const greetCount = greetFunction.getUserGreetCount(name);
//   const counter = greetFunction.getCounterForUser();
//   res.render("counter", { name, greetCount, counter });
// });

// app.post("/reset", function (req, res) {
//   greetFunction.reset();
//   res.redirect('/');
// });
// const PORT = process.env.PORT || 3007;
// app.listen(PORT, function () {
//   console.log("App started at port:", PORT);
// });

app.get("/", async function (req, res) {
  const greetedNames = await db.any("SELECT * FROM names");
  res.render("index", {
    greeting: greetFunction.greetUser(),
    counter: greetFunction.getCounter(),
    greetedNames: greetedNames,
  });
});

app.post("/", async function (req, res) {
  const name = req.body.name;
  const language = req.body.language;

  if (!name.match(/^[A-Za-z]+$/) && !language) {
    req.flash("error", "Enter a valid name and select a language");
  } else if (!name.match(/^[A-Za-z]+$/)) {
    req.flash("error", "Enter a valid name");
  } else if (!language) {
    req.flash("error", "Select a language");
  } else if (greetFunction.nameExists(name)) {
    req.flash("error", "Name already exists");
  } else {
    greetFunction.setLanguage(language);
    greetFunction.setName(name);
    greetFunction.addName(name);
    await db.none(
      "INSERT INTO names (greetedNames, greetCount) VALUES ($1, 1)",
      [name]
    );
  }
  res.redirect("/");
});
// app.get("/greeted", function (req, res) {
//   const greetedNames = greetFunction.getNames().map((name) => ({
//     name,
//     greetCount: greetFunction.getUserGreetCount(name),
//   }));
//   res.render("greeted", { greetedNames });
// });

app.get("/greeted", async function (req, res) {
  const greetedNames = await db.any("SELECT * FROM names")
  res.render("greeted", { greetedNames });
});


app.get("/counter/:name", async function (req, res) {
  const name = req.params.name;
  const user = await db.oneOrNone(
    "SELECT * FROM names WHERE greetedNames = $1",
    [name]
  );
  if (user) {
    const greetCount = user.greetCount;
    const counter = await db.one("SELECT SUM(greetCount) as total FROM names");
    res.render("counter", { name, greetCount, counter: counter.total });
  } else {
    res.render("counter", { name, greetCount: 0, counter: 0 });
  }
});

app.post("/reset", async function (req, res) {
  await db.none("TRUNCATE TABLE names");
  res.redirect("/");
});

const PORT = process.env.PORT || 3007;
app.listen(PORT, function () {
  console.log("App started at port:", PORT);
});
