const express = require('express');
const router  = express.Router();
const axios = require('axios');

/* GET home page */
router.get('/', (req, res, next) => {
  axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1000`)
  .then(allPokes => {
    // console.log(allPokes.data)
    res.render('apiViews/apiHome', {allPokes : allPokes.data.results})
    }).catch(err => next(err))
});

router.get('/poke/:pokeId', (req, res, next) => {
  //                |
  //                ------------------------------------------
  //                                                          |
  const pokeId = Number(req.params.pokeId) + 1;
  console.log(pokeId);
  
  axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
  .then(responseFromAPI => {
    console.log("><>><<<><><><><><> ", responseFromAPI.data);

    data = {
      pokes: responseFromAPI.data,
      isSaur: true
    };

    if(!responseFromAPI.data.name.includes('saur')) {
      data.isSaur = false;
    }

    res.render('apiViews/apiDetails', data);
  }).catch(err => next(err));
});

module.exports = router;
