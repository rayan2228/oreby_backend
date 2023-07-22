let passwordValidation = (password) => {
  let passwordFormat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  return password.match(passwordFormat);
};

module.exports = passwordValidation;
