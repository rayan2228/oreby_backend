let passwordValidation = (password) => {
  let mailFormat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  return password.match(mailFormat);
};

module.exports = passwordValidation;
