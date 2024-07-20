const mongoose = require("mongoose");

const diabetus = new mongoose.Schema(
  {
    Pregnancies: {
      type: Number,
      required: true,
    },
    Glucose: {
      type: Number,
      required: true,
    },
    BloodPressure: {
      type: Number,
      required: true,
    },
    SkinThickness: {
      type: Number,
      required: true,
    },
    Insulin: {
      type: Number,
      required: true,
    },
    BMI: {
      type: Number,
      required: true,
    },
    DiabetesPedigreeFunction: {
      type: Number,
      required: true,
    },
    Age: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("diabetus", diabetus);
