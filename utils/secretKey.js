const { NODE_ENV, SUPER_SECRET_KEY } = process.env;

const secretKey = {
  SUPER_SECRET_KEY: NODE_ENV === 'production' ? SUPER_SECRET_KEY : 'super-strong-secret',
};

module.exports = secretKey;
