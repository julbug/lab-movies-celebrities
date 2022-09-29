// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
// const CelebrityModel = require("../models/Celebrity.model");
const Celebrity = require('../models/Celebrity.model');
// all your routes here

//------------------------------------------- CREATE CELEBRITIES ROUTES
router.get('/celebrities/create', (req, res, next)=>{
    res.render('celebrities/new-celebrity');
  });


  router.post('/celebrities/create', (req, res, next) => {
    const {name, occupation, catchPhrase} = req.body


    Celebrity.create({name, occupation, catchPhrase})
    .then((createdCelebrity) => {
        console.log(`The celebrity ${createdCelebrity.title} has been created`);
        res.redirect('/celebrities');
        // res.redirect('/celebrities/create');
    })
    .catch((err) => next(err));
  
});


//------------------------------------------- DISPLAY CELEBRITIES ROUTE
router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
    .then((celebritiesFromDb) => {
        console.log({celebritiesFromDb})
        data = {
            celebrities: celebritiesFromDb
        }
        res.render('celebrities/celebrities', data);
    })
    .catch((err) => {
        console.log('Error while creating celebrity');
        next(err);
    });
})

//------------------------------------------- EDIT CELEBRITIES ROUTE
router.get('/celebrities/:id/edit', (req, res, next) => {
    Celebrity.findById(req.params.id)
    .then(celebritiesFromDb => {
        console.log(celebritiesFromDb);
        res.render('celebrities/edit-celebrity', celebritiesFromDb);
}).catch(err => {console.log({err})});
})

router.post('/celebrities/:id', (req, res, next)=>{
    Celebrity.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase,
        
    }).then((response)=>{
        
        res.redirect('/celebrities');

    }).catch((err)=>{
        console.log(err);
    })

});

//------------------------------------------- DISPLAY CELEBRITIES DETAILS ROUTE

router.get('/celebrities/:id', (req, res, next) => {
    console.log(req.params.id)
   Celebrity.findById(req.params.id)
    .then((celebrityFromDb) => {
      console.log(celebrityFromDb)
    res.render('celebrities/celebrity-details',{celebrity: celebrityFromDb})
    }).catch((err)=> {
        console.log({err})
    })
  
    })
  
//------------------------------------------- DELETE CELEBRITIES ROUTE
router.post('/celebrities/:id/delete', (req, res, next)=>{

    Celebrity.findByIdAndRemove(req.params.id)
    .then((response)=>{
        res.redirect('/celebrities');
    })
    .catch((err)=>{
        console.log(err);
    })

});




module.exports = router;