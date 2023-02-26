const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const restaurantSchema = new Schema(
  {
    author: {type: Schema.Types.ObjectId, ref: "User"},
    title: String,
    address: {
        street: String,
        city: String,
        state: String,
        zip: Number
    },
    phoneNumber: String,
    availableFood: [String],
    foodTypes: {
        type: [String],
        enum: ['Fancy', 'General', 'Fast', 'Take-Out']
    },
    comments: [String]
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Restaurant = model("Restaurant", restaurantSchema);

module.exports = Restaurant;