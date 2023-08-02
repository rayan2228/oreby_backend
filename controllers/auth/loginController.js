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
    let findCredentials = await userModal.find({ email: email });
    if (findCredentials.length > 0) {
      bcrypt
        .compare(password, findCredentials[0].password)
        .then(function (result) {
          if (result) {
            res.json({
              iserror: false,
              message: "login successfully",
              data: {
                fullName: findCredentials[0].fullName,
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
};

module.exports = loginController;