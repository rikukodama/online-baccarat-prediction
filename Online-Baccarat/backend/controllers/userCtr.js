const Category = require("../Models/CategoryModel");
const _ = require("lodash");
const mongoose = require("mongoose");
const User = require("../Models/UserModel");
const Transaction = require("../Models/TransactionModel");
const Product = require("../Models/ProductModel");
const Article = require("../Models/ArticleModel");
// const { default: message } = require("../../Admin/src/pages/messgae");

exports.createCategory = async (req, res) => {
  await Category.findOne({ title: req.body.title, deleted: false }).then(
    async (matched) => {
      if (matched) {
        return res.json({
          message: "Same category already exist!",
          error: true,
        });
      }
      const newCategory = new Category(req.body);
      await newCategory.save((err) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        } else {
          return res.status(200).json({
            message: "Create category successfully!",
          });
        }
      });
    }
  );
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({ deleted: false }).sort({
      updatedAt: -1,
    });
    return res.status(200).json({
      message: "Get all categories successfully!",
      categories: categories,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getACategory = async (req, res) => {
  try {
    const { id: categoryId } = req.params;
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).josn({
        message: `No category with id: ${categoryId}`,
      });
    } else {
      return res.status(200).json({
        message: "Get category successfully",
        category: category,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.editCategory = async (req, res) => {
  const { id: categoryId } = req.params;
  const category = await Category.findById(categoryId);

  try {
    if (!category) {
      return res.status(404).json({
        message: `No category with id: ${categoryId} exist!`,
      });
    } else {
      await Category.findOne({ title: req.body.title }).then(
        async (matched) => {
          if (matched) {
            if (matched._id == categoryId) {
              await Category.findByIdAndUpdate(
                categoryId,
                {
                  description: req.body.description,
                },
                {
                  new: true,
                  runValidators: true,
                }
              );
              return res.status(200).json({
                message: "Category updated successfully!",
              });
            } else {
              return res.json({
                message: "Same category already exist!",
                error: true,
              });
            }
          } else {
            await Category.findByIdAndUpdate(
              categoryId,
              {
                title: req.body.title,
                description: req.body.description,
              },
              {
                new: true,
                runValidators: true,
              }
            );
            return res.status(200).json({
              message: "Category updated successfully!",
            });
          }
        }
      );
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  const { id: categoryId } = req.params;
  try {
    const category = await Category.findByIdAndUpdate(
      categoryId,
      { deleted: true },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!category) {
      return res.status(404).json({
        message: `No category with id: ${categoryId} exist!`,
      });
    } else {
      return res.status(200).json({
        message: "Delete category successfully!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.multiDeleteCategory = async (req, res) => {
  const delCategoryList = req.body.data;

  try {
    _.map(delCategoryList, async (id, key) => {
      const category = await Category.findByIdAndUpdate(
        id,
        { deleted: true },
        {
          new: true,
          runValidators: true,
        }
      );
      if (!category) {
        res.status(404).json({
          message: `No category with id:${id} exist`,
        });
      } else {
        if (key == delCategoryList.length - 1) {
          const categories = await Category.find({ deleted: false }).sort({
            updatedAt: -1,
          });
          res.status(200).json({
            message: "Delete selected categories successfully!",
            categories: categories,
          });
        }
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getUserAccountInfo = async (req, res) => {
  try {
    const user = req?.user._id;
    const sDate = req?.body?.sDate;
    const eDate = req?.body?.eDate;
    const productHistory = await Transaction.aggregate([
      {
        $match: {
          deleted: false,
          userId: { $eq: mongoose.Types.ObjectId(String(user)) },
          date: { $gte: new Date(sDate), $lte: new Date(eDate) },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          pipeline: [
            {
              $project: {
                name: 1,
                description: 1,
              },
            },
          ],
          as: "productDetail",
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          pipeline: [
            {
              $project: {
                title: 1,
              },
            },
          ],
          as: "categoryDetail",
        },
      },
      { $unwind: { path: "$productDetail", preserveNullAndEmptyArrays: true } },
      {
        $unwind: { path: "$categoryDetail", preserveNullAndEmptyArrays: true },
      },
    ]);
    const productTotal = await Transaction.aggregate([
      {
        $match: {
          deleted: false,
          userId: { $eq: mongoose.Types.ObjectId(String(user)) },
          date: { $gte: new Date(sDate), $lte: new Date(eDate) },
        },
      },
      {
        $group: {
          _id: {},
          total: { $sum: "$price" },
        },
      },
    ]);
    const articleHistory = await Article.aggregate([
      {
        $match: {
          del: false,
          user: { $eq: mongoose.Types.ObjectId(String(user)) },
          createdAt: { $gte: new Date(sDate), $lte: new Date(eDate) },
          title: { $exists: true },
        },
      },
      {
        $lookup: {
          from: "articlecategories",
          localField: "categoryId",
          foreignField: "_id",
          pipeline: [
            {
              $project: {
                title: 1,
              },
            },
          ],
          as: "articleCategoryDetail",
        },
      },
      {
        $unwind: {
          path: "$articleCategoryDetail",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          view: "$view",
          like: "$like",
          title: "$title",
          description: "$description",
          createdAt: "$createdAt",
          categoryTitle: "$articleCategoryDetail.title",
        },
      },
    ]);
    const allFavourite = await User.find(
      {
        _id: { $eq: mongoose.Types.ObjectId(String(user)) },
      },
      "favourite"
    );
    const favoriteInfo = await Product.aggregate([
      {
        $match: {
          _id: { $in: allFavourite[0].favourite },
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          pipeline: [
            {
              $project: {
                title: 1,
              },
            },
          ],
          as: "categoryDetail",
        },
      },
      {
        $unwind: { path: "$categoryDetail", preserveNullAndEmptyArrays: true },
      },
      {
        $project: {
          name: 1,
          category: "$categoryDetail.title",
          price: 1,
        },
      },
      { $sort: { createdAt: 1 } },
    ]);
    const reviewAncestor = await Article.aggregate([
      {
        $match: {
          user: { $eq: mongoose.Types.ObjectId(String(user)) },
          title: { $exists: false },
          createdAt: { $gte: new Date(sDate), $lte: new Date(eDate) },
          del: false,
        },
      },
      {
        $group: {
          _id: "$ancestorId",
        },
      },
    ]);
    let review = [];
    reviewAncestor.map((item) => {
      review.push(item._id);
    });
    const reviewArticle = await Article.aggregate([
      {
        $match: {
          _id: { $in: review },
        },
      },
      {
        $project: {
          title: 1,
          description: 1,
          createdAt: 1,
          like: 1,
          view: 1,
        },
      },
    ]);

    res.status(200).json({
      productHistory: productHistory,
      favoriteProduct: favoriteInfo,
      articleHistory: articleHistory,
      reviewArticle: reviewArticle,
      productTotal: productTotal,
    });
  } catch (err) {
    console.log(err);
  }
};
