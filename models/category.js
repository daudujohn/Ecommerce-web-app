const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");

const choicesSchema = {
  label: {
    type: String,
    required: true,
  },
  value: {
    type: Mongoose.Schema.Types.Mixed,
  },
};

const categorySchema = mongoose.Schema({
  /*
   * Name, Description and SEO of the category
   */
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 64,
  },
  description: {
    type: String,
    required: true,
  },
  seoDescription: {
    type: String,
    maxLength: 160,
  },
  thumbnail: {
    type: String,
  },

  /*
   * Properties that apply to this category
   */
  properties: [
    {
      // Property name, E.g RAM
      name: {
        type: String,
        required: true,
      },
      // Property choices, E.g 1GB, 2GB
      choices: [choicesSchema],
      // determines if the admin user is required to state such property when adding an instance
      required: {
        type: Boolean,
      },
      // Type of input that is shown when uploading product detail
      input: {
        type: String,
        enum: [
          "fractionalInput",
          "integerInput",
          "textInput",
          "selectOne",
          "selectMultiple",
        ],
      },
      //   Available values for filter
      filterChoices: [choicesSchema],
    },
  ],
});
