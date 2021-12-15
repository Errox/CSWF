const mongoose = require("mongoose");

module.exports = mongoose => {
  var schema = mongoose.Schema({
    title: {
      type: String,
      unique: true
    },
    description: String,
    openForRegistration: Boolean,
    wikiLink: String,
    clubs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "club"
    }]
  }, {
    timestamps: true
  });

  schema.method("toJSON", function () {
    const {
      __v,
      _id,
      ...object
    } = this.toObject();
    object.id = _id;
    return object;
  });

  const Sport = mongoose.model("sport", schema);
  return Sport;
};