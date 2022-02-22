
const db = require("../models");
const User = db.user;
const Product = db.product;
const jwt = require('jsonwebtoken')


exports.SearchProducts = (req, res) => {

    if (req.query.PageNo == 0 && req.query.PageSize == 10 && req.query.direction == 'DESC' && req.query.sortBy == id) {
        Product.find({}).then((data) => {
            res.status(200).send(JSON.stringify(data));
        })
        return;
    }
    else {
        Product.find({}).then((data) => {
            res.status(200).send(data);
        })
    }

}
exports.Category = (req, res) => {
    Product.aggregate([
        {
            $unwind: "$category"
        },
        { $unset: ["_id"] },
        {
            $group: {
                _id: null,
                category: { $addToSet: "$category" }
            }
        }
    ]).then((data) => {

        res.status(200).send(data)
    })
}
exports.findProductById = (req, res) => {
    Product.find({ _id: req.params.id }).then((data) => {
        res.status(200).send(data);
    })
}
exports.SaveProducts = (req, res) => {


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
        User.findById(userId).then((data) => {
            console.log(data);
            if (data.isAdmin == false) {
                res.status(403).send('You are not authorized to access this endpoint!');
                return;
            }
            else {
                const product = new Product({
                    id: req.body.id,
                    name: req.body.name,
                    category: req.body.category,
                    manufacturer: req.body.manufacturer,
                    availableItems: req.body.availableItems,
                    price: req.body.price,
                    imageURL: req.body.imageURL,
                    description: req.body.description,

                })
                product.save(product).then((data) => {
                    res.status(200).send(data);
                });
            }
        })

    }

}
exports.updateProduct = (req, res) => {

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
        User.findById(userId).then((data) => {
            console.log(data);
            if (data.isAdmin == false) {
                res.status(403).send('You are not authorized to access this endpoint!');
                return;
            }
        });
    }

    const product = {
        id: req.body.id,
        name: req.body.name,
        category: req.body.category,
        manufacturer: req.body.manufacturer,
        availableItems: req.body.availableItems,
        price: req.body.price,
        imageURL: req.body.imageURL,
        description: req.body.description,

    }
    const filter = { id:req.params.id };
    Product.findOneAndUpdate(filter,product).then(() => {
        res.status(200).send("Updated Successfully");
       
    })






}
exports.deleteProduct = (req, res) => {

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
        User.findById(userId).then((data) => {
            console.log(data);
            if (data.isAdmin == false) {
                res.status(403).send('You are not authorized to access this endpoint!');
                return;
            }
            else {

        
                Product.findOneAndDelete({id:req.params.id}).then(() => {
                  
                    res.status(200).send(`Product with ID - ${req.params.id} deleted successfully!`)
                }).catch((err) => {
                    res.status(400).send(`No Product found for ID - ${req.params.id}! `);
                })
        
            }
        })

    }
    
}