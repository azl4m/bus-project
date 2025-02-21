const mongoose = require("mongoose");

const taxiSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  type: { type: String, enum: ["car", "goods", "traveler","auto","ambulance","for-wheeler-goods","lory"], required: true },
  phone: { type: String, required: true, unique: true },
  place:{ type : String, required : true},
  city:{ type : String, required : true}
},{timestamps:true});

taxiSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Taxi", taxiSchema);

