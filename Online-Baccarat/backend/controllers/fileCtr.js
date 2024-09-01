// --- Library ---
// const _ = require("lodash");
const async = require("async");
const path = require("path");
const fs = require("fs");
const contentDisposition = require("content-disposition");

// --- Model ---
const mongoose = require("mongoose");
const File = require("../Models/FileModel");

// --- Controller ---

// --- Utils ---
const upload = require("../utils/upload");
const validation = require("../utils/validation");
const lang = require("../utils/_lang/lang");

exports.downloadFile = function (req, res, next) {
  const id = req.params.id;
  const isPublic = !!req.query.isPublic;
  // validation
  if (!validation.validate_id(res, id, lang("invalid_userID"))) {
    return;
  }

  File.findOne({ _id: id }).exec((err, file) => {
    if (err || !file) {
      res.status(400).json({ error: lang("fail_fetchall") });
      return next(err);
    }

    upload.get_uploaded_attachment(file._id, isPublic, (err, data) => {
      if (err) {
        return res.status(400).send({
          error: lang("fail_fetchall"),
        });
      } else {
        res.writeHead(200, {
          "Content-Type": file.mime + "***" + encodeURIComponent(file.name),
          "Content-Encoding": "utf8",
          "Cache-Control": "private, no-transform, no-store, must-revalidate",
          "Content-Disposition": contentDisposition(file.name),
          Expires: 0,
          "Content-Transfer-Encoding": "binary",
          "Content-Length": file.filesize || 0,
          // 'Cache-Control': 'private, no-transform, no-store, must-revalidate'
        });
        res.end(data, "binary");
      }
    });
  });
};

exports.uploadFiles = function (req, res, next) {
  let files = req.files;
  if (files?.message) {
    files = files.message;
    if (typeof files === "object" && !files.length) files = [files];
  }

  if (!files) {
    return res.status(200).json({
      success: true,
      files: [],
    });
  }

  let keys = Object.keys(files);

  // async call
  let pos = 0;
  let successedFiles = [];
  async.whilst(
    function test() {
      return pos < keys.length;
    },
    function (next) {
      const file = files[keys[pos]];
      async.waterfall(
        [
          function (callback) {
            // push to database
            const mFile = new File({
              name: file.name,
              mime: file.mimetype,
              md5: file.md5,
              filesize: file.data ? file.data.length : 0,
            });
            mFile.save((err1, created) => {
              if (err1) {
                callback(err1);
              } else {
                callback(null, created);
              }
            });
          },
          function (createdFile, callback) {
            upload.move_to_upload(file, createdFile, callback);
          },
        ],
        function (err, result) {
          if (err) {
            console.log("file upload error", err, file.name);
          } else {
            successedFiles.push(result);
          }
          pos++;
          next();
        }
      );
    },
    function (err) {
      // done
      if (err) {
        return next(err);
      } else {
        return res.status(200).json({
          type: "success",
          uploaded: successedFiles,
          message: "Uploaded successfully!",
        });
      }
    }
  );
};

exports.uploadPublicFiles = function (req, res, next) {
  const files = req.files;

  if (!files) {
    return res.status(200).json({
      success: true,
      files: [],
    });
  }

  let keys = Object.keys(files);
  // async call
  let pos = 0,
    successedFiles = [];
  async.whilst(
    function test(cb) {
      return cb(null, pos < keys.length);
    },
    function (next) {
      const file = files[keys[pos]];
      async.waterfall(
        [
          function (callback) {
            // push to database
            const mFile = new File({
              name: file.name,
              mime: file.mimetype,
              md5: file.md5,
              filesize: file.data ? file.data.length : 0,
            });
            mFile.save((err1, created) => {
              if (err1) {
                callback(err1);
              } else {
                callback(null, created);
              }
            });
          },
          function (createdFile, callback) {
            upload.move_to_upload_public(file, createdFile, callback);
          },
        ],
        function (err, result) {
          if (err) {
            console.log("file upload error", err, file.name);
          } else {
            successedFiles.push(result);
          }
          pos++;
          next();
        }
      );
    },
    function (err) {
      // done
      if (err) {
        return next(err);
      } else {
        return res.status(200).json({
          uploaded: successedFiles,
        });
      }
    }
  );
};

exports.deleteOne = function (req, res, next) {
  const id = req.params.id;

  // validation
  if (!validation.validate_id(res, id, "Incorrect Id.")) {
    return;
  }

  File.deleteOne({ _id: id }, (err, doc) => {
    if (err) {
      return next(err);
    }
    response.delete_response(res, doc);
  });
};
