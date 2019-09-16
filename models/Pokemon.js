const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const pokemonSchema = new Schema({
  pokeId: String,
  name: String,
  frontSpriteImage: String,
  backSpriteImage: String,
}, {
  timestamps: true
});

const PokeModel = mongoose.model("Poke", pokemonSchema);
module.exports = PokeModel;