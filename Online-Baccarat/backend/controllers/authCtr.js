
const User = require("../Models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const passport = require("passport");
const _ = require("lodash");

exports.register = async (req, res) => {
  
  await User.findOne({ email: req.body.email, delete: false }).then(
    async (user) => {
      if (user) {
        return await res
          .status(400)
          .json({ message: "You have already registered" });
      }

      const newUser = new User({
        company: req.body.company,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      });
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(req.body.password, salt);
      newUser
        .save()
        .then((user) => res.json({ message: "Success" }))
        .catch((err) => console.log(err));
    }
  );
};

exports.login = async (req, res) => {
  
  await User.findOne({ email: req.body.email, delete: false }).then(
    async (user) => {
      if (!user) {
        return await res.status(400).json({ message: "You arenot registered" });
      }
      bcrypt.compare(req.body.password, user.password).then(async (matched) => {
        if (!matched) {
          return res.json({ message: "Password incorrect" });
        }
        await user.updateOne({
          $set: { status: req.body.status },
        });

        const payload = {
          id: user._id,
          company: user.company,
          username: user.username,
          password: user.password,
          email: user.email,
          role: user.role,
        };
        jwt.sign(
          payload,
          config.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: "true",
              message: "Success",
              token: "Bearer " + token,
              user: user,
            });
          }
        );
      });
    }
  );
};
// logout for chatting online status
exports.logout = async (req, res) => {
  await User.findOne({ email: req.body.email }).then(async (user) => {
    await user?.updateOne({
      $set: { status: false },
    });

    const payload = {
      id: user._id,
      company: user.company,
      username: user.username,
      password: user.password,
      email: user.email,
      status: user.status,
    };
    res.json({
      success: "true",
      message: "Success",
      user: user,
    });
  });
};

exports.tokenlogin = async (req, res) => {
  await User.findById({ _id: req.user.id }).then((user) => {
    if (!user || user.role !== req.user.role) {
      return res.status(400).json({ message: "You arenot registered" });
    }
    const payload = {
      id: user._id,
      company: user.company,
      username: user.username,
      password: user.password,
      email: user.email,
      role: user.role,
    };
    jwt.sign(payload, config.secretOrKey, { expiresIn: 3600 }, (err, token) => {
      return res.json({
        success: "true",
        token: "Bearer " + token,
        user: user,
      });
    });
  });
};

exports.getAll = async (req, res) => {  
  try {
    const total = await User.find({
      delete: false,
    }).count(false);
    const userList = await User.find({ delete: false })
    
    res.status(200).json({ userList, total });
  } catch (error) {
    console.log(error);
  }

  // try {
  //   if (req.user.role == "admin") {
  //     if (req.body.store != "") {
  //       const total = await User.find({
  //         delete: false,
  //         store: req.body.store,
  //       }).count(false);
  //       const userList = await User.find({
  //         delete: false,
  //         store: req.body.store,
  //       })
  //         .populate({ path: "store", select: "name" })
  //         .skip(req.body.page)
  //         .limit(req.body.perpage);
  //       res.status(200).json({ userList, total });
  //     } else {
  //       const total = await User.find({
  //         delete: false,
  //       }).count(false);
  //       const userList = await User.find({
  //         delete: false,
  //       })
  //         .populate({ path: "store", select: "name" })
  //         .skip(req.body.page)
  //         .limit(req.body.perpage);
  //       res.status(200).json({ userList, total });
  //     }
  //   }
  //   if (req.user.role == "storeManager") {
  //     const total = await User.find({
  //       store: req.user.store,
  //       delete: false,
  //     }).count(false);
  //     const userList = await User.find({ store: req.user.store, delete: false })
  //       .populate({ path: "store", select: "name" })
  //       .sort({ createdAt: -1 })
  //       .skip(req.body.page)
  //       .limit(req.body.perpage);

  //     res.status(200).json({ userList, total });
  //   }
  // } catch (error) {
  //   console.log(error);
  // }
};

