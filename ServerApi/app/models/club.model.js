const mongoose = require("mongoose");

module.exports = mongoose => {
  var schema = mongoose.Schema({
    name: String,
    city: String,
    streetName: String,
    URL: String,
    sports: [{
      unique: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "sport"
    }],
    fanProducts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "fanProduct"
    }],
    createdByName: String,
    createdById: String
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

  const Club = mongoose.model("club", schema);
  return Club;
};