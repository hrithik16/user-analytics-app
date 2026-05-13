const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  session_id: {
    type: String,
    required: true,
  },

  event_type: {
    type: String,
    enum: ["page_view", "click"],
    required: true,
  },

  page_url: {
    type: String,
    required: true,
  },

  timestamp: {
    type: Date,
    required: true,
  },

  x: Number,
  y: Number,
});


// Indexes
EventSchema.index({ session_id: 1 });
EventSchema.index({ page_url: 1 });
EventSchema.index({ event_type: 1 });
EventSchema.index({ timestamp: 1 });

module.exports = mongoose.model("Event", EventSchema);