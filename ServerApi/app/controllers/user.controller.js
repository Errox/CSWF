const db = require("../models");
const config = require("../config/auth.config")
const User = db.users;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// Create and Save a new User
// exports.create = (req, res) => {
//   // Validate request
//   if (!req.body.name) {
//     res.status(400).send({ message: "Content can not be empty!" });
//     return;
//   }

//   // Create a User
//   const user = new User({
//     name: req.body.name,
//     surName: req.body.surName,
//     email: req.body.email,
//     password: req.body.password,
//     dateOfBirth: req.body.dateOfBirth
//     //sportId[] : sport.findAll(userId);
//   });

//   // Save User in the database
//   user
//     .save(user)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the User."
//       });
//     });
// };

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  User.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found User with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving User with id=" + id });
    });
};

// Find a single User with email
exports.findOneByEmail = (req, res) => {
  const email = req.params.email;

  var condition = email ? { email: { $regex: new RegExp(email), $options: "i" } } : {};

  User.find(condition)
    .then(data => {
      if (!data)
        req.status(404).send({ message: "User with " + email + " can' be found"})
      else
        res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error retrieving User with email="+email});
      });
    };

// Update a User by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`
        });
      } else res.send({ message: "User was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      } else {
        res.send({
          message: "User was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

//User content to test if 
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  var tempToken = req.headers.authorization;

  let token = tempToken.split(" ")[1];

  const payload = jwt.verify(token, config.secret, {ignoreExpiration: true});

  payload.message = "Auhtorized content";

  res.status(200).send(payload);
};

// AUTHORIZATION
exports.signup = (req, res) => {
  const user = new User({
    name: req.body.name,
    surName: req.body.surName,
    dateOfBirth: req.body.dateOfBirth,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 7)
  });
  
  user.save((err, user) => {
    if (err) {
      console.log(err.message);
      if(err.message.includes("E11000 duplicate key error collection: myFirstDatabase.users index: email_1 dup key"))
        res.status(500).send({ message: req.body.email + " is already registered. Please use another one."})
      else
        res.status(500).send({ message: "Some error occurred while creating the user" });
      return;
    }
    res.send({ message: user.email + " user was registered successfully!" });
  });
};

exports.signin = (req, res) => {

  User.findOne({
    email: req.body.email
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: "Some error occurred while signing in the user" });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id, email: user.email, name: user.name, surName: user.surName }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        id: user._id,
        name: user.name,
        surName: user.surName,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
        accessToken: token
      });
    });
};
