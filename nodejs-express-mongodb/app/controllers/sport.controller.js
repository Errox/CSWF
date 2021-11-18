const db = require("../models");
const Sport = db.sports;

// Create and Save a new Sport
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Sport
  const sport = new Sport({
    title: req.body.title,
    description: req.body.description,
    wikiLink: req.body.wikiLink,
    openForRegistration: req.body.openForRegistration ? req.body.openForRegistration : false
  });

  // Save Sport in the database
  sport
    .save(sport)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Sport."
      });
    });
};

// Retrieve all Sports from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Sport.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving sports."
      });
    });
};

// Find a single Sport with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Sport.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Sport with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Sport with id=" + id });
    });
};

// Update a Sport by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Sport.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Sport with id=${id}. Maybe Sport was not found!`
        });
      } else res.send({ message: "Sport was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Sport with id=" + id
      });
    });
};

// Delete a Sport with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Sport.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Sport with id=${id}. Maybe Sport was not found!`
        });
      } else {
        res.send({
          message: "Sport was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Sport with id=" + id
      });
    });
};


// Find all published Sports
exports.findAllPublished = (req, res) => {
  Sport.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving sports."
      });
    });
};
