const db = require("../models");
const Registration = db.registrations;
// const Club = db.clubs;
// const Sport = db.sports
// const User = db.users;

// Create and Save a new Registration
exports.create = (req, res) => {
  // Validate request
  if (!req.body.userId && !req.body.sportId && !req.body.clubId) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Registration
  const registration = new Registration({
    userId: req.body.userId,
    sportId: req.body.sportId,
    clubId: req.body.clubId
  });

  // Save Registration in the database
  registration
    .save(registration)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Registration."
      });
    });
};

// Retrieve all Registrations from the database.
exports.findAll = (req, res) => {
  var condition = { };

  Registration.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving registrations."
      });
    });
};

// Find a single Registration with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Registration.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Registration with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Registration with id=" + id });
    });
};

// Update a Registration by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Registration.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Registration with id=${id}. Maybe Registration was not found!`
        });
      } else res.send({ message: "Registration was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Registration with id=" + id
      });
    });
};

// Delete a Registration with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Registration.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Registration with id=${id}. Maybe Registration was not found!`
        });
      } else {
        res.send({
          message: "Registration was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Registration with id=" + id
      });
    });
};

