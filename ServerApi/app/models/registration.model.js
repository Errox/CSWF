module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      userId: String,
      sportId: String,
      clubId: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Sport = mongoose.model("registration", schema);
  return Sport;
};
