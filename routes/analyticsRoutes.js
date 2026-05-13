const express = require("express");

const router = express.Router();

const Event = require("../models/Event");

const website = process.env.WEBSITE_URL
// Store Event
router.post("/events", async (req, res) => {
  try {
    const {
      session_id,
      event_type,
      page_url,
      timestamp,
      x,
      y,
    } = req.body;

    // Validation
    if (
      !session_id ||
      !event_type ||
      !page_url ||
      !timestamp
    ) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

    // console.log(`[POST] Event received: ${event_type}`);

    const event = await Event.create({
      session_id,
      event_type,
      page_url,
      timestamp,
      x,
      y,
    });

    res.status(201).json(event);

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});


// Sessions with counts
router.get("/sessions", async (req, res) => {
  try {

    const sessions = await Event.aggregate([
      {
        $group: {
          _id: "$session_id",

          totalEvents: {
            $sum: 1,
          },

          lastActivity: {
            $max: "$timestamp",
          },
        },
      },

      {
        $project: {
          _id: 0,
          session_id: "$_id",
          totalEvents: 1,
          lastActivity: 1,
        },
      },

      {
        $sort: {
          lastActivity: -1,
        },
      },
    ]);

    res.json(sessions);

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});


// Events for session
router.get("/sessions/:sessionId", async (req, res) => {
  try {

    const events = await Event.find({
      session_id: req.params.sessionId,
    }).sort({
      timestamp: 1,
    });

    res.json(events);

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});


// Heatmap data
router.get("/heatmap", async (req, res) => {
  try {
    const { page } = req.query;

    const clicks = await Event.find(
      {
        event_type: "click",
        page_url: website,
      },
      {
        _id: 0,
        x: 1,
        y: 1,
        timestamp: 1,
      }
    );

    res.json(clicks);

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// For development
router.get("/all-clicks", async (req, res) => {
  try {

    const clicks = await Event.find({
      event_type: "click",
    });

    res.json(clicks);

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// For development
router.delete("/clear", async (req, res) => {
  try {

    await Event.deleteMany({});

    res.json({
      message: "All events deleted",
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;