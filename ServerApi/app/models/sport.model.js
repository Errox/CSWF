module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: String,
      description: String,
      openForRegistration: Boolean,
      wikiLink: String,
      clubId: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Sport = mongoose.model("sport", schema);
  return Sport;
};
