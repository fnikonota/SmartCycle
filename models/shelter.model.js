const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const shelterSchema = new Schema(
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
    availableFood: String[]
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Shelter = model("Shelter", shelterSchema);

module.exports = Shelter;