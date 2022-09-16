// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
// all your routes here
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

//------------------------------------------- CREATE MOVIES ROUTES
  router.get('/movies/create', (req, res, next)=>{
      Celebrity.find()
      .then((celebritiesFromDb) => {
          console.log({celebritiesFromDb})
          data = {
              celbrities: celebritiesFromDb
          }
      })
   res.render('movies/new-movie', data);
  });


  router.post('/movies/create', (req, res, next) => {
    const {title, genre, plot, cast} = req.body

    Movie.create({title, genre, plot, cast})
    .then((createdMovie) => {
        console.log(`The movie ${createdMovie.title} has been created`);
        res.redirect('/movies');
    })
    .catch((err) => next(err));
  
});

//------------------------------------------- DISPLAY MOVIES ROUTE
router.get('/movies', (req, res, next) => {
    Movie.find()
    .then((movies) => {
        res.render('movies/movies', {movies});
    })
    .catch((err) => {
        console.log('Error while creating a movie');
        next(err);
    });
});





//------------------------------------------- DISPLAY MOVIE DETAILS ROUTE
router.get("/:id", (req, res) => {
    Movie.findOne({_id: req.params.id})
      .populate("cast")
      .then((movie) => {
        res.render("movies/movie-details", { movie });
      })
      .catch((err) => console.log(err));
  });
  
  //------------------------------------------- DELETE MOVIE ROUTE
  // router.post("/movies/:id/delete", (req, res) => {
  //   Movie.findByIdAndRemove(req.params.id)
  //     .then(( "/movies") => {
  //       res.redirect('/');
  //     })
  //     .catch((err) => console.log(err));
  // });

  router.post("/movies/:id/delete", (req, res) => {
    Movie.findByIdAndRemove(req.params.id)
      .then(res.redirect(req.baseUrl + "/movies"))
      .catch((err) => console.log(err));
  });
  
  //------------------------------------------- EDIT MOVIE ROUTES
  router.get("/:id/edit", (req, res) => {
    Movie.findOne({ _id: req.params.id })
      .populate("cast")
      .then((movie) => {
        Celebrity.find()
          .then((celebrities) => {
            console.log(movie);
            res.render("movies/edit-movie", { movie, celebrities });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.lot(err));
  });
  
  //////////////////////////////////////////////////////
  router.post("/:id", (req, res) => {
    const { title, genre, plot, cast } = req.body;
  
    const newMovie = {
      title: title,
      genre: genre,
      plot: plot,
      cast: cast,
    };
  
    Movie.findByIdAndUpdate(`${req.params.id}`, newMovie)
      .then(res.redirect(req.baseUrl + "/movies"))
      .catch((err) => console.log(err));
  });


module.exports = router;