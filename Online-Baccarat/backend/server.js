const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const fileUpload = require("express-fileupload");
const UserAuthRouter = require("./routes/UserAuthRouter");
const FileRouter = require("./routes/FileRouter");
const config = require("./config/config");
// const User = require("./Models/UnreadModel");

const app = express();
app.use(cors(""));

//connect mongodb
const db = require("./config/config").MONGOURI;
mongoose
  .connect(db)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((error) => {
    console.log("err");
  });

//body-parser

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(express.static("public"));

//passport initialize
app.use(passport.initialize());
app.use(fileUpload());
const PORT = process.env.PORT || 5000;

app.use("/api/auth", UserAuthRouter);
app.use("/api/file", FileRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

setInterval(myTimer, 1000);

function myTimer() {
  // console.log((Date.now() / 1000 - 54000).toFixed(0) % (24 * 3600));

  if ((Date.now() / 1000 - 54000).toFixed(0) % (24 * 3600) === 0) {

    // console.log(Date(Date.now()));
    // console.log(Date.now());
  }
}
