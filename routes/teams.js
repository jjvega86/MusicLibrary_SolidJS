const express = require("express");
const router = express.Router();
const { Team, Player } = require("../models/team");

//! EXAMPLE ROUTES
//* Team Endpoints

// GET all teams in collection
router.get("/", async (req, res) => {
  try {
    let teams = await Team.find();
    if (!teams) return res.status(400).send(`No teams found!`);

    return res.status(200).send(teams);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// GET a single team by ObjectId
router.get("/:teamId", async (req, res) => {
  try {
    let team = await Team.findById(req.params.teamId);
    if (!team) return res.status(400).send(`Team not found!: ${error}`);
    return res.status(200).send(team);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// POST a single team
router.post("/", async (req, res) => {
  try {
    const team = {
      name: req.body.name,
      city: req.body.city,
      players: [],
    };
    let newTeam = new Team(team); // create new Team model using team object
    let { error } = newTeam.teamValidate(team); // call built in validate method to run Joi validation
    if (error) return res.status(400).send(`Body not valid: ${error}`); // if an error is found, send failed response
    await newTeam.save();
    return res.send(newTeam);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// PUT team by :id
router.put("/:teamId", async (req, res) => {
  try {
    let update = {
      name: req.body.name,
      city: req.body.city,
    };
    let team = await Team.findByIdAndUpdate(req.params.teamId, update, {
      new: true,
    });
    if (!team) return res.status(400).send(`Team not found!`);

    return res.send(team);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// DELETE team by :id
router.delete("/:teamId", async (req, res) => {
  try {
    let team = await Team.findByIdAndDelete(req.params.teamId);
    if (!team) return res.status(400).send(`Team not found!`);
    return res.status(200).send(team);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

//* Player Endpoints

// GET all players by :teamId
router.get("/:teamId/players", async (req, res) => {
  try {
    let team = await Team.findById(req.params.teamId);
    if (!team) return res.status(400).send(`Team not found!: ${error}`);

    // Here, we are sending the subdocument array of Player objects once we find the Team
    return res.send(team.players);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// POST new player to team by :teamId
router.post("/:teamId/players", async (req, res) => {
  try {
    // get Team document that player will be added to and validate
    let team = await Team.findById(req.params.teamId);
    if (!team) return res.status(400).send(`Team not found!: ${error}`);

    // Create new Player object from body of request
    let playerToAdd = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      rating: req.body.rating,
    };

    // Create new Player model, validate request body
    let newPlayer = new Player(playerToAdd);
    let { error } = newPlayer.playerValidate(playerToAdd);
    if (error) return res.status(400).send(`Body not valid: ${error}`);

    // Add new Player to Team players subdocument
    team.players.push(newPlayer);
    await team.save();

    // Send the Team object with the updated subdocument
    return res.status(200).send(team);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// GET player by :playerId from team by :teamId
router.get("/:teamId/players/:playerId", async (req, res) => {
  try {
    let team = await Team.findById(req.params.teamId);
    if (!team) return res.status(400).send(`Team not found!: ${error}`);

    // Using the special "id" subdocument method to find a specific player by _id
    let player = team.players.id(req.params.playerId);
    if (!player) return res.status(400).send(`Player not found!`);
    return res.send(player);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// PUT player by :playerId from team by :teamId
router.put("/:teamId/players/:playerId", async (req, res) => {
  try {
    // Find the team with the player we want to update using findById
    let team = await Team.findById(req.params.teamId);
    if (!team) return res.status(400).send(`Team not found!: ${error}`);

    // Find the player inside of the players subdocument using the .id method
    let player = team.players.id(req.params.playerId);
    if (!player) return res.status(400).send(`Player not found!`);

    // Validate the body of the request coming in
    let { error } = player.playerValidate(req.body);
    if (error) return res.status(400).send(`Body not valid: ${error}`);

    // Update any properties of the player subdocument coming in the body of the request
    // using the .set() method
    player.set(req.body);
    await team.save();

    return res.send(team);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// DELETE player by :playerId from team by :teamId
router.delete("/:teamId/players/:playerId", async (req, res) => {
  try {
    let team = await Team.findById(req.params.teamId);
    if (!team) return res.status(400).send(`Team not found!: ${error}`);

    // Using the special "id" subdocument method to find a specific player by _id
    // Then calling the "remove()" method to remove it. This returns the subdocument removed
    let player = team.players.id(req.params.playerId).remove();
    if (!player) return res.status(400).send(`Player not found!`);

    await team.save();
    return res.send(player);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

module.exports = router;
