 export default function counterRoute(data) {
    async function count(req, res) {
      try {
        
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
      } catch (err) {
        next(err);
      }
    }

    return {
      count,
    };
  }