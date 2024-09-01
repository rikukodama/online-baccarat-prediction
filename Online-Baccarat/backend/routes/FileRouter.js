const router = require("express").Router();
const passport = require("passport");
const FileCtrl = require('../controllers/fileCtr');

router.post('/upload', FileCtrl.uploadFiles)
router.get('/download/:id', FileCtrl.downloadFile)

module.exports = router;