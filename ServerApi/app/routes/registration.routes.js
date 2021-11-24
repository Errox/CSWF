module.exports = app => {
  const registrations = require("../controllers/registration.controller.js");

  var router = require("express").Router();

  // Create a new Registration
  router.post("/", registrations.create);

  // Retrieve all Registrations
  router.get("/", registrations.findAll);

  // Retrieve all published Registrations
  router.get("/OpenForRegistration", registrations.findAllOpenForRegistration);

  // Retrieve a single Registration with id
  router.get("/:id", registrations.findOne);

  // Update a Registration with id
  router.put("/:id", registrations.update);

  // Delete a Registration with id
  router.delete("/:id", registrations.delete);

  app.use("/api/registrations", router);
};
