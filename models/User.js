const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    msId: {
      type: String,
      required: true,
      default: "None",
    },
    note: {
      type: String,
      required: false,
      default: "none",
    },
    courses: {
      Freshman: {
        semester1: [{ type: mongoose.Schema.Types.ObjectId, ref: "courses" }],
        semester2: [{ type: mongoose.Schema.Types.ObjectId, ref: "courses" }],
      },
      Sophomore: {
        semester1: [{ type: mongoose.Schema.Types.ObjectId, ref: "courses" }],
        semester2: [{ type: mongoose.Schema.Types.ObjectId, ref: "courses" }],
      },
      Junior: {
        semester1: [{ type: mongoose.Schema.Types.ObjectId, ref: "courses" }],
        semester2: [{ type: mongoose.Schema.Types.ObjectId, ref: "courses" }],
      },
      Senior: {
        semester1: [{ type: mongoose.Schema.Types.ObjectId, ref: "courses" }],
        semester2: [{ type: mongoose.Schema.Types.ObjectId, ref: "courses" }],
      },
    },
  },
  { collection: "Users" }
);

module.exports = mongoose.model("users", UserSchema);
