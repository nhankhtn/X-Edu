const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Schema = mongoose.Schema;

const Section = new Schema(
  {
    title: { type: String, require: true },
    userId: { type: String, ref: "User", required: true },
    courseId: { type: Number, ref: "Course", required: true },
    sectionNumber: { type: Number },
    options: { type: Object },
    // primary key(userId, courseId, sectionNumber)
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
