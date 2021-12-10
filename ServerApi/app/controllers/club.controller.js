const db = require("../models");
var jwt = require("jsonwebtoken");
const config = require("../config/auth.config")
const Club = db.clubs;
const mongoose = require("mongoose")
// Create and Save a new Club
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.city || !req.body.streetName || !req.body.URL) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Fetch users token and add it's own information
  var tempToken = req.headers.authorization;
  const payload = jwt.verify(tempToken.split(" ")[1], config.secret, {
    ignoreExpiration: true
  });

  // Create a Club
  const club = new Club({
    name: req.body.name,
    city: req.body.city,
    streetName: req.body.streetName,
    URL: req.body.URL,
    createdById: payload.id,
    createdByName: payload.name + " " + payload.surName
  });


  // Save Club in the database
  club
    .save(club)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some Error occured while updating the club with the new fanProduct"
      })
    });
};

// Retrieve all Clubs from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? {
    name: {
      $regex: new RegExp(name),
      $options: "i"
    }
  } : {};

  Club.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving clubs."
      });
    });
};

// Find a single Club with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Club.findOne({_id : mongoose.Types.ObjectId(id)})
    .then(data => {
      if (!data)
        res.status(404).send({
          message: "Not found Club with id " + id
        });
      else res.send(data);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .send({
          message: "Error retrieving Club with id=" + id
        });
    });
};

// Update a Club by the id in the request
exports.update = (req, res) => {

  var tempToken = req.headers.authorization;
  const payload = jwt.verify(tempToken.split(" ")[1], config.secret, {
    ignoreExpiration: true
  });

  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Club.findById(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: "Not found Club with id " + id
        });
      } else {
        // Check if the user has any rights to edit this specific club.
        console.log(data.createdById + " | " + payload.id)
        if (data.createdById == payload.id) {
          //Start sending the updated club
          Club.findByIdAndUpdate(id, req.body, {
              useFindAndModify: false
            })
            .then(data => {
              if (!data) {
                res.status(404).send({
                  message: `Cannot update Club with id=${id}. Maybe Club was not found!`
                });
              } else res.send({
                message: "Club was updated successfully."
              });
            })
            .catch(err => {
              console.log(err);
              res.status(500).send({
                message: "Error updating Club with id=" + id
              });
            });
        } else {
          res.status(500).send({
            message: "You can't edit this club because it's not your own!"
          })
        }
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .send({
          message: "Error retrieving Club with id=" + id
        });
    });


};

// Delete a Club with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  var tempToken = req.headers.authorization;
  const payload = jwt.verify(tempToken.split(" ")[1], config.secret, {
    ignoreExpiration: true
  });

  Club.findById(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: "Not found Club with id " + id
        });
      } else {
        // Check if the user has any rights to edit this specific club.
        if (data.createdById == payload.id) {
          //Start sending the updated club
          Club.findByIdAndRemove(id, {
              useFindAndModify: false
            })
            .then(data => {
              if (!data) {
                res.status(404).send({
                  message: `Cannot delete Club with id=${id}. Maybe Club was not found!`
                });
              } else {
                res.send({
                  message: "Club was deleted successfully!"
                });
              }
            })
            .catch(err => {
              console.log(err);
              res.status(500).send({
                message: "Could not delete Club with id=" + id
              });
            });
        } else {
          res.status(500).send({
            message: "You can't delete this club because it's not your own!"
          })
        }
      }
    })


};