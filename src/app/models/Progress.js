const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const AutoIncrement = require("mongoose-sequence")(mongoose);


const Schema = mongoose.Schema;

// Information about the current lesson of the user in the course and the progress of the lesson
const Progress = new Schema(
    {
        userId: { type: String, ref: "User", required: true },
        course: { type: String, required: true },
        lessonLatest: { type: Number, required: true },
        progress: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    }
);


// Add plugin
Progress.plugin(mongooseDelete, {
    overrideMethods: true,
    deletedAt: true,
});

module.exports = mongoose.model("Progress", Progress);
