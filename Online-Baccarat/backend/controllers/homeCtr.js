const Product = require("../Models/ProductModel");
const Article = require("../Models/ArticleModel");
const User = require("../Models/UserModel");
const _ = require("lodash");
const mongoose = require("mongoose");

exports.getNewHomeProducts = async (req, res) => {
  const eDate = new Date();
  const sDate = new Date();
  sDate.setDate(sDate.getDate() - 3);
  try {
    const newProducts = await Product.aggregate([
      {
        $addFields: {
          rate: {
            $avg: "$review.rate",
          },
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category_product",
        },
      },
      {
        $match: {
          deleted: false,
          createdAt: {
            $gte: new Date(sDate),
            $lte: new Date(eDate),
          },
        },
      },
      {
        $unwind: {
          path: "$category_product",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $limit: 3,
      },
    ]);
    if (!newProducts) {
      return res.status(404).json({
        msg: "no new products",
      });
    } else {
      return res.status(200).json({
        message: "Get newproducts successfully!",
        newproduct: newProducts,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.popularHomeProducts = async (req, res) => {
  try {
    const popularProducts = await Product.aggregate([
      {
        $addFields: {
          rate: {
            $avg: "$review.rate",
          },
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category_product",
        },
      },
      {
        $unwind: {
          path: "$category_product",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          rate: {
            $gte: 4,
          },
        },
      },
      {
        $sort: {
          sold: 1,
        },
      },
      {
        $limit: 6,
      },
    ]);

    if (!popularProducts) {
      return res.status(404).json({
        msg: "no popular products",
      });
    } else {
      return res.status(200).json({
        popularProducts: popularProducts,
        message: "get popularProducts successfully.",
      });
    }
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

exports.bestUsers = async (req, res) => {
  const eDate = new Date();
  const sDate = new Date();
  sDate.setDate(sDate.getDate() - 7);
  try {
    const bestUsers = await Article.aggregate([
      {
        $match: {
          del: false,
          createdAt: { $gte: new Date(sDate), $lte: new Date(eDate) },
          title: { $exists: true },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          pipeline: [
            {
              $project: {
                _id: 1,
                firstName: 1,
                lastName: 1,
                avatar: 1,
                email: 1,
              },
            },
          ],
          as: "userInfo",
        },
      },
      { $unwind: { path: "$userInfo", preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: {
            userId: "$userInfo._id",
            firstName: "$userInfo.firstName",
            lastName: "$userInfo.lastName",
            avatar: "$userInfo.avatar",
            email: "$userInfo.email",
            like: "$like",
            view: "$view",
          },
          articleNum: { $count: {} },
        },
      },
      {
        $group: {
          _id: {
            _id: "$_id.userId",
            firstName: "$_id.firstName",
            lastName: "$_id.lastName",
            avatar: "$_id.avatar",
            email: "$_id.email",
          },
          like: { $count: {} },
          view: { $count: {} },
          articleNum: { $sum: "$articleNum" },
        },
      },
      {
        $sort: { articleNum: -1 },
      },
      { $limit: 8 },
    ]);
    if (!bestUsers) {
      return res.status(404).json({
        msg: "no best users",
      });
    } else {
      return res.status(200).json({
        bestUsers: bestUsers,
        message: "get bestUsers successfully.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.popularArticles = async (req, res) => {
  const eDate = new Date();
  const sDate = new Date();
  sDate.setDate(sDate.getDate() - 7);
  try {
    const popularArticles = await Article.aggregate([
      {
        $match: {
          del: false,
          createdAt: { $gte: new Date(sDate), $lte: new Date(eDate) },
          title: { $exists: true },
        },
      },
      {
        $project: {
          title: 1,
          categoryId: 1,
          categorytitle: 1,
          user: 1,
          view: {
            $size: "$view",
          },
          likes: {
            $size: "$like",
          },
          popularity: {
            $subtract: [
              {
                $size: "$like",
              },
              {
                $size: "$unlike",
              },
            ],
          },
        },
      },
      {
        $lookup: {
          from: "articlecategories",
          localField: "categoryId",
          foreignField: "_id",
          as: "categorytitle",
        },
      },
      {
        $unwind: {
          path: "$categorytitle",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userEmail",
        },
      },
      {
        $sort: {
          popularity: -1,
        },
      },
      {
        $limit: 8,
      },
    ]);

    if (!popularArticles) {
      return res.status(404).json({
        msg: "no popular articles",
      });
    } else {
      return res.status(200).json({
        popularArticles: popularArticles,
        message: "get successfully popularArticles.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.discountProducts = async (req, res) => {
  try {
    const discountProducts = await Product.aggregate([
      {
        $match: {
          deleted: false,
          discount: {
            $gt: 0,
          },
        },
      },
      {
        $project: {
          name: 1,
        },
      },
      {
        $limit: 5,
      },
    ]);
    if (!discountProducts) {
      return res.status(400).json({
        message: "no products discounted!",
      });
    } else {
      return res.status(200).json({
        discountProducts: discountProducts,
        message: "get successfully discountproducts",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// exports.setHomeNotification = async (req, res) => {
//   try {
//     const del = await HomeNotification.updateOne({ deleted: req.body.del });
//     if (del) {
//       return res.status(200).json({
//         msg: "will not display notification again this day!",
//       });
//     }
//   } catch (error) {}
// };
exports.getHomeNotification = async (req, res) => {
  try {
    const notification = await User.findOne(
      { _id: req.params.id },
      { homenotification: 1 }
    );
    if (!notification) {
      return res.status(404).json({
        msg: `cannot find homenotification of ${req.params.id}`,
      });
    } else {
      return res.status(200).json({
        notification: notification,
        msg: `get successfully homenotification of ${req.params.id}`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

// setInterval(myTimer, 1000);

// function myTimer() {
//   console.log((Date.now() / 1000 - 54000).toFixed(0) % (24 * 3600));

//   if ((Date.now() / 1000 - 54000).toFixed(0) % (24 * 3600) === 0) {

//     console.log(Date(Date.now()));
//     console.log(Date.now());
//   }
// }

exports.setHomeNotification = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const notification = await User.findByIdAndUpdate(userId);
    notification.homenotification = new Date();
    notification.save();
    res.status(200).json({ message: "updated successfully!" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
