const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Image = new Schema(
  {
    name: { type: String, required: true },
    path: { type: String, required: true },
    contentType: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Image", Image);
