const mongoose = require("mongoose");
const Joi = require("joi");

//! EXAMPLE MODEL

const playerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  rating: { type: Number, required: true },
});

playerSchema.methods.playerValidate = (player) => {
  const schema = Joi.object({
    firstName: Joi.string().min(1).max(50).required(),
    lastName: Joi.string().min(1).max(50).required(),
    rating: Joi.number().required(),
  });
  return schema.validate(player);
};

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  players: [playerSchema],
});

teamSchema.methods.teamValidate = (team) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(50).required(),
    city: Joi.string().min(1).max(50).required(),
    players: Joi.array().required(),
  });
  return schema.validate(team);
};

const Player = mongoose.model("Player", playerSchema);
const Team = mongoose.model("Team", teamSchema);

module.exports = {
  Player,
  Team,
};
