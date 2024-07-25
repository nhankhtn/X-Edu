const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Role = new Schema(
  {
    _id: { type: Number, required: true },
    role: { type: String, required: true, default: "user" }
  }
);

module.exports = mongoose.model("Role", Role);
