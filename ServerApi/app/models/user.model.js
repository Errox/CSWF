module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
      surName: String,
      email: {
         type: String, 
         unique: true
      },
      password: String,
      dateOfBirth: Date,
    },
    { timestamps: true }
  );

  // schema.method("toJSON", function() {
  //   const { __v, _id, ...object } = this.toObject();
  //   object.id = _id;
  //   return object;
  // });

  const User = mongoose.model("user", schema);
  return User;
};
