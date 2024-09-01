const fs = require('fs');
const path = require('path');
const config = require('../config/file');

exports.create_upload = function create_upload() {
  if (!fs.existsSync(config.upload)) {
    console.log('upload folder created');
    fs.mkdirSync(config.upload);
  }
  let attachment = path.join(config.upload, config.upload_attachment);
  if (!fs.existsSync(attachment)) {
    console.log('upload attachment folder created');
    fs.mkdirSync(attachment);
  }
  let publicFile = path.join(config.upload, config.upload_public);
  if (!fs.existsSync(publicFile)) {
    console.log('upload public folder created');
    fs.mkdirSync(publicFile);
  }
}

exports.move_to_upload = function move_to_upload(fileObj, mFile, callback) {
  let folderPath = path.join(config.upload, config.upload_attachment);
  
  if (!fileObj || !fileObj.mv) {
    callback('invalid file id = ' + id);
    return;
  }
  fileObj.mv(folderPath + '/' + mFile._id , function (err) {
    if (err) {
      callback('file move failed = ', err);
    } else {
      callback(null, mFile);
    }
  });
}

exports.move_to_upload_public = function move_to_upload(fileObj, mFile, callback) {
  let folderPath = path.join(config.upload, config.upload_public);
  if (!fileObj || !fileObj.mv) {
    callback('invalid file id = ' + id);
    return;
  }

  const filename = mFile._id + '.' + mFile.name.split('.')[mFile.name.split('.').length - 1];

  fileObj.mv(folderPath + '/' + filename, function (err) {
    if (err) {
      callback('file move failed = ', err);
    } else {
      callback(null, mFile);
    }
  });
}

exports.get_uploaded_attachment = function get_uploaded_attachment(fid, isPublic, callback) {
  const uploadPath = !isPublic ? config.upload_attachment : config.upload_public;
  let attachmentPath = path.join(config.upload, uploadPath);
  fs.readFile(attachmentPath + '/' + fid, (err, content) => {
    callback(err, content);
  })
}