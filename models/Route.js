const mongoose = require('mongoose')
const routeSchema = new mongoose.Schema({
    routeName: {
      type: String,
      required: true,
    },
    stops: [
      {
        placeId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Place',
          required: true,
        },
        delay: {
          type: Number, // Time difference in minutes or seconds
          required: true,
        },
      },
    ],
    isDeleted:{
      type:Boolean,
      default:false,
      required:true
    }
  }, { timestamps: true });
  
  module.exports = mongoose.model('Route', routeSchema);
  