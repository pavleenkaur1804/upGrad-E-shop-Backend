const db = require("../models");
const User = db.user;
const Address = db.address;

// This function is used to validate the zipcode using regex and simple conditions
function validateZip(userZipcode) {
    let regex1 = new RegExp('^[0-9]+');
    if (regex1.test(userZipcode) == true && userZipcode.length == 6) {
        return true;
    }
    else { return false; }

}
// This function is used to validate the user contact number by checking the length
function validatePhone(userPhone) {
    let regex1 = new RegExp('^[0-9]+');
    if (regex1.test(userPhone) == true && userPhone.length == 10) {
        return true;
    }
    else { return false; }

}





exports.shippingAddress = (req, res) => {
    //Validate Request
 
    const validZip = validateZip(req.body.zipCode);
    const validPhone = validatePhone(req.body.PhoneNumber);
    
       
   
    if (validZip == false) {
        res.status(400).send({
            message: "Invalid zip code!",
        });
        return;
    }
    if (validPhone == false) {
        res.status(400).send({
            message: "Invalid contact number!",
        })
        return;
    }

const firstName=req.body.name.split(" ");
const newName =firstName[0];

    const filter = { firstName: newName };
    
    User.findOne(filter).then(
        (data) => {
            console.log(data);
            if (data.isLoggedIn == false) {
                res.json("Please Login first to access this endpoint!");
            }
            else {
                const address = new Address({
                    name: req.body.name,
                    city: req.body.city,
                    state: req.body.state,
                    street: req.body.street,
                    contactNumber: req.body.PhoneNumber,
                    landmark: req.body.landmark,
                    zipCode: req.body.zipCode,
                    user:data
                });


                address
                    .save(address)
                    .then((data) => {
                        res.status(200).send(data);
                    })
                    .catch((err) => {
                        res.status(500).send({
                            message: "Some error occurred, please try again later.",
                        });
                    });
            }
        });


    
    
};



