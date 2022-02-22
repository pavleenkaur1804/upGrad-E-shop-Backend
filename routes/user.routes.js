module.exports = (app) => {
    const users = require("../controllers/auth.controller");
    var router = require("express").Router();
  
    router.post("/auth", users.login);
  
    router.post("/users", users.signup);
  
    // router.post("/logout", users.logout);
  
    app.use("/", router);
  };
  