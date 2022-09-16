// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model');
// all your routes here

//CREATE
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

//READ
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

// router.get('/celebrities', (req, res, next) => {
//     Celebrity.find()
//     .then((celebrities) => {
//         res.render('celebrities/celebrities', {celebrities});
//     })
//     .catch((err) => {
//         console.log('Error while creating celebrity');
//         next(err);
//     });
// })



module.exports = router;