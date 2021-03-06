module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      userId: String,
      sportId: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Registration = mongoose.model("registration", schema);
  return Registration;
};
