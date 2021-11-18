module.exports = app => {
  const sports = require("../controllers/sport.controller.js");

  var router = require("express").Router();

  // Create a new Sport
  router.post("/", sports.create);

  // Retrieve all Sports
  router.get("/", sports.findAll);

  // Retrieve all published Sports
  router.get("/published", sports.findAllPublished);

  // Retrieve a single Sport with id
  router.get("/:id", sports.findOne);

  // Update a Sport with id
  router.put("/:id", sports.update);

  // Delete a Sport with id
  router.delete("/:id", sports.delete);

  // Create a new Sport
  router.delete("/", sports.deleteAll);

  app.use("/api/sports", router);
};
