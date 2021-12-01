module.exports = app => {
  const { authJwt } = require("../middlewares");
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  
  // Check if user has all access
  router.get("/all", users.allAccess);

  // Check if user is logged in
  router.get("/AuthCheck", [authJwt.verifyToken], users.userBoard);

  // // Create a new User
  // router.post("/", users.create);

  // Retrieve all Users
  router.get("/", [authJwt.verifyToken], users.findAll);

  // Retrieve a single User with id
  router.get("/:id", [authJwt.verifyToken], users.findOne);

  // Update a User with id
  router.put("/:id", [authJwt.verifyToken], users.update);

  // // Delete a User with id
  // router.delete("/:id", users.delete);

  router.post("/signup", users.signup);

  router.post("/signin", users.signin);

  app.use("/api/users", router);
};
