module.exports = app => {
  const clubs = require("../controllers/club.controller.js");
  const { authJwt } = require("../middlewares");
  

  var router = require("express").Router();

  // Create a new Club
  router.post("/", [authJwt.verifyToken], clubs.create);

  // Retrieve all Clubs
  router.get("/", [authJwt.verifyToken], clubs.findAll);

  // Retrieve a single Club with id
  router.get("/:id", [authJwt.verifyToken], clubs.findOne);

  // Update a Club with id
  router.put("/:id", [authJwt.verifyToken], clubs.update);

  // Delete a Club with id
  router.delete("/:id", [authJwt.verifyToken], clubs.delete);

  router.post("/sport/add/:clubId", [authJwt.verifyToken], clubs.addSport);

  router.delete("/sport/remove/:clubId", [authJwt.verifyToken], clubs.removeSport);

  app.use("/api/clubs", router);
};
