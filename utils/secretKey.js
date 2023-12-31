const { NODE_ENV, SUPER_SECRET_KEY } = process.env;

const secretKey = NODE_ENV === 'production' ? SUPER_SECRET_KEY : 'super-strong-secret';

module.exports = secretKey;
