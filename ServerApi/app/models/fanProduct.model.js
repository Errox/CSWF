module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      productTitle: String,
      description: String,
      buyLink: String,
      price: Number,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Sport = mongoose.model("fanProduct", schema);
  return Sport;
};
