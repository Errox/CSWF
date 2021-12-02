const { mongo } = require("mongoose");

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
      city: String,
      streetName: String,
      URL: String,
      sports: [],
      fanProducts: [],
      createdByName: String,
      createdById: String
    },
    { timestamps: true }
  );

  s1chema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Club = mongoose.model("club", schema);
  return Club;
};
