const Channel = require("../Models/ChannelModel");
const User = require("../Models/UserModel");
const _ = require("lodash");
// const { default: message } = require("../../Admin/src/pages/messgae");

exports.createChannel = async (req, res) => {
  
  try {
    await Channel.findOne({ name: req.body.name, deleted: false }).then(
      async (matched) => {
        if (matched) {
          return res.json({
            message: "Same channel exist!",
            error: true,
          });
        } else {
            await Channel.findOne({
            name: req.body.name,
            deleted: false,
          }).then(async (matched) => {
            if (matched) {
              return res.json({
                message: "Choose another manager!",
                error: true,
              });
            }            
            const newChannel = new Channel(req.body);
            await newChannel.save((err) => {
              if (err) {
                return res.status(500).json({
                  message: err.message,
                });
              } else {
                return res.status(200).json({
                  message: "Create Channel sucessfully!",
                });
              }
            });
          });
        }
      }
    );
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getAllChannels = async (req, res) => {
  try {
    const channels = await Channel.find({ deleted: false }).populate(
      {
        path:"invite_users user"
      }
    ).sort({ updatedAt: -1 });
    
    return res.status(200).json({
      message: "Get all stores successfully!",
      channels: channels,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getAChannel = async (req, res) => {
  try {
    const { id: storeId } = req.params;
    const store = await Channel.findById(storeId).populate({
      path: "manager product",
      select: "firstName lastName",
    });

    const product = await Product.find({ deleted: false }).sort({
      updatedAt: -1,
    });
    const userList = await User.find({ delete: false })
      .sort({ createdAt: -1 })

    if (!store) {
      return res.status(404).json({
        messgae: `No store with id: ${storeId} exist`,
      });
    } else {
      return res.status(200).json({
        message: "Get store successfully!",
        store: store,
        userList,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateChannel = async (req, res) => {
  
  const { id: channelId } = req.params;
  const channel = await Channel.findById(channelId);
  
  try {
    if (!channel) {
      return res.status(404).json({
        message: `No channel with id: ${channelId} exist!`,
      });
    } else {
      await Channel.findOne(
        { name: req.body.name }
      ).then(async (matched) => {
        if (matched) {
          if (matched._id == channelId) {
            
            await Channel.findByIdAndUpdate(
              channelId,
              {
                name: req.body.name,
                create_user: req.body.create_user,
                invite_users: req.body.invite_users,
              }
            );
            return res.status(200).json({
              message: "Channel information changed successfully!",
            });
          } else{
              return res.json({
                message: "Channel don't exist!",
                error: true,
              });
            }
          
        } 
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.deleteAStore = async (req, res) => {

  const { id: storeId } = req.params;
  try {
    const store = await Store.findByIdAndUpdate(
      storeId,
      {
        deleted: true,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!store) {
      return res.status(404).json({
        message: `No store with id: ${storeId} exist!`,
      });
    } else {
      return res.status(200).json({
        message: "Delete store successfully!",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.messgae,
    });
  }
};

exports.deleteStores = async (req, res) => {
  const delStoreList = req.body.data;

  try {
    _.map(delStoreList, async (id, key) => {
      const store = await Store.findByIdAndUpdate(
        id,
        { deleted: true },
        {
          new: true,
          runValidators: true,
        }
      );
      if (!store) {
        res.status(404).json({
          message: `No store with id:${id} exist`,
        });
      } else {
        if (key == delStoreList.length - 1) {
          const stores = await Store.find({ deleted: false }).sort({
            updatedAt: -1,
          });
          res.status(200).json({
            message: "Delete selected stores successfully!",
            stores: stores,
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
