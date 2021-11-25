module.exports = app => {
  const fanProducts = require("../controllers/fanProduct.controller.js");

  var router = require("express").Router();

  // Create a new FanProduct
  router.post("/", fanProducts.create);

  // Retrieve all FanProducts
  router.get("/", fanProducts.findAll);

  // Retrieve a single FanProduct with id
  router.get("/:id", fanProducts.findOne);

  // Update a FanProduct with id
  router.put("/:id", fanProducts.update);

  // Delete a FanProduct with id
  router.delete("/:id", fanProducts.delete);

  app.use("/api/fanProducts", router);
};
