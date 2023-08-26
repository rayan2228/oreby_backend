const userModal = require("../../modal/userModal");

const verifyOTP = async (req, res) => {
  const errors = {
    iserror: true,
    errorType: "email verification error",
    errors: {},
  };
  let { email, otp } = req.body;
  if (email && otp) {
    let matchOTP = await userModal.findOne({ email });
    if (matchOTP) {
      if (matchOTP.emailOTP === otp) {
        await userModal.findOneAndUpdate(
          { email },
          { $set: { emailOTP: "", emailVerified: true } },
          { new: true }
        );
        res.json({
          iserror: false,
          message: "email verified successfully",
          data: {
            fullName: matchOTP[0].fullName,
            email: email,
          },
        });
      } else {
        errors.errors.verification = "otp not matched,try again";
        res.send(errors);
      }
    } else {
      errors.errors.verification = "email not found";
      res.send(errors);
    }
  } else {
    errors.errors.verification = "otp not matched,try again";
    res.send(errors);
  }
};

module.exports = verifyOTP;
