const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.sports = require("./sport.model.js")(mongoose);
db.registrations = require("./registration.model.js")(mongoose);

module.exports = db;
