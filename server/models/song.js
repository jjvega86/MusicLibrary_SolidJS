const mongoose = require("mongoose");
const Joi = require("joi");

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  album: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  genre: { type: String, required: true },
});

songSchema.methods.songValidate = (song) => {
  const schema = Joi.object({
    title: Joi.string().min(1).max(50).required(),
    artist: Joi.string().min(1).max(50).required(),
    album: Joi.string().min(1).max(50).required(),
    releaseDate: Joi.date().required(),
    genre: Joi.string().min(1).max(50).required(),
  });
  return schema.validate(song);
};

const Song = mongoose.model("Song", songSchema);

module.exports = {
  Song,
};
