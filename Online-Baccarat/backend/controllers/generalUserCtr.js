const User = require("../Models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/config")
const passport = require("passport")

// exports.register =  async (req, res) => {
//     const errors = {};
//     console.log(req.body);
//    await User.findOne({email: req.body.email})
//         .then( async (user) => {
//             if(user) {
//                 return await res.status(400).json({message: "You have already registered"});
//             } 

//     const newUser = new User({
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       email: req.body.email,
//       password: req.body.password,
//       role: req.body.role,
//       status: req.body.status
//     });
//     const salt = await bcrypt.genSalt(10);
//     newUser.password = await bcrypt.hash(req.body.password, salt);
//     newUser
//       .save()
//       .then((user) => res.json({ message: "Success" }))
//       .catch((err) => console.log(err));
//   });
// };

// exports.login = async (req, res) => {
//   await User.findOne({ email: req.body.email }).then(async (user) => {
//     if (!user) {
//       return await res.status(400).json({ message: "You arenot registered" });
//     }
//     bcrypt.compare(req.body.password, user.password).then( async (matched) => {
//       if (!matched) {
//         return res.json({ message: "Password incorrect" });
//       }
//      await user.updateOne({
//         $set: {status: req.body.status}
//       })

//       const payload = {
//         id: user._id,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         password: user.password,
//         email: user.email,
//       };
//       jwt.sign(
//         payload,
//         config.secretOrKey,
//         { expiresIn: 3600 },
//         (err, token) => {
//           res.json({
//             success: "true",
//             message: "Success",
//             token: "Bearer " + token,
//             user: user,
//           });
//         }
//       );
//     });
//   });
// };


// // logout for chatting online status
// exports.logout = async (req, res) => {
//   await User.findOne({ email: req.body.email}).then(async(user) => {
//     await user?.updateOne({
//       $set: {status: false}
//     })

//     const payload = {
//       id: user._id,
//       firstName:  user.firstName,
//       lastName: user.lastName,
//       password: user.password,
//       email: user.email,
//       status: user.status,
//     }
//     res.json({
//       success: "true",
//       message: "Success",
//       user: user,
//     })
//   })
// };

// exports.tokenlogin = async (req, res) => {
//   await User.findById({ _id: req.user.id }).then((user) => {
//     const payload = {
//       id: user._id,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       password: user.password,
//       email: user.email,
//     };
//     jwt.sign(payload, config.secretOrKey, { expiresIn: 3600 }, (err, token) => {
//       return res.json({
//         success: "true",
//         token: "Bearer " + token,
//         user: user,
//       });
//     });
//   });
// };

// exports.getAll = async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.status(200).json({ users });
//   } catch (error) {
//     console.log(error)
//   }
// }
