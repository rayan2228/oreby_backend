const express = require("express");
const emailValidation = require("../../../helpers/emailValidation");
const passwordValidation = require("../../../helpers/passwordValidation");
const router = express.Router();

router.post("/register", (req, res) => {
  const errors = {iserror:true,errorType:"validation error",errors:{}};
  let flag = false;
  let { fullName, email, password } = req.body;
  if (!fullName) {
    errors.errors.fullName = "name is required";
    flag = true;
  }
  if (!email) {
    errors.errors.email = "email is required";
    flag = true;
  } else if (!emailValidation(email)) {
    errors.errors.email = "invalid email";
     flag = true;
  }
  if (!password) {
    errors.errors.password = "password is required";
     flag = true;
  } else if (!passwordValidation(password)) {
    errors.errors.password = "give a strong password";
     flag = true;
  }
  if (flag) {
    res.send(errors);
  } else {
    console.log(req.body);
    res.send("ok");
  }
});

module.exports = router;
