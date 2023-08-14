import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import greet from "./factory-function/greetFunction.js";
import flash from "connect-flash";
import session from "express-session";


const app = express();
const greetFunction = greet();
// var connectionString = "postgres://lelly:cHkFvXlgaIdPvAue4lxbMVEkSdRsuiLh@dpg-cjad3vue546c738aonpg-a/lelly_99_greetings_with_routes"

app.use(
  session({
    secret: "loot",
    resave: false,
    saveUninitialized: false,
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

app.get("/", function (req, res) {
  res.render("index", {
    greeting: greetFunction.greetUser(),
    counter: greetFunction.getCounter(),
  });
});

app.post("/", function (req, res) {
  const name = req.body.name;
  const language = req.body.language;


  if (!name.match(/^[A-Za-z]+$/) && !language) {
    req.flash("error", "Enter a valid name and select a language");
  } else if (!name.match(/^[A-Za-z]+$/)) {
    req.flash("error", "Enter a valid name");
  } else if (!language) {
    req.flash("error", "Select a language");
  } else if(language){
    greetFunction.setLanguage(language);
    greetFunction.setName(name);
  }
  if (greetFunction.nameExists(name)) {
    req.flash("error", "User with the same name already exists");
  } else {
    greetFunction.addName(name);
  }
  res.redirect('/');
});

app.get("/greeted", function (req, res) {
  const greetedNames = greetFunction.getNames().map((name) => ({
    name,
    greetCount: greetFunction.getUserGreetCount(name),
  }));
  res.render("greeted", { greetedNames });
});

app.get("/counter/:name", function (req, res) {
  const name = req.params.name;
  const greetCount = greetFunction.getUserGreetCount(name);
  const counter = greetFunction.getCounterForUser();
  res.render("counter", { name, greetCount, counter });
});

app.post("/reset", function (req, res) {
  greetFunction.reset();
  res.redirect('/');
});
const PORT = process.env.PORT || 3007;
app.listen(PORT, function () {
  console.log("App started at port:", PORT);
});
