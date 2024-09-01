const Notification = require("../Models/NotificationModel");
const _ = require("lodash");
// const { default: message } = require("../../Admin/src/pages/messgae");

exports.getAllNotification = async (req, res) => {
  try {
    const { id: email } = req.params;
    const notifications = await Notification.find({
      readStatus: false,
      receiver: { $eq: email },
    }).sort({ updatedAt: -1 });
    return res.status(200).json({
      message: "Get all categories successfully!",
      notifications: notifications,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteOneNotification = async (req, res) => {
  try {
    const { id: id } = req.params;
    const notification = await Notification.findById(id);
    notification.readStatus = true;
    notification.save();

    if (!notification) {
      return res.status(404).json({ msg: `No notification with id: ${id}` });
    } else {
      res.status(200).json({
        message: `Notification deleted successfully.`,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
