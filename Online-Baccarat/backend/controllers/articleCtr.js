

exports.create = (req, res) => {
  const newArticle = new ArticleModel({
    files: req.body.files,
    user: req.user._id,
    title: req.body.title,
    description: req.body.description,
    categoryId: req.body.category,
  });

  newArticle.ancestorId = newArticle._id;

  newArticle
    .save()
    .then(() => {
      res.status(200).json({ message: "Success" });
    })
    .catch((e) => {
      res.status(500).json({ message: e.message });
    });
};

exports.getAll = (req, res) => {
  ArticleModel.find({})
    .populate({ path: "user", select: "firstName lastName avatar email" })
    .sort({createdAt: -1})
    .then((articles) => {
      return res.status(201).json({ message: "Success", articles: articles });
    })
    .catch((e) => {
      return res.status(500).json({ message: e.message });
    });
};

exports.getSelectedArticles = async (req, res) => {
  try {
    const article = await ArticleModel.findById(req.params.id).populate({
      path: "user",
    });
    if (String(article?.user?._id) !== String(req.user._id)) {
      await ArticleModel.findByIdAndUpdate(req.params.id, {
        $addToSet: { view: req.user._id },
      });
    }
    await ArticleModel.find({
      ancestorId: article.ancestorId || article._id,
    })
      .populate({ path: "user", select: "firstName lastName email avatar" })
      .then((articles) => {
        return res.status(200).json({ message: "Success", articles: articles });
      });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

exports.getSelectedArticle = async (req, res) => {
  try {
    const article = await ArticleModel.findById(req.params.id).populate({
      path: "user",
    });
    return res.status(200).json({ message: "Success", article: article });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

exports.addlike = async (req, res) => {
  try {
    const article = await ArticleModel.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Not Article Found" });
    }
    const articles = await ArticleModel.find({
      ancestorId: article.ancestorId,
    }).populate({ path: "user" });
    if (String(article.user) !== String(req.user._id)) {
      if (
        !article.like.includes(req.user._id) &&
        !article.unlike.includes(req.user._id)
      ) {
        await ArticleModel.findByIdAndUpdate(req.params.id, {
          $addToSet: { like: req.user._id },
        });
        const articles = await ArticleModel.find({
          ancestorId: article.ancestorId,
        }).populate({ path: "user" });
        return res.status(200).json({
          message: "Success",
          articles: articles,
        });
      }
      if (
        !article.like.includes(req.user._id) &&
        article.unlike.includes(req.user._id)
      ) {
        await ArticleModel.findByIdAndUpdate(req.params.id, {
          $addToSet: { like: req.user._id }, $pull: { unlike: req.user._id } 
        })
        const articles = await ArticleModel.find({
          ancestorId: article.ancestorId,
        }).populate({ path: "user" });
        return res.status(200).json({
          message: "Success",
          articles: articles,
        });
      }
      if (
        article.like.includes(req.user._id) &&
        !article.unlike.includes(req.user._id)
      ) {
        await ArticleModel.findByIdAndUpdate(req.params.id, {
          $pull: { like: req.user._id },
        });
        const articles = await ArticleModel.find({
          ancestorId: article.ancestorId,
        }).populate({ path: "user" });
        return res.status(200).json({
          message: "Success",
          articles: articles,
        });
      }
    } else {
      return res.status(200).json({
        message: "Success",
        articles: articles,
      });
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

exports.addUnlike = async (req, res) => {
  try {
    const article = await ArticleModel.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Not Article Found" });
    }
    const articles = await ArticleModel.find({
      ancestor: article.ancestor,
    }).populate({ path: "user" });
    if (String(article.user) !== String(req.user._id)) {
      if (
        !article.unlike.includes(req.user._id) &&
        !article.like.includes(req.user._id)
      ) {
        await ArticleModel.findByIdAndUpdate(req.params.id, {
          $addToSet: { unlike: req.user._id },
        });
        const articles = await ArticleModel.find({
          ancestorId: article.ancestorId,
        }).populate({ path: "user" });
        return res.status(200).json({
          message: "Success",
          articles: articles,
        });
      }
      if (
        !article.unlike.includes(req.user._id) &&
        article.like.includes(req.user._id)
      ) {
        await ArticleModel.findByIdAndUpdate(req.params.id, {
          $addToSet: { unlike: req.user._id },
        }).update({ $pull: { like: req.user._id } });
        const articles = await ArticleModel.find({
          ancestorId: article.ancestorId,
        }).populate({ path: "user" });
        return res.status(200).json({
          message: "Success",
          articles: articles,
        });
      }
      if (
        article.unlike.includes(req.user._id) &&
        !article.like.includes(req.user._id)
      ) {
        await ArticleModel.findByIdAndUpdate(req.params.id, {
          $pull: { unlike: req.user._id },
        });
        const articles = await ArticleModel.find({
          ancestorId: article.ancestorId,
        }).populate({ path: "user" });
        return res.status(200).json({
          message: "Success",
          articles: articles,
        });
      }
    } else {
      return res.status(200).json({
        message: "Success",
        articles: articles,
      });
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

exports.createReview = async (req, res) => {
  const selectedArticle = await ArticleModel.findById(req.params.id);
  const newArticle = await new ArticleModel({
    files: req.body.files,
    user: req.user._id,
    description: req.body.description,
  });
  newArticle.ancestorId = selectedArticle.ancestorId;
  newArticle.parentId = req.params.id;
  const selectedArticles = await ArticleModel.find({
    ancestorId: req.params.id,
  });
  newArticle
    .save()
    .then(() =>
      res.status(200).json({ message: "Success", articles: selectedArticles })
    )
    .catch((e) => res.status(500).json({ message: e.message }));
};

exports.update = async (req, res) => {
  ArticleModel.findById(req.params.id)
    .then(async (article) => {
      if (!article) {
        return res.status(404).json({ message: "Not Artilce Found" });
      }
      const updatedArticle = await ArticleModel.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      return res
        .status(200)
        .json({ message: "Success", article: updatedArticle });
    })
    .catch((e) => {
      return res.status(500).json({ message: e.message });
    });
};

exports.delete = (req, res) => {
  ArticleModel.findById(req.params.id)
    .then((article) => {
      if (!article) {
        return res.status(404).json({ message: "Not Article Found" });
      }
      ArticleModel.findByIdAndDelete(req.params.id).then(() => {
        return res.status(200).json({ message: "Success" });
      });
    })
    .catch((e) => {
      return res.status(500).json({ message: e.message });
    });
};

exports.popularArticles = (req, res) => {
  try {
    const popularArticles = ArticleModel.aggregate([
      {
        $match: {
          view: {
            $gte: 100,
          },
          like: {
            $gte: 20,
          },
          unlike: {
            $lte: 5,
          },
        },
      },
    ]);
    if (!popularArticles) {
      return res.status(404).json({
        msg: "no popularArticles",
      });
    } else {
      return res.status(200).json({
        msg: "popular articles get successfully.",
        popularArticles: popularArticles,
      });
    }
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};
