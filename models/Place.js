const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  place: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  district:{
    type:String,
    required:true
  }
}, { timestamps: true });

module.exports = mongoose.model('Place', placeSchema);
