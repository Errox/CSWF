module.exports = app => {
  const registrations = require("../controllers/registration.controller.js");
  const { authJwt } = require("../middlewares");

  var router = require("express").Router();

  // Create a new Registration
  router.post("/", [authJwt.verifyToken], registrations.create);

  // Retrieve all Registrations
  router.get("/", [authJwt.verifyToken], registrations.findAll);

  // Retrieve a single Registration with id
  router.get("/:id", [authJwt.verifyToken], registrations.findOne);

  // Update a Registration with id
  router.put("/:id", [authJwt.verifyToken], registrations.update);

  // Delete a Registration with id
  router.delete("/:id", [authJwt.verifyToken], registrations.delete);

  app.use("/api/registrations", router);
};
