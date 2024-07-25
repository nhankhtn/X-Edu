const mongoose = require("mongoose");
// const AutoIncrement = require("mongoose-sequence")(mongoose);

const Schema = mongoose.Schema;

const User = new Schema(
  {
    _id: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    avatar: {
      type: String, default: '/img/avatarDefault.jpg'
    },
    role: { type: String, required: true, default: "user" },
    provider: String,
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", User);
