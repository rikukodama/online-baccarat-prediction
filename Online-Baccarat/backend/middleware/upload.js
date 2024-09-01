/* 
    * Middleware to uplad images via multer
*/
const multer = require("multer")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `./public/upload`)
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + ".jpg")
    }
})

const upload = multer({ storage: storage})

module.exports = upload