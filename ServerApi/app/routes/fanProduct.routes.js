module.exports = app => {
  const fanProducts = require("../controllers/fanProduct.controller.js");
  const { authJwt } = require("../middlewares");
  

  var router = require("express").Router();

  // Create a new FanProduct
  router.post("/", [authJwt.verifyToken], fanProducts.create);

  // Retrieve all FanProducts
  router.get("/", [authJwt.verifyToken], fanProducts.findAll);

  // Retrieve a single FanProduct with id
  router.get("/:id", [authJwt.verifyToken], fanProducts.findOne);

  // Update a FanProduct with id
  router.put("/:id", [authJwt.verifyToken], fanProducts.update);

  // Delete a FanProduct with id
  router.delete("/:id", [authJwt.verifyToken], fanProducts.delete);

  app.use("/api/fanProducts", router);
};
