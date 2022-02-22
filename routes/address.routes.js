

module.exports = (app) => {
    const auth= require('../middleware/auth');
    const address = require("../controllers/ShippingAddressController.controller");
    var router = require("express").Router();
    
  
    router.post("/address",auth,address.shippingAddress );
  
  
  
    // router.post("/logout", users.logout);
  
    app.use("/", router);
  };