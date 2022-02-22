



const db = require("../models");
const Order = db.order;
const Product=db.product;
const Address=db.address;


const jwt = require('jsonwebtoken');
const { ObjectId } = require("mongodb");








exports.CreateOrder = (req, res) => {

    if (!req.header('x-auth-token')) {
        res.status(400).send("Please Login first to access this endpoint!")
        return;
    }
    if (req.header('x-auth-token')) {
        const token = req.header('x-auth-token');
        const decoded = jwt.verify(token, "newkey");
        //We are decoding the access token in order to get the user _id 
        var userId = decoded._id
        console.log(decoded);
        Order.find({ user: ObjectId(userId) }).populate([{ path: "user" },{path:"product"}]).then((data) => {
           
           
           
            if (data.isAdmin == true) {
                res.status(403).send('You are not authorized to access this endpoint!');
                return;
            }
            else {

                if (data.quantity == 0) {
                    res.send(`Product with ID - ${ObjectId(req.body.productId)} is currently out of stock!`)
                    return;
                }
                const addresses=Address.find({_id:req.body.addressId})
                if (addresses.length==0) {
                    res.send(`No Address found for ID - ${ObjectId(req.body.addressId)}!`)
                    return;
                }
               var products=Product.findOne({_id:req.body.productId})
              
               
                if (products.length==0) {
                    res.status(400).send(`No Product found for ID - ${ObjectId(req.body.productId)}!`);
                }
                else  {
                    const creatingOrder = new Order({
                        address:req.body.addressId,
                        product:req.body.productId,
                        quantity:req.body.quantity,
                        user:userId,
                        
                       
                            
                    });
              
                  
                    
                    creatingOrder.save(creatingOrder).then(orders=>{
                        orders.populate([{path:"user"},{path:"address"},{path:"product"}])
                        .then(populated=>{res.status(200).send(populated);
                        })
                        
                    
                       
                    }).catch((err)=>{
                        console.log(err);
                        res.send("Error creating Order");
                    })
                   
                    return;
                }

            }
        })
    }
}    