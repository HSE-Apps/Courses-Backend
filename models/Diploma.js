const mongoose = require("mongoose");

const DiplomaSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    credits: {
      type: Number,
      required: true,
    },
    subjects: {
      type: [
        {
          name: {
            type: String,
            required: true,
          },
          credits: {
            type: Number,
            required: true,
          },
          requirements: [
            {
              name: {
                type: String,
                required: true,
              },
              credits: {
                type: Number,
                required: true,
              },
            },
          ],
        },
      ],
    },
  },
  { collection: "Diplomas" }
);

module.exports = mongoose.model("diplomas", DiplomaSchema);
