const express = require("express");
const router = express.Router();
const songController = require("../controllers/songController");

router.get("/", songController.getAllSongs);

router.get("/:songId", songController.getSingleSong);

router.post("/", songController.postSingleSong);

router.put("/:songId", songController.updateSingleSong);

router.delete("/:songId", songController.deleteSingleSong);

module.exports = router;
