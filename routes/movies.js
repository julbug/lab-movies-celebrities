// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
// all your routes here
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');
const User = require('../models/User.model');

//------------------------------------------- CREATE MOVIES ROUTES
  router.get('/movies/create', (req, res, next)=>{
      Celebrity.find()
      .then((celebritiesFromDb) => {
          console.log({celebritiesFromDb})
          data = {
              celebrities: celebritiesFromDb
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

router.get('/movies/:id', (req, res, next) => {
  console.log(req.params.id)
 Movie.findById(req.params.id).populate('cast')
  .then((movieFromDb) => {
    console.log(movieFromDb)
  res.render('movies/movie-details',{movie: movieFromDb})
  }).catch((err)=> {
      console.log({err})
  })

  })

  
  //------------------------------------------- DELETE MOVIES ROUTE

router.post('/movies/:id/delete', (req, res, next)=>{

  Movie.findByIdAndRemove(req.params.id)
  .then((response)=>{
      res.redirect('/movies');
  })
  .catch((err)=>{
      console.log(err);
  })

});

  
  //------------------------------------------- EDIT MOVIE ROUTES
router.get('/movies/:id/edit', (req, res, next) => {
  Celebrity.find()
  .then((allTheCelebrities)=>{
   Movie.findById(req.params.id)
   .then((movieFromDB)=> {
       let myCelebrities = [];
       let otherCelebrities = [];
       allTheCelebrities.forEach((eachCelebrity) => {
           if (movieFromDB.cast.includes(eachCelebrity.id)) {
               myCelebrities.push(eachCelebrity);
           }
       });

       res.render('movies/edit-movie', {
           myCelebrities: myCelebrities,
           otherCelebrities: otherCelebrities,
           movie: movieFromDB,
       });
       });
   }).catch(err=> {console.log(err);

});
});

router.post('/movies/:id', (req, res, next)=>{

   Movie.findByIdAndUpdate(req.params.id, {
       title: req.body.title,
       genre: req.body.genre,
       plot: req.body.plot,
       cast: req.body.cast
   }).then((response)=>{
       res.redirect('/movies');
   }).catch((err)=>{
       console.log(err);

   
   })

});

//------------------------POST ROUTE FOR LIKING A MOVIE

router.post('/movies/:id/like', (req, res, next)=>{

    User.findByIdAndUpdate(req.session.currentlyLoggedIn._id,
        {$addToSet: {likedMovies: req.params.id}})
        
        .then((result)=>{
            res.redirect('/movies');
        })
        .catch((err)=>{
            console.log(err)
        })
})
;

module.exports = router;