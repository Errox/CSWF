module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
      city: String,
      streetName: String,
      URL: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Club = mongoose.model("club", schema);
  return Club;
};
