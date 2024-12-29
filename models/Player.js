const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  playerInfoName: { type: String, required: true },
  playerInfoScore: { type: Number, required: true }
});

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
