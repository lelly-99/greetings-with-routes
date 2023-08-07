import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import greet from "./factory-function/greetFunction.js";

const app = express();
const greetFunction = greet();

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
  res.render('index', {
    greeting: greetFunction.greetUser(),
    counter: greetFunction.getCounter(),
  });
});

// app.post("/counter", function (req, res) {
//   res.redirect("/");
// });


// app.post("/userGreeted", function (req, res) {
//   res.render("index", {
//   });
// });

const PORT = process.env.PORT || 3007;
app.listen(PORT, function () {
  console.log("App started at port:", PORT);
});

