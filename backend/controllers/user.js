// Imports
const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var asyncLib  = require('async');
require('dotenv').config();

// Constants
const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,12}$/;

// Routes
module.exports = {
  signup: function (req, res) {
   
    // Params
    let email = req.body.email;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let password = req.body.password;

    if (
      email == null ||
      firstname == null ||
      lastname == null ||
      password == null
    ) {
      return res.status(400).json({ error: "missing parameters" });
    }
    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ error: "email is not valid" });
    }

    if (!PASSWORD_REGEX.test(password)) {
      return res.status(400).json({error:"password invalid (must length 4 - 12 and include 1 number at least)"});
    }
    
    asyncLib.waterfall([
      function(done) {
        models.User.findOne({
          attributes: ['email'],
          where: { email: email }
        })
        .then(function(result) {
          done(null, result);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'unable to verify user !' });
        });
      },
      function(result, done) {
        if (!result) {
          bcrypt.hash(password, 15, function( err, bcryptedPassword ) {
            done(null, bcryptedPassword);
          });
        } else {
          return res.status(409).json({ 'error': 'user already exist' });
        }
      },
      function(bcryptedPassword, done) {
        models.User.create({
          
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: bcryptedPassword,
          isAdmin: req.body.isAdmin,
        })
        .then(function(newUser) {
          done(newUser);
        })
        .catch(function(err) {
          console.log(err);
          return res.status(500).json({ 'error': '*** cannot add user ***' });
        });
      }
    ], function(newUser) {
      if (newUser) {
        return res.status(201).json({
          'userId': newUser.id
        });
      } else {
        console.log(err);
        return res.status(500).json({ 'error': 'cannot add user' });
      }
    });
  },
  login: function(req, res) {
    
    // Params
    var email    = req.body.email;
    var password = req.body.password;

    if (email == null ||  password == null) {
      return res.status(400).json({ 'error': 'missing parameters' });
    }

    asyncLib.waterfall([
      function(done) {
        models.User.findOne({
          where: { email: email }
        })
        .then(function(userFound) {
          done(null, userFound);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'unable to verify user' });
        });
      },
      function(userFound, done) {
        if (userFound) {
          bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
            done(null, userFound, resBycrypt);
          });
        } else {
          return res.status(404).json({ 'error': 'user not exist in DB' });
        }
      },
      function(userFound, resBycrypt, done) {
        if(resBycrypt) {
          done(userFound);
        } else {
          return res.status(403).json({ 'error': 'invalid password' });
        }
      }
    ], function(userFound) {
      if (userFound) {
        return res.status(201).json({
          'userId': userFound.id,
          'token': jwt.sign({ id: userFound.id }, process.env.SECRET_TOKEN, {expiresIn: '3600s'})
        })
      } else {
        return res.status(500).json({ 'error': 'cannot log on user' });
      }
    });
  },
  
  getUserProfile: function(req, res) {
    const userId = req.params.id;

    if (userId < 0)
      return res.status(400).json({ 'error': 'wrong token' });

    models.User.findOne({
      attributes: [ 'id', 'email', 'firstname', 'lastname','isAdmin' ],
      where: { id: userId }
    })
    .then((userFound) => {
      if (userFound) {
        res.status(201).json(userFound);
      } else {
        res.status(404).json({ 'error': 'user not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ 'error': 'cannot fetch user' });
    });
  },

  editUserProfile: function(req, res) {
    const token = req.headers.authorization.split(' ')[1]
    const userFound = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = userFound.id

    // Params
   
    asyncLib.waterfall([
      function(done) {
        models.User.findOne({
          attributes: ['id', 'email', 'firstname', 'lastname', 'personFirstname', 'personLastname', 'personAdress', 'personZipcode', 'personCity', 'personProblem', 'personAge', 'address', 'zipcode', 'city', 'phone1', 'phone2', 'isAdmin' ],
          where: { id: userId }
        }).then(function (userFound) {
          done(null, userFound);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'unable to verify user' });
        });
      },
      function(userFound, done) {
        if(userFound) {
          userFound.update({
            firstname: (firstname ? firstname : userFound.firstname),
            lastname: (lastname ? lastname : userFound.lastname),
            personFirstname: (personFirstname ? personFirstname : userFound.personFirstname),
            personLastname: (personLastname ? personLastname : userFound.personLastname),
            personAdress: (personAdress ? personAdress : userFound.personAdress),
            personZipcode: (personZipcode ? personZipcode : userFound.personZipcode),
            personCity: (personCity ? personCity : userFound.personCity),
            personProblem: (personProblem ? personProblem : userFound.personProblem),
            personAge: (personAge ? personAge : userFound.personAge),
            address: (address ? address : userFound.address),
            zipcode: (zipcode ? zipcode : userFound.zipcode),
            city: (city ? city : userFound.city),
            phone1: (phone1 ? phone1 : userFound.phone1),
            phone2: (phone2 ? phone2 : userFound.phone2),
          }).then(function() {
            done(userFound);
          }).catch(function(err) {
            res.status(500).json({ 'error': 'cannot update user' });
          });
        } else {
          res.status(404).json({ 'error': 'user not found' });
        }
      }], function(userFound) {
      if (userFound) {
        return res.status(201).json(userFound);
      } else {
        return res.status(500).json({ 'error': 'cannot update user profile' });
        }
      })
  },



  //=========================== A REVOIR ============================//

  deleteAccount: async function (req, res) {
    try {
      // Read
      const token = req.headers.authorization.split(' ')[1]
      const userFound = jwt.verify(token, process.env.SECRET_TOKEN);
      const userId = userFound.id;
      

      const idToDelete = req.params.id;
      if (!userId || !idToDelete) {
        res.status(401).json({ message: "request invalid" });
        return;
      }

      // Is authorized
      const currentUser = 
        await models.User.findOne({
          attributes:['id','isAdmin'],
          where: { id : userFound.id }
        })
        
      if (currentUser.isAdmin == false) {
        console.log(currentUser);
        res.status(401).json({ message: "not allowed" });
        return;
      }
      
      // Destroy
      let user = await models.User.findOne({ where: { id: idToDelete } });
      user.destroy();
      res.status(200).json({ message: "compte supprimé", hooks: true });
    } catch (error) {
      res.status(400).json({ error });
      console.log("Ca marche pooo !!!", error);
    }
  },
};
