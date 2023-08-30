const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
const EMAIL_REGEX = /.+@.+\..+/;
const PASSWORD_REGEX = /^(?=.*[A-z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,})/;

module.exports = {
  URL_REGEX,
  EMAIL_REGEX,
  PASSWORD_REGEX
};