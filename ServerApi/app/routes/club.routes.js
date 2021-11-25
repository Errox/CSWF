module.exports = app => {
  const clubs = require("../controllers/club.controller.js");

  var router = require("express").Router();

  // Create a new Club
  router.post("/", clubs.create);

  // Retrieve all Clubs
  router.get("/", clubs.findAll);

  // Retrieve a single Club with id
  router.get("/:id", clubs.findOne);

  // Update a Club with id
  router.put("/:id", clubs.update);

  // Delete a Club with id
  router.delete("/:id", clubs.delete);

  app.use("/api/clubs", router);
};
