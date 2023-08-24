
  export default function resetRoute(greetFunction, data) {
    async function reset(req, res) {
      try {
        await data.reset();
        greetFunction.reset(), res.redirect("/");
        res.redirect('/');
      } catch (err) {
        console.log('Error reseting app', err)
    }
    }
    return {
      reset,
    };
  }