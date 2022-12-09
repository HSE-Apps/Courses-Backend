const mongoose = require("mongoose");

const CourseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    course_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      required: false,
    },
    credit: {
      type: Array,
      required: true,
    },
    grade_level: {
      type: Array,
      required: true,
    },
    semesters: {
      type: Number,
      required: true,
    },
    max_semesters: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    contact: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: {
      type: String,
      required: true,
    },
    additional_info: {
      type: String,
      required: false,
    },
  },
  { collection: "Courses" }
);

module.exports = mongoose.model("courses", CourseSchema);
