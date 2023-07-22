const emailValidation = require("../../helpers/emailValidation");
const passwordValidation = require("../../helpers/passwordValidation");
const userModal = require("../../modal/userModal");
const bcrypt = require("bcrypt");
const sendMail = require("../../helpers/sendMail");
const emailVerifyTemplate = require("../../template/emailVerifyTemplate");
const aleaRNGFactory = require("number-generator/lib/aleaRNGFactory");

let registerController = async (req, res) => {
  const errors = { iserror: true, errorType: "validation error", errors: {} };
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
  } else {
    const checkUniqueEmail = await userModal.find({ email: email });
    if (checkUniqueEmail.length > 0) {
      errors.errors.email = "email is already used";
      flag = true;
    }
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
    bcrypt.hash(password, 10, async function (err, hash) {
      const userData = new userModal({
        fullName,
        email,
        password: hash,
      });
      await userData.save();
      const generator2 = aleaRNGFactory(Date.now());
      let randomOTP = generator2.uInt32().toString().substring(0, 4);
      let setEmailOTP = await userModal.findOneAndUpdate(
        { email },
        { $set: { emailOTP: randomOTP } },
        { new: true }
      );
      sendMail(email, setEmailOTP.emailOTP, emailVerifyTemplate);
    });
    res.send("ok");
  }
};

module.exports = registerController;
