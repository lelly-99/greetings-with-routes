
  export default function greetedNamesRoute(data) {
    async function namesGreeted(req, res) {
      try {
        const greetedData = await data.greeted();
  
        res.render("greeted", {greetedData});
      } catch (err) {
        next(err);
      }
    }

    return {
      namesGreeted,
    };
  }