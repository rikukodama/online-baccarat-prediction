const Product = require("../Models/ProductModel");
const User = require("../Models/UserModel");
const Cart = require("../Models/CartModel");
const _ = require("lodash");
const mongoose = require("mongoose");
// const { default: message } = require("../../Admin/src/pages/messgae");

exports.createProduct = async (req, res) => {
  await Product.findOne({ name: req.body.name }).then(async (matched) => {
    if (matched) {
      return res.json({
        message: "Same product already exist!",
        error: true,
      });
    }

    const newProduct = new Product(req.body);
    await newProduct.save((err) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      } else {
        return res.status(200).json({
          message: "Create product successfully!",
        });
      }
    });
  });
};
exports.getAllProducts = async (req, res) => {
  const newGood = req.body.newGood;
  const category = req.body.category;
  const favourite = req.body.favourite;
  const sort = req.body.sort;
  var { moreThan, lessThan } = req.body;
  if (moreThan === 0) moreThan = 0;
  if (lessThan === 0) lessThan = 10000000;
  try {
    const favouriteProductId = await User.findOne({
      _id: req.body.favourite.userId,
    });
    const total = await Product.aggregate([
      {
        $addFields: {
          rate: {
            $avg: "$review.rate",
          },
        },
      },
      {
        $addFields: {
          rate: {
            $ifNull: ["$rate", 0],
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
          $and: [
            {
              name: {
                $regex: req.body.searchWord,
                $options: "i",
              },
            },
            { deleted: false },

            category !== ""
              ? { category: mongoose.Types.ObjectId(req.body.category) }
              : {},
            newGood !== undefined
              ? {
                  createdAt: {
                    $gte: new Date(req?.body?.newGood?.sDate),
                    $lte: new Date(req?.body?.newGood?.today),
                  },
                }
              : {},
            {
              price: {
                $gte: moreThan,
                $lte: lessThan,
              },
            },
            {
              rate: {
                $gte: req.body.rate.rate[0],
                $lte: req.body.rate.rate[1],
              },
            },
            favourite
              ? {
                  _id: {
                    $in: favouriteProductId?.favourite.map((item) =>
                      mongoose.Types.ObjectId(item)
                    ),
                  },
                }
              : {},
          ],
        },
      },
      {
        $count: "total",
      },
    ]);
    const products = await Product.aggregate([
      {
        $addFields: {
          rate: {
            $avg: "$review.rate",
          },
        },
      },
      {
        $addFields: {
          rate: {
            $ifNull: ["$rate", 0],
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
          $and: [
            {
              name: {
                $regex: req.body.searchWord,
                $options: "i",
              },
            },
            { deleted: false },

            category !== ""
              ? { category: mongoose.Types.ObjectId(req.body.category) }
              : {},
            newGood !== undefined
              ? {
                  createdAt: {
                    $gte: new Date(req?.body?.newGood?.sDate),
                    $lte: new Date(req?.body?.newGood?.today),
                  },
                }
              : {},
            {
              price: {
                $gte: moreThan,
                $lte: lessThan,
              },
            },
            {
              rate: {
                $gte: req.body.rate.rate[0],
                $lte: req.body.rate.rate[1],
              },
            },
            favourite
              ? {
                  _id: {
                    $in: favouriteProductId?.favourite.map((item) =>
                      mongoose.Types.ObjectId(item)
                    ),
                  },
                }
              : {},
          ],
        },
      },
      sort === "name"
        ? {
            $sort: { name: 1 },
          }
        : sort === "quantity"
        ? {
            $sort: { quantity: -1 },
          }
        : sort === "remain"
        ? {
            $sort: { remain: -1 },
          }
        : sort === "discount"
        ? {
            $sort: { discount: -1 },
          }
        : sort === "price"
        ? {
            $sort: { price: -1 },
          }
        : { $sort: { createdAt: -1 } },
      {
        $skip: req.body.page,
      },
      {
        $limit: req.body.perpage,
      },
      {
        $unwind: {
          path: "$category_product",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);
    res.status(200).json({ products: products, total: total });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getAllInventories = async (req, res) => {
  try {
    const products = await Product.find({ deleted: false })
      .populate({
        path: "category",
        select: "title",
      })
      .sort({ updatedAt: -1 });
    res.status(200).json({ products: products });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.getCart = async (req, res) => {
  try {
    const products = await Cart.aggregate([
      {
        $match: {
          user: mongoose.Types.ObjectId(req.user._id),
        },
      },
      {
        $project: {
          "products.product": 1,
        },
      },
    ]);
    res.status(200).json({ products: products });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getAllCart = async (req, res) => {
  try {
    const products = await Cart.aggregate([
      {
        $match: {
          user: mongoose.Types.ObjectId(req.user._id),
        },
      },
      {
        $project: {
          products: 1,
        },
      },
      {
        $unwind: {
          path: "$products",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          "products.delete": false,
        },
      },
      {
        $project: {
          products: 1,
        },
      },
      {
        $unwind: {
          path: "$products",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          "products.delete": false,
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "products.product",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $project: {
          real_product: "$product",
          quantity: "$products.quantity",
        },
      },
      {
        $unwind: {
          path: "$real_product",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "real_product.category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $project: {
          title: "$real_product.name",
          files: "$real_product.thumbnail",
          price: "$real_product.price",
          discount: "$real_product.discount",
          quantity: "$quantity",
          category: "$category.title",
          categoryId: "$category._id",
          id: "$real_product._id",
        },
      },
    ]);
    res.status(200).json({ products: products });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getACart = async (req, res) => {
  const userId = req.user._id;
  try {
    const count = await Cart.findOne({user: userId});
    res.status(200).json({ count:count?.products?.length });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const prd = await Product.findOne({
      _id: req.params.id,
      deleted: false,
    }).populate({
      path: "review.user",
    });

    return res
      .status(200)
      .json({ product: prd, message: "get product successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.addReview = async (req, res) => {
  try {
    const prd = await Product.findById(req.params.id).then(async (item) => {
      const userId = await item.review.filter((value) => {
        return toString(value.user) == toString(req.user._id);
      });
      if (userId.length)
        await item.update({
          $pull: {
            review: {
              user: req.user._id,
            },
          },
        });
      await item.update({
        $push: {
          review: {
            user: req.user._id,
            rate: req.body.rate,
            comment: req.body.comment,
          },
        },
      });
      res.status(200).json({
        type: "success",
        message: userId.length
          ? "Update review successfully!"
          : "Create review successfully!",
        product: await Product.findById(req.params.id),
      });
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findById(productId);
  try {
    if (!product) {
      return res.status(404).json({
        message: `No product with id: ${productId} exist!`,
      });
    } else {
      await Product.findOne({ name: req.body.name }).then(async (matched) => {
        if (matched) {
          if (matched._id == productId) {
            await Product.findByIdAndUpdate(
              productId,
              {
                name: req.body.name,
                category: req.body.category,
                description: req.body.description,
                price: req.body.price,
                quantity: req.body.quantity,
                discount: req.body.discount,
                remain: req.body.remain,
                thumbnail: req.body.thumbnail,
              },
              {
                new: true,
                runValidators: true,
              }
            );
            return res.status(200).json({
              message: "Product updated successfully!",
            });
          } else {
            return res.json({
              message: "Same Product already exist!",
              error: true,
            });
          }
        } else {
          await Product.findByIdAndUpdate(
            productId,
            {
              name: req.body.name,
              category: req.body.category,
              description: req.body.description,
              price: req.body.price,
              quantity: req.body.quantity,
              discount: req.body.discount,
              thumbnail: req.body.thumbnail,
            },
            {
              new: true,
              runValidators: true,
            }
          );
          return res.status(200).json({
            message: "Product updated successfully!",
          });
        }
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.getNewProducts = async (req, res) => {
  const { id: productId } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(
      productId,
      { deleted: true },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!product) {
      return res.status(404).json({
        message: `No category with id: ${productId} exist!`,
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

exports.deleteProduct = async (req, res) => {
  const { id: productId } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(
      productId,
      { deleted: true },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!product) {
      return res.status(404).json({
        message: `No category with id: ${productId} exist!`,
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

exports.deleteACart = async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;
  try {
    const product = await Cart.updateOne(
      {
        user: userId,
      },
      {
        $pull: {
          products: {
            product: id,
          },
        },
      }
    );
    if (!product) {
      return res.status(404).json({
        message: `No category with id: ${productId} exist!`,
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

exports.addAProduct = async (req, res) => {
  try {
    const user = await Cart.findOne({ user: req.user._id });
    if (!user) {
      const newCart = new Cart({
        user: req.user._id,
        products: [
          {
            product: req.body._id,
            quantity: req.body.quantity,
          },
        ],
      });
      newCart
        .save()
        .then(
          res.status(200).json({
            type: "success",
            message: "Success",
            updatedProduct: await Cart.aggregate([
              {
                $match: {
                  user: mongoose.Types.ObjectId(req.user._id),
                },
              },
              {
                $project: {
                  "products.product": 1,
                },
              },
            ]),
          })
        )
        .catch((err) => {
          res.status(500).json({ type: "error", message: err.message });
        });
    } else {
      const product = await Cart.aggregate([
        {
          $match: {
            user: mongoose.Types.ObjectId(req.user._id),
          },
        },
        {
          $project: {
            products: 1,
          },
        },
        {
          $unwind: {
            path: "$products",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $match: {
            "products._id": mongoose.Types.ObjectId(req.body._id),
          },
        },
      ]);
      if (product.length > 0) {
        await Cart.updateOne({
          user: req.user._id,
          "products.product": req.body._id,
        });
        const updatedProduct = await Cart.aggregate([
          {
            $match: {
              user: mongoose.Types.ObjectId(req.user._id),
            },
          },
          {
            $project: {
              "products.product": 1,
            },
          },
        ]);
        res.status(200).json({
          type: "success",
          message: "Added successfully!",
          updatedProduct: updatedProduct,
        });
      } else {
        const product = await Cart.findOne({
          user: mongoose.Types.ObjectId(req.user._id),
          "products.product": mongoose.Types.ObjectId(req.body._id),
        });
        if (product) {
          if (req.body.quantity > 1) {
            const cartProduct = await Cart.updateOne(
              { user: req.user._id, "products.product": req.body._id },
              {
                $set: {
                  "products.$.quantity": req.body.quantity,
                },
              }
            );
            const updatedProduct = await Cart.aggregate([
              {
                $match: {
                  user: mongoose.Types.ObjectId(req.user._id),
                },
              },
              {
                $project: {
                  "products.product": 1,
                },
              },
            ]);
            res.status(200).json({
              type: "success",
              message: "Amount changed successfully!",
              updatedProduct: updatedProduct,
            });
          } else {
            res
              .status(200)
              .json({ type: "error", message: "Already exists in your Cart!" });
          }
        } else {
          const addedProduct = await Cart.updateOne(
            { user: req.user._id },
            {
              $push: {
                products: {
                  product: req.body._id,
                  quantity: req.body.quantity,
                },
              },
            }
          );
          const updatedProduct = await Cart.aggregate([
            {
              $match: {
                user: mongoose.Types.ObjectId(req.user._id),
              },
            },
            {
              $project: {
                "products.product": 1,
              },
            },
          ]);
          res.status(200).json({
            type: "success",
            message: "Added successfully",
            updatedProduct: updatedProduct,
          });
        }
      }
    }
  } catch (error) {
    res.json({ type: "error", message: error.message });
  }
};


