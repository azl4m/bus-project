const mongoose = require('mongoose')
const busSchema = new mongoose.Schema(
    {
      busName: {
        type: String,
        required: true
      },
      schedules: [
        {
          routeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Route',
            required: true,
          },
          departureTime: {
            type: String, // Time in "HH:mm" format
            required: true,
            validate: {
              validator: function (v) {
                return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v); // Validates 24-hour time format
              },
              message: (props) => `${props.value} is not a valid time format!`,
            },
          },
        },
      ],
      isDeleted:{
        type:Boolean,
        default:false,
        required:true
      }
    },
    { timestamps: true }
  );
  
  
  module.exports = mongoose.model('Bus', busSchema);
  