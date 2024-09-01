const router = require("express").Router();
const passport = require("passport");
require("../config/passport");
const requireAuth = passport.authenticate("jwt", { session: false });
const AuthCtr = require("../controllers/authCtr");

router.post("/register", AuthCtr.register);
router.post("/login", AuthCtr.login);
router.get("/tokenlogin", requireAuth, AuthCtr.tokenlogin);
router.post("/getAllUser", requireAuth, AuthCtr.getAll);
router.post("/updateUserProfile", requireAuth, AuthCtr.updateUserProfile);
router.post("/deleteUser", AuthCtr.deleteUser);
module.exports = router;
