const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Schema = mongoose.Schema;

const Section = new Schema(
  {
    course: { type: String, unique: true }, // slug of Course
    title: { type: String, require: true },
    sectionNumber: { type: Number },
    options: { type: Object }
  },
  {
    timestamps: true
  }
);

Section.plugin(AutoIncrement, {
  id: "section_seq",
  inc_field: "sectionNumber",
  reference_fields: ['courseId'],
  start_seq: 1
});

module.exports = mongoose.model("Section", Section);
