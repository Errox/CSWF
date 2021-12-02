const db = require("../models");
const FanProduct = db.fanProducts;
const Club = db.clubs;

// Create and Save a new FanProduct
exports.create = (req, res) => {
  // Validate request
  if (!req.body.productTitle) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  if (!req.body.clubId) {
    res.status(400).send({
      message: "Missing clubId!"
    });
  }



  // Create a FanProduct
  const fanProduct = new FanProduct({
    productTitle: req.body.productTitle,
    description: req.body.description,
    buyLink: req.body.buyLink,
    price: req.body.price,
  });

  // Save FanProduct in the database
  fanProduct
    .save(fanProduct)
    .then(data => {
      var fanproduct = data;
      // Get the club
      db.clubs.findByIdAndUpdate(
          req.body.clubId, {
            $push: {
              fanProducts: fanProduct
            }
          }, {
            new: true,
            useFindAndModify: false
          }
        ).then(data => {
          // update club 
          res.send(fanproduct);
        })
        .catch(err => {
          res.status(500).send({
            message: err.message || "Some Error occured while updating the club with the new fanProduct"
          })
        });


    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the FanProduct."
      });
    });
};

// Retrieve all FanProducts from the database.
exports.findAll = (req, res) => {
  const productTitle = req.query.productTitle;
  var condition = productTitle ? {
    productTitle: {
      $regex: new RegExp(productTitle),
      $options: "i"
    }
  } : {};

  FanProduct.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving fanProducts."
      });
    });
};

// Find a single FanProduct with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  FanProduct.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({
          message: "Not found FanProduct with id " + id
        });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({
          message: "Error retrieving FanProduct with id=" + id
        });
    });
};

// Update a FanProduct by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  FanProduct.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false
    })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update FanProduct with id=${id}. Maybe FanProduct was not found!`
        });
      } else res.send({
        message: "FanProduct was updated successfully."
      });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating FanProduct with id=" + id
      });
    });
};

// Delete a FanProduct with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  FanProduct.findByIdAndRemove(id, {
      useFindAndModify: false
    })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete FanProduct with id=${id}. Maybe FanProduct was not found!`
        });
      } else {
        res.send({
          message: "FanProduct was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete FanProduct with id=" + id
      });
    });
};