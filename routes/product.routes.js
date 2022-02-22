

module.exports = (app) => {
   
    const product = require("../controllers/Product.controller");
    const auth =require('../middleware/auth');
    var router = require("express").Router();
    
    //It will retrieve all the products
    router.get("/products",product.SearchProducts);
    //It will retrieve all the categories
    router.get("/products/categories",product.Category);

    //It will retrive all the products by their ID
    router.get("/products/:id",product.findProductById);
  //It will save  the products

  router.post("/products",auth,product.SaveProducts);

  
  router.put("/products/:id",auth,product.updateProduct);
  
    // router.post("/logout", users.logout);
  router.delete("/products/:id",auth,product.deleteProduct);
    app.use("/", router);
  };