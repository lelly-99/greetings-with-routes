import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import greet from "./factory-function/greetFunction.js";
import flash from "connect-flash";
import session from "express-session";

const app = express();
const greetFunction = greet();

app.use(session({ 
  secret: 'loot',
  resave: false, 
  saveUninitialized: false
}));

app.use(flash());

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.render('index', {
    greeting: greetFunction.greetUser(),
    counter: greetFunction.getCounter(),
  });
});

app.post('/', function (req, res) {
  const name = req.body.name;
  const language = req.body.language;

  greetFunction.setName(name);
  greetFunction.setLanguage(language);
  greetFunction.reset();
  // const errorMessage = greetFunction.errorMessage(name, language);
  // if (errorMessage) {
  //   req.flash("error", errorMessage);
  // }
  res.redirect('/');
});

app.get('/greeted', function (req, res) {
  const greetedNames = greetFunction.getNames().map(name => ({
    name,
    greetCount: greetFunction.getUserGreetCount(name),
  }));
  res.render("greeted", { greetedNames });
});

app.get('/counter/:name', function (req, res) {
  const name = req.params.name;
  const greetCount = greetFunction.getUserGreetCount(name);
  const counter = greetFunction.getCounter();
  res.render('counter', { name, greetCount, counter });
});
const PORT = process.env.PORT || 3007;
app.listen(PORT, function () {
  console.log("App started at port:", PORT);
});



