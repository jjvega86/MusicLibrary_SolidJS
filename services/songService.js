const { Song } = require("../models/song");

const getSongs = async () => {
  try {
    let songs = await Song.find();
    return songs;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getSong = async (songId) => {
  try {
    let song = await Song.findById(songId);
    return song;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createSong = async (songData) => {
  try {
    let song = new Song(songData);
    let { error } = song.songValidate(songData);
    if (error) return { error };
    await song.save();
    return { song };
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateSong = async (songId, songData) => {
  try {
    let song = await Song.findByIdAndUpdate(songId, songData, {
      new: true,
    });
    return song;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteSong = async (songId) => {
  try {
    let song = await Song.findByIdAndDelete(songId);
    return song;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getSongs,
  getSong,
  createSong,
  updateSong,
  deleteSong,
};
