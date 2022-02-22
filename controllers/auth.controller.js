const db = require("../models");
const User = db.user;
const bcrypt=require('bcrypt');
const jwt =require('jsonwebtoken');


// validate function helps in checking the email address with a combination regex and
// simple conditions
function validate(userEmail){
  let text = userEmail;
  const split1 = text.split("@");
  let part1 = split1[0];
  // split 2 containes the letters after @
  let split2 = split1[1];
  
  let split3 = split2.split(".");
  // part2 containes letters before . and after @
  let part2 =  split3[0];
  //  part3 containes letter after .
  let part3 = split3[1];
  console.log("part1",part1);
  console.log("part2",part2);
  console.log("part3",part3);
  let regex3 = new RegExp(/^[a-z]+$/);
  let regex1 =new RegExp('^[A-Za-z._-]+');
  if((part1.length>=1  && part2.length>=1) && (part3.length>=2 && part3.length<=6 && (regex1.test(part1) === true)  && (regex1.test(part2)==true) && (regex3.test(part3)==true))){
    return true;
  }
  else{
    return false;
  }
}

//This is for user signup functionality
exports.signup = (req, res) => {
  //Validate Request
  if (!req.body.email || !req.body.password || !req.body.firstName) {
    res.status(400).send({
      message: "Please provide email, password and first name to continue.",
    });
    return;
  }
  if (req.body.contactNumber.length < 10) {
    res.status(400).send({
      message: "Invalid contact number!",
    })
  }
  const salt = bcrypt.genSaltSync(10);
  const encryptedPassword = bcrypt.hashSync(req.body.password, salt);

 
  const valid = validate(req.body.email);
  if (valid===false) {
    res.status(400).send({
      message: "Invalid email-id format!"
    })
    return;
  }
  const filter = { email: req.body.email };

  User.findOne(filter, (err, user) => {
    if (err || user !== null) {
      res.status(400).send({
        message: "Try any other email, this email is already registered!",
      });
    } else {
      const user = new User({
      
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email: req.body.email,
        password: encryptedPassword,
        contactNumber: req.body.contactNumber,
        role: req.body.role ? req.body.role : "user",

      });

      user
        .save(user)
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
//This is for user login functionality and user token generation using jwt
exports.login = (req, res) => {
  //Validate Request
  if (!req.body.email || !req.body.password) {
    res.status(400).send({
      message: "Please provide email and password to continue.",
    });
    return;
  }

  const filter = { email: req.body.email };

  User.findOne(filter, (err, user) => {
    if (err || user === null) {
      res.status(404).send({
        message: "This email has not been registered!",
      });
    } else {
      const value = bcrypt.compareSync(req.body.password,user.password);
      
      if (value==true) {
        const user=new User({
          isLoggedIn:true,
          isAuthenticated:true,
          
        });
        User.findOneAndUpdate(filter,{$set:{user}})
          .then((user) => {
            const token=jwt.sign({_id:user._id},"newkey");
            user.accessToken=token;
            // console.log("Token is ->",token)
          
            user.isAuthenticated=true;
            user.isLoggedIn=true;
            console.log(user.isAuthenticated);
            res.json({
              userData: user,
              message: "Logged In Successfully.",
            });
          })
          .catch((err) => {
            console.log(err)
            res.status(500).send({
              message: "Error Updating.",
            });
          });
      } else {
        res.status(401).send({
          message: "Invalid Credentials!",
        });
      }
    }
  });
};

