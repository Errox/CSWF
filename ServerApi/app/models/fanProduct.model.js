const mongoose = require("mongoose");

module.exports = mongoose => {
  var schema = mongoose.Schema({
    productTitle: String,
    description: String,
    buyLink: String,
    price: Number,
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

  const FanProduct = mongoose.model("fanProduct", schema);
  return FanProduct;
};