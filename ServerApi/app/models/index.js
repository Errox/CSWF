const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.sports = require("./sport.model.js")(mongoose);
db.clubs = require("./club.model.js")(mongoose);
db.registrations = require("./registration.model.js")(mongoose);
db.fanProducts = require("./fanProduct.model")(mongoose);

module.exports = db;
