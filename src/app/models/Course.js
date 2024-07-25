const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");
const AutoIncrement = require("mongoose-sequence")(mongoose);


const Schema = mongoose.Schema;

const Course = new Schema(
  {
    id: { type: Number },
    name: { type: String, required: true },
    description: { type: String },
    targets: { type: [String] },
    videoIntro: { type: String, required: true },
    slug: { type: String, slug: "name", unique: true },
    userId: { type: String, ref: "User", required: true },
    category: { type: String, default: "free" },
    price: { type: Number, default: 0 },
    options: { type: Object },
  },
  {
    timestamps: true,
  }
);

// Custom query helpers
Course.query.sortable = function (req) {
  if (req.query.hasOwnProperty("_sort")) {
    const isValidType = ["asc", "desc"].includes(req.query.type);
    return this.sort({
      [req.query.column]: isValidType ? req.query.type : "desc",
    });
  }
  return this;
};

// Add plugin
mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
  overrideMethods: true,
  deletedAt: true,
});
Course.plugin(AutoIncrement, {
  id: "courseId",
  inc_field: "id",
  reference_fields: ["userId"],
  start_seq: 1
});

module.exports = mongoose.model("Course", Course);
