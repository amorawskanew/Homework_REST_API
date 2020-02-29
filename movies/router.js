const { Router } = require("express");
const { Movie } = require("./sequelize-rest");

const router = new Router();

// Create a new movie resource  
router.post("/movies", (req, res, next) => {
  Movie.create(req.body)
    .then(movie => res.json(movie))
    .catch(next);
});

// Read all_ movies (the collections resource)
router.get("/movies", (req, res, next) => {
  Movie.findAll()
    .then(movie => {
      res.json(movie);
    })
    .catch(next);
});

//_read_ a single movie resource
router.get("/movies/:id", (req, res, next) => {
  Movie.findOne({
    where: {id: req.params.id}
  })
  .then(movie => {
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).end();
    }
  })
  .catch(next);
});

// _update_ a single movie resource
router.put("/movies/:id", (req, res, next) => {
  Movie.findOne({
    where: {id: req.params.id}
  })
    .then(movie => {
      if (movie) {
        movie.update(req.body)
        .then(movie => res.json(movie));
      } else {
        res.status(404).end();
      }
    })
    .catch(next);
});

// _delete_ a single movie resource
router.delete("/movies/:id", (req, res, next) => {
  Movie.destroy({
    where: {id: req.params.id,}
  })
    .then(numDeleted => {
      if (numDeleted) {
        res.status(204).end();
      } else {
        res.status(404).end();
      }
    })
    .catch(next);
});

module.exports = router