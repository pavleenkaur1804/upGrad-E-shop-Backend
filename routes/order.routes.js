module.exports = (app) => {
    const orders= require("../controllers/order.controller");
    var router = require("express").Router();
  
    router.post("/orders", orders.CreateOrder);
  
  
  
    // router.post("/logout", users.logout);
  
    app.use("/", router);
  };
  