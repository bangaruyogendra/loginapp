const mongoose = require("mongoose");
const person = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    diabetusId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "diabetus",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("person", person);
