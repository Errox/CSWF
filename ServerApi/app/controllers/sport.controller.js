const db = require("../models");
const mongoose = require("mongoose")
var jwt = require("jsonwebtoken");
const config = require("../config/auth.config")
const Sport = db.sports;
const Club = db.clubs;

// Create and Save a new Sport
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Sport
  const sport = new Sport({
    title: req.body.title,
    description: req.body.description,
    wikiLink: req.body.wikiLink,
    openForRegistration: req.body.openForRegistration ? req.body.openForRegistration : false,
  });

  // Save Sport in the database
  sport
    .save(sport)
    .then(data => {
      var sportResponse = data;
      res.send(sportResponse);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Sport."
      });
    });

}

// Retrieve all Sports from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? {
    title: {
      $regex: new RegExp(title),
      $options: "i"
    }
  } : {};

  Sport.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving sports."
      });
    });
};

// Find a single Sport with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Sport.findOne({
      _id: mongoose.Types.ObjectId(id)
    })
    .then(data => {
      if (!data)
        res.status(404).send({
          message: "Not found Sport with id " + id
        });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({
          message: "Error retrieving Sport with id=" + id
        });
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
  var tempToken = req.headers.authorization;
  const payload = jwt.verify(tempToken.split(" ")[1], config.secret, {
    ignoreExpiration: true
  });


  console.log(req.body);
  if (!req.body.clubId) {
    res.status(400).send({
      message: "Missing clubId!"
    });
    return;
  } else {
    Club.findOne({
        _id: mongoose.Types.ObjectId(req.body.clubId)
      })
      .then(data => {
        if (!data)
          res.status(404).send({
            message: "Not found Club with id " + id
          });
        else {
          // If the user has the right, then continue.
          if (data.createdById == payload.id) {
            Sport.findByIdAndUpdate(id, req.body, {
                useFindAndModify: false
              })
              .then(data => {
                if (!data) {
                  res.status(404).send({
                    message: `Cannot update Sport with id=${id}. Maybe Sport was not found!`
                  });
                } else res.send({
                  message: "Sport was updated successfully."
                });
              })
              .catch(err => {
                res.status(500).send({
                  message: "Error updating Sport with id=" + id
                });
              });
          } else {
            res.status(403).send({
              message: "You're not allowed to create a sport for this specified club."
            })
          }
        }
      })
      .catch(err => {
        console.log(err);
        res
          .status(500)
          .send({
            message: "Error retrieving Club with id=" + req.body.clubId
          });
      });
  }
};

// Delete a Sport with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  if (!req.body.id) {
    res.status(400).send({
      message: "Missing clubId!"
    });
    return;
  } else {
    const id = req.params.id;
    var tempToken = req.headers.authorization;
    const payload = jwt.verify(tempToken.split(" ")[1], config.secret, {
      ignoreExpiration: true
    });


    Club.findOne({
        _id: mongoose.Types.ObjectId(req.body.id)
      })
      .then(data => {
        if (!data)
          res.status(404).send({
            message: "Not found Club with id " + id
          });
        else {
          // If the user has the right, then continue.
          if (data.createdById == payload.id) {
            Sport.findByIdAndRemove(id, {
                useFindAndModify: false
              })
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

          } else {
            res.status(403).send({
              message: "You're not allowed to create a sport for this specified club."
            })
          }
        }
      })
      .catch(err => {
        console.log(err);
        res
          .status(500)
          .send({
            message: "Error retrieving Club with id=" + req.body.id
          });
      });
  }
};


// Find all open for registration Sports
exports.findAllOpenForRegistration = (req, res) => {
  Sport.find({
      openForRegistration: true
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving sports."
      });
    });
};