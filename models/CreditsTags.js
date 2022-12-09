const mongoose = require("mongoose");

const CreditTagSchema = mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    list: [
      {
        name: {
          type: String,
          required: true,
        },
        tip: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { collection: "CreditsTags" }
);

module.exports = mongoose.model("creditstags", CreditTagSchema);
