let emailValidation = (email) => {
  let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return email.match(mailFormat);
};

module.exports = emailValidation;
