const dbConfig = require("../config/db.config");

const mongoose = require("mongoose");

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.address = require("./address.model")(mongoose);
db.order = require("./order.model")(mongoose);
db.user = require("./user.model")(mongoose);
db.product=require("./product.model")(mongoose);

module.exports = db;