const passport = require("passport")

module.exports = requireAuth = (req, res, next) => {
    passport.authenticate("jwt", { session: false });
    next();
}