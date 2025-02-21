const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema(
  {
    place: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
      default:"Kozhikode"
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

placeSchema.index({ location: "2dsphere" }); // Enable geospatial queries

module.exports = mongoose.model("Place", placeSchema);
