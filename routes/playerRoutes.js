const express = require("express");
const Player = require("../models/Player");

const router = express.Router();

// Function to update the first player in the table
const updateFirstPlayer = async (newName, newScore) => {
  try {
    const firstPlayer = await Player.findOne();
    if (!firstPlayer) {
      throw new Error("No players found.");
    }

    // Check if the new score is greater than the current score
    if (newScore > firstPlayer.playerInfoScore) {
      firstPlayer.playerInfoName = newName;
      firstPlayer.playerInfoScore = newScore;
      return await firstPlayer.save();
    } else {
      return firstPlayer;
    }
  } catch (err) {
    throw err;
  }
};


// Function to retrieve the top player
const getTopPlayer = async () => {
  try {
    const topPlayer = await Player.findOne().sort({ playerInfoScore: -1 }).exec();
    if (!topPlayer) {
      throw new Error("No players found.");
    }
    return topPlayer;
  } catch (err) {
    throw err;
  }
};

// GET route to retrieve the top player
router.get("/getPlayerInfo", async (req, res) => {
  try {
    const topPlayer = await getTopPlayer();
    res.status(200).json({
      message: "Top player retrieved successfully",
      player: topPlayer
    });
  } catch (err) {
    res.status(500).json({
      message: "Error retrieving top player",
      error: err.message
    });
  }
});

// POST route to update the first player
router.post("/updatePlayerInfo", async (req, res) => {
  const { name, score } = req.body;
  debugger;
  if (!name || !score) {
    return res.status(400).json({ message: "Name and score are required" });
  }

  try {
    const updatedPlayer = await updateFirstPlayer(name, score);
    res.status(200).json({
      message: "First player updated successfully",
      player: updatedPlayer
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating first player",
      error: err.message
    });
  }
});

module.exports = router;
