const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Schema = mongoose.Schema;

const Lesson = new Schema(
  {
    userId: { type: String, ref: "User", required: true },
    courseId: { type: Number, ref: "Course", required: true },
    sectionNumber: { type: Number, ref: "Section", required: true },
    lessonNumber: { type: Number },
    title: { type: String, require: true },
    url: { type: String },
    options: { type: Object }
    // primary key(userId, courseId, lessonNumber)
  },
  {
    timestamps: true
  }
);

Lesson.plugin(AutoIncrement, {
  id: 'lesson_seq',
  inc_field: 'lessonNumber',
  reference_fields: ['courseId'],
  start_seq: 1
});


module.exports = mongoose.model("Lesson", Lesson);
