const songServices = require("../services/songService");

const getAllSongs = async (req, res) => {
  try {
    let songs = [];
    if (req.query.search) {
      songs = await songServices.filterSongs(req.query.search);
    } else {
      songs = await songServices.getSongs();
    }
    if (!songs) return res.status(400).send("No songs found!");
    console.log("Songs: ", songs);
    return res.status(200).json(songs);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
};

const getSingleSong = async (req, res) => {
  try {
    let song = await songServices.getSong(req.params.songId);
    if (!song)
      return res
        .status(400)
        .send(`Song with id ${req.params.songId} not found!`);
    return res.status(200).json(song);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
};

const postSingleSong = async (req, res) => {
  try {
    let result = await songServices.createSong(req.body);
    if (result.error)
      return res.status(400).send(`Body not valid: ${result.error}`);
    return res.json(result.song);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
};

const updateSingleSong = async (req, res) => {
  try {
    let song = await songServices.updateSong(req.params.songId, req.body);
    if (!song) return res.status(400).send(`Song not found!`);
    return res.json(song);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
};

const deleteSingleSong = async (req, res) => {
  try {
    let song = await songServices.deleteSong(req.params.songId);
    if (!song) return res.status(400).send(`Song not found!`);
    return res.json(song);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
};

module.exports = {
  getAllSongs,
  getSingleSong,
  postSingleSong,
  updateSingleSong,
  deleteSingleSong,
};
