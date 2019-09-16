const express = require('express');
const router  = express.Router();
const axios = require('axios');
const Pokemon = require("../models/pokemon")

/* GET home page */
router.get('/', (req, res, next) => {
  axios.get('http://pokeapi.co/api/v2/pokemon/?offset=0&limit=1000')
    .then(allPokes => {
      res.render('apiViews/apiHome', { allThePokemon: allPokes.data.results });
    })
    .catch(err => next(err))
});

router.get('/poke/:pokeId', (req, res, next) => {
  Pokemon.findOne({ pokeId: Number(req.params.pokeId) + 1 })
    .then(pokeFromDb => {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${Number(req.params.pokeId) + 1}`)
        .then(responseFromAPI => {
          console.log("><>><<<><><><><><> ", responseFromAPI.data);
          data = {
            pokes: responseFromAPI.data,
            isSaur: responseFromAPI.data.name.includes('saur')
          };

          res.render('apiViews/apiDetails', data);
        }).catch(err => next(err));
    }).catch(err => next(err));

});

module.exports = router;