module.exports = app => {
  const sports = require("../controllers/sport.controller.js");
  const { authJwt } = require("../middlewares");

  var router = require("express").Router();

  // Create a new Sport
  router.post("/", [authJwt.verifyToken], sports.create);

  // Retrieve all Sports
  router.get("/", [authJwt.verifyToken], sports.findAll);

  // Retrieve all published Sports
  router.get("/OpenForRegistration", [authJwt.verifyToken], sports.findAllOpenForRegistration);

  // Retrieve a single Sport with id
  router.get("/:id", [authJwt.verifyToken], sports.findOne);

  // Update a Sport with id
  router.put("/:id", [authJwt.verifyToken], sports.update);

  // Delete a Sport with id
  router.delete("/:id", [authJwt.verifyToken], sports.delete);

  app.use("/api/sports", router);
};
