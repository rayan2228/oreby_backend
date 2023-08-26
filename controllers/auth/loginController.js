const userModal = require("../../modal/userModal");
const bcrypt = require("bcrypt");

const loginController = async (req, res) => {
  const errors = {
    iserror: true,
    errorType: "authentication error",
    errors: {},
  };
  let { email, password } = req.body;
  if (email && password) {
    let findCredentials = await userModal.findOne({ email: email });
    if (findCredentials) {
      if (findCredentials.userBan) {
        errors.errors.authentication =
          "user banned , please contact with admin";
        res.send(errors);
      } else {
        bcrypt
          .compare(password, findCredentials.password)
          .then(function (result) {
            if (result) {
              res.json({
                iserror: false,
                message: "login successfully",
                data: {
                  fullName: findCredentials.fullName,
                  email: email,
                },
              });
            } else {
              errors.errors.authentication =
                "authentication credentials do not match";
              res.send(errors);
            }
          });
      }
    } else {
      errors.errors.authentication = "authentication credentials do not match";
      res.send(errors);
    }
  } else {
    errors.errors.authentication = "all fields are required";
    res.send(errors);
  }
};

module.exports = loginController;
