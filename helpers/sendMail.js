const nodemailer = require("nodemailer");

async function sendMail(email,otp,template) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rayan.cit.bd@gmail.com",
      pass: "winknreynucmifqu",
    },
  });
  const info = await transporter.sendMail({
    from: '"oreby" <rayan.cit.bd@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "verify your email", // Subject line
    html: template(otp), // html body
  });

}

module.exports = sendMail;