exports.getUser = async (req, res) => {
  try {
    const { id: id } = req.params;
    const user = await User.findById(id).populate({
      path: "store",
      select: "name",
    });

    if (!user) {
      return res.status(404).josn({
        message: `No User with id: ${id}`,
      });
    } else {
      return res.status(200).json({
        message: "Get User successfully",
        user: user,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.allowUser = async (req, res) => {
  try {
    await User.findById({ _id: req.body.userID }).updateOne({
      permission: req.body.permission,
    });
    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.log(error);
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    await User.findOne({ email: req.body.email }).then(async (user) => {
      if (user && user.email !== req.user.email) {
        return await res
          .status(400)
          .json({ message: "Your email already exist" });
      }
      await User.findOne({ _id: req.user._id }).updateOne({
        company: req.body.company,
        username: req.body.username,
        email: req.body.email,
        birthday: req.body.birthday,
        phone: req.body.phone,
        money: req.body.money,
        bio: req.body.bio,
        avatar: req.body.files,
      });
      res.status(200).json({ message: "Success" });
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteUser = async (req, res) => {
  const deleteUserList = req.body.payload;
  try {
    _.map(deleteUserList, async (id, key) => {
      const user = await User.findById({ _id: id }).updateOne({ delete: true });
      console.log(user);
      if (!user) {
        res.status(404).json({
          message: `No category with id:${id} exist`,
        });
      } else {
        if (key == deleteUserList.length - 1) {
          const users = await User.find({}).sort({ createdAt: -1 });
          res.status(200).json({
            message: "Delete selected users successfully!",
            users: users,
          });
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.changeUserStore = async (req, res) => {
  try {
    await User.findOne({ _id: req.body.id }).then(async (user) => {
      if (user.role == "user") {
        await user.updateOne({
          store: req.body.storeID,
        });
        res.status(200).json({ message: "Success!!!" });
      }
      if (user.role == "storeManager") {
        await User.findOne({
          role: "storeManager",
          store: req.body.storeID,
          _id: { $ne: req.body.id },
        }).then(async (otherUser) => {
          if (otherUser) {
            return await res.status(400).json({
              message: "StoreManager is already exist in this store.",
            });
          }
          await user.updateOne({
            store: req.body.storeID,
          });
          res.status(200).json({ message: "Success" });
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.changeUserRole = async (req, res) => {
  try {
    await User.findOne({ _id: req.body.id }).then(async (user) => {
      if (req.body.userRole == "user") {
        await user.updateOne({
          role: req.body.userRole,
        });
        res.status(200).json({ message: "Success!!!" });
      }
      if (req.body.userRole == "storeManager") {
        await User.findOne({
          role: "storeManager",
          // store: user.store,
          _id: { $ne: req.body.id },
        }).then(async (otherUser) => {
          // if (otherUser) {
          //   return await res.status(400).json({
          //     message: "StoreManager is already exist in this store.",
          //   });
          // }
          await user.updateOne({
            role: req.body.userRole,
          });
          res.status(200).json({ message: "Success" });
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.charge = async (req, res) => {
  const { id: id } = req.params;
  try {
    // const charge = await User.findById(id);

    await User.findOne({ _id: id }).updateOne({
      money: req.body.money,
    });
    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.log(error);
  }
};

exports.favourite = async (req, res) => {
  try {
    const favourite = await User.findOne({
      _id: req.user._id,
      favourite: { $elemMatch: { $eq: req.body.id } },
    });
    if (favourite) {
      await User.update(
        { _id: req.user._id },
        { $pull: { favourite: req.body.id } }
      );
      const favouriteList = await User.findOne({ _id: req.user._id });
      res.status(200).json({
        message: `remove favourite successfully.`,
        favouriteList,
      });
    } else {
      await User.update(
        { _id: req.user._id },
        { $push: { favourite: req.body.id } }
      );
      const favouriteList = await User.findOne({ _id: req.user._id });
      res.status(200).json({
        message: `add favourite product successfully.`,
        favouriteList,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.coin = async (req, res) => {
  const receiver = req.body.receiverId;
  const money = req.body.quantity;
  const mine = req.body.MyId;

  try {
    await User.findOne({ _id: receiver }).then(async (match) => {
      if (!match) {
        return res.json({
          msg: "Wrong receiver ID",
        });
      } else {
        await User.findOne({ _id: mine }).then(async (user) => {
          user.money = user.money / 1 - money / 1;
          await user.save();
        });

        match.money = match.money / 1 + money / 1;
        await match.save();

        const coinData = new Coin();
        coinData.user = mine;
        coinData.coin = money;
        coinData.receiver = receiver;

        await coinData.save();

        const user = await User.findOne({ _id: mine });
        return res.status(200).json({
          msg: "Success!",
          sender: user,
        });
      }
    });
  } catch (e) {
    console.log("coin error");
    return res.json({
      msg: e,
    });
  }
};

exports.bestPosters = async (req, res) => {
  try {
    const bestPosters = await Article.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: {
          path: "$like",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $group: {
          _id: "$user",
          count: { $count: {} },
        },
      },
      {
        $unwind: {
          path: "$_id",
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: 10,
      },
    ]);
    if (!bestPosters) {
      return res.status(404).json({
        msg: "no BestPosters",
      });
    } else {
      return res.status(200).json({
        message: "found bestPosters successfully.",
        bestPosters: bestPosters,
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};
