export default function main(greetFunction, data) {
  async function greet(req, res) {
    try {
      const countOne = await data.updateCount();
      const counter = countOne.count;

      res.render("index", {
        greeting: greetFunction.greetUser(),
        counter,
      });
    } catch (err) {
      next(err);
    }
  }

  async function greeting(req, res) {
    try {
      const names = req.body.name;
      const name = names.toLowerCase();
      const language = req.body.language;
      const error = greetFunction.errorMessage(name, language);
  
      if (error) {
        req.flash("error", error);
      } else {
        greetFunction.setLanguage(language);
        greetFunction.setName(name);
        await data.insert(name);
      }
      res.redirect("/");
    } catch (err) {
      console.log('Error', err)
    }
  }
  
  return {
    greet,
    greeting,
  };
}
